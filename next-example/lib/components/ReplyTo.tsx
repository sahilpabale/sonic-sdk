import { Drawer, Button, Text, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, Spinner, Box, HStack, VStack } from '@chakra-ui/react';
import React, { useRef, MutableRefObject } from 'react';
import { FaReply } from 'react-icons/fa';
import { fetchReplies } from '../utils/posts';
import { Post } from './Post';
import { useQuery } from 'react-query';
import { AddPost } from './AddPost';

interface ReplyToProps {
  count: number;
  master: IOrbisPost;
  context: string;
}

export const ReplyTo: React.FC<ReplyToProps> = ({ count, master, context }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: MutableRefObject<any> = useRef();

  const { isLoading, data, refetch } = useQuery(`replies-${master}`, async () => await fetchReplies(master.stream_id), {
    enabled: false
  });

  console.log('data', data);

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
        <DrawerContent backgroundColor="brand.secondary" overflow="scroll">
          <DrawerCloseButton />

          <DrawerHeader>Replies to </DrawerHeader>
          {isLoading ? (
            <div>loading</div>
          ) : (
            <div>
              <DrawerBody>
                <VStack gap={8} w="full">
                  <Post post={master} context={context} />
                  <Box bg="brand.quaternary" h="0.8" w="full" />
                  <AddPost master={master.stream_id} context={context} />
                  {data?.replies && data.replies.length > 0 && data.replies.map((post: IOrbisPost) => <Post key={post.stream_id} post={post} context={context} />)}
                </VStack>
              </DrawerBody>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
