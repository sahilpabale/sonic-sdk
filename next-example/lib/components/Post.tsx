import { HStack, VStack, Text, Box } from '@chakra-ui/react';
import Avatar from '@davatar/react';
import { truncateDid } from '../utils/truncate';
import Reactions from './Reactions';

interface PostProps {
  post: IOrbisPost;
}

const Post: React.FC<PostProps> = ({ post }) => (
  <VStack gap={2} rounded="lg" backgroundColor="brand.tertiary" w="full" alignItems="start" border="1px solid" borderColor="brand.quaternary" key={post.stream_id}>
    <HStack gap={2} px={6} pt={4} pb={1}>
      <Avatar size={32} address={post.creator_details?.metadata.address as string} />
      <Text fontSize="sm" fontWeight="semibold">
        {truncateDid(post.creator)}
      </Text>
    </HStack>
    <Box bg="brand.quaternary" h="1px" w="full" />
    <Text w="full" px={6}>
      {post.content.body}
    </Text>
    <Box bg="brand.quaternary" h="1px" w="full" />
    <Reactions id={post.stream_id} like_count={post.count_likes} haha_count={post.count_haha} downvote_count={post.count_downvotes} />
  </VStack>
);

export default Post;
