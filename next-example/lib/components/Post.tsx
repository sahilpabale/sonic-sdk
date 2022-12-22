import React from 'react';
import { VStack, HStack, Text, Box, Avatar, IconButton } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { truncateDid } from '../utils/truncate';
import { ReplyTo } from './ReplyTo';
import Reactions from './Reactions';
import Blockies from 'react-blockies';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../state';
import EditPostModal from './EditPostModal';
import DeletePostModal from './DeletePostModal';

interface PostProps {
  post: IOrbisPost;
  context: string;
}

export const Post: React.FC<PostProps> = ({ post, context }) => {
  const user = useRecoilValue(userAtom);
  return (
    <VStack gap={1} rounded="lg" backgroundColor="brand.tertiary" w="full" alignItems="start" border="1px solid" borderColor="brand.quaternary">
      <HStack justifyContent="space-between" px={4} pt={3} pb={1}>
        <HStack gap={2}>
          {post.creator_details?.profile?.pfp ? <Avatar size="sm" src={post.creator_details?.profile?.pfp} /> : <Avatar as={Blockies} seed={post.creator_details?.did ?? post.creator} size="sm" />}
          {post.creator_details?.profile === null ? (
            <Text fontSize="md" fontWeight="semibold">
              {truncateDid(post.creator)}
            </Text>
          ) : (
            <Text fontSize="md" fontWeight="semibold">
              {post.creator_details?.profile?.username as string}{' '}
              <Text color="darkgray" as="span">
                ({truncateDid(post.creator)})
              </Text>
            </Text>
          )}
          <Text>{dayjs.unix(post.timestamp).fromNow()}</Text>
        </HStack>
        {post.creator === user?.did && (
          <HStack>
            <EditPostModal streamId={post.stream_id} previousContent={post.content.body} />
            <DeletePostModal streamId={post.stream_id} />
          </HStack>
        )}
      </HStack>
      <Text w="full" px={6}>
        {post.content.body}
      </Text>
      <Box bg="brand.quaternary" h="1px" w="full" />
      <HStack px={4} pb={4}>
        <ReplyTo master={post} count={post.count_replies} context={context} />
        <Reactions id={post.stream_id} like_count={post.count_likes} haha_count={post.count_haha} downvote_count={post.count_downvotes} />
      </HStack>
    </VStack>
  );
};
