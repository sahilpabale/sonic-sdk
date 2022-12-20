import React from 'react';
import { VStack, HStack, Text, Box } from '@chakra-ui/react';
import { Image } from '@davatar/react';
import dayjs from 'dayjs';
import { truncateDid } from '../utils/truncate';
import { ReplyTo } from './ReplyTo';
import Reactions from './Reactions';

interface PostProps {
  post: IOrbisPost;
  context: string;
}

const randomPfp = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `https://avatars.dicebear.com/api/initials/0x.svg?b=%23${randomColor}&r=50&scale=107&backgroundColorLevel=700&fontSize=43&bold=true`;
};

export const Post: React.FC<PostProps> = ({ post, context }) => {
  return (
    <VStack gap={1} rounded="lg" backgroundColor="brand.tertiary" w="full" alignItems="start" border="1px solid" borderColor="brand.quaternary">
      <HStack gap={2} px={4} pt={3} pb={1}>
        <Image size={32} uri={post.creator_details?.profile === null ? randomPfp() : (post.creator_details?.profile?.pfp as string)} />
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
      <Text w="full" px={6}>
        {post.content.body}
      </Text>
      <Box bg="brand.quaternary" h="1px" w="full" />
      <HStack px={6} pb={4}>
        <ReplyTo master={post} count={post.count_replies} context={context} />
        <Reactions id={post.stream_id} like_count={post.count_likes} haha_count={post.count_haha} downvote_count={post.count_downvotes} />
      </HStack>
    </VStack>
  );
};
