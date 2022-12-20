import { Drawer, Button, Text, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, Spinner, Box, HStack, VStack } from '@chakra-ui/react';
import React, { useRef, MutableRefObject } from 'react';
import { FaReply } from 'react-icons/fa';
import { fetchReplies } from '../utils/posts';
import { Post } from './Post';
import { useQuery } from 'react-query';
import { AddReply } from './AddReply';

interface ReplyToProps {
  count: number;
  master: string;
}

export const ReplyTo: React.FC<ReplyToProps> = ({ count, master }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: MutableRefObject<any> = useRef();

  const { isLoading, data, refetch } = useQuery(`replies-${master}`, async () => await fetchReplies(master), {
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
        <DrawerContent backgroundColor="gray.800" overflow="scroll">
          <DrawerCloseButton />

          <DrawerHeader>Replies to </DrawerHeader>
          {isLoading ? (
            <div>loading</div>
          ) : (
            <div>
              <DrawerBody>
                <VStack gap={8} as="form" w="full">
                  {data?.masterPost && <Post post={data.masterPost} />}
                  <Box bg="brand.quaternary" h="0.8" w="full" />
                  {data?.replies && data.replies.length > 0 && data.replies.map((post: IOrbisPost) => <Post key={post.stream_id} post={post} />)}
                </VStack>
              </DrawerBody>
            </div>
          )}

          <DrawerFooter>
            <AddReply master={master} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
