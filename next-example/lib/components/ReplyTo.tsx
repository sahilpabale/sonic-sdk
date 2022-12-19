import { Drawer, Button, Text, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, Spinner, Box, HStack } from '@chakra-ui/react';
import React, { useRef, MutableRefObject } from 'react';
import { FaReply } from 'react-icons/fa';
import { fetchReplies } from '../utils/posts';
import { Post } from './Post';
import { useQuery } from 'react-query';

interface ReplyToProps {
  count: number;
  master: string;
}

export const ReplyTo: React.FC<ReplyToProps> = ({ count, master }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: MutableRefObject<any> = useRef();

  const { isIdle, isLoading, data, refetch, isFetching } = useQuery('replies', async () => await fetchReplies(master), {
    enabled: false
  });

  return (
    <>
      <Button
        ref={btnRef}
        leftIcon={<FaReply />}
        onClick={() => {
          refetch();
          onOpen();
        }}
      >
        Reply ({count})
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
        <DrawerOverlay />
        <DrawerContent backgroundColor="gray.800">
          <DrawerCloseButton />

          <DrawerHeader>Replies to </DrawerHeader>
          {isIdle ? (
            <div>Idle</div>
          ) : isLoading ? (
            <div>loading</div>
          ) : isFetching ? (
            <HStack p="8">
              <Spinner thickness="3px" />
              <Text>Fetching...</Text>
            </HStack>
          ) : (
            <div>
              {' '}
              <DrawerBody>
                {data?.masterPost && <Post post={data.masterPost} />}
                <Box bg="brand.quaternary" h="0.8" w="full" mt="8" mb="8" />
                {data?.replies && data.replies.length > 0 && data.replies.map((post: IOrbisPost) => <Post key={post.stream_id} post={post} />)}
              </DrawerBody>
            </div>
          )}

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
