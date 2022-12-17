import { Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react';
import Avatar from '@davatar/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import orbis from '../orbis.client';
import { truncateDid } from '../utils/truncate';

interface SonicProps {
  context: string;
}

interface PostForm {
  content: string;
}

export const Sonic: React.FC<SonicProps> = ({ context }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostForm>();

  const [posts, setPosts] = React.useState<IOrbisPost[] | null>(null);

  const addComment = (data: PostForm) => {
    console.log('add comment:', data);

    orbis.createPost({
      body: data.content,
      context: context
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await orbis.getPosts({ context: context });
      console.log('posts', posts.data);
      setPosts(posts.data);
    };

    fetchPosts();
  }, [context]);

  return (
    <VStack gap={8}>
      <Text>Context: {context}</Text>
      <VStack gap={8} as="form">
        <FormControl isRequired isInvalid={errors.content ? true : false}>
          <FormLabel>Post Content</FormLabel>
          <Input {...register('content', { required: true })} />
          {errors.content && <FormErrorMessage>{errors.content?.message}</FormErrorMessage>}
        </FormControl>

        <Button type="submit" onClick={handleSubmit(addComment)}>
          Add Comment
        </Button>

        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <VStack gap={4} rounded="xl" p={4} backgroundColor="brand.tertiary">
              <HStack gap={2}>
                <Avatar size={32} address={post.creator_details?.metadata.address as string} />
                <Text fontSize="sm" fontWeight="semibold">
                  {truncateDid(post.creator)}
                </Text>
              </HStack>
              <Text>{post.content.body}</Text>
            </VStack>
          ))}
      </VStack>
    </VStack>
  );
};
