import { Button, FormControl, FormErrorMessage, FormLabel, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import orbis from '../orbis.client';
import Post from './Post';

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

  const queryClient = useQueryClient();

  const [isAddingComment, setIsAddingComment] = useState(false);

  const fetchPosts = async () => {
    const posts = await orbis.getPosts({ context: context });
    return posts;
  };

  const { data: posts } = useQuery<IOrbisGetPosts>('posts', fetchPosts);

  const addComment = async (data: PostForm) => {
    setIsAddingComment(true);
    try {
      const res = await orbis.createPost({
        body: data.content,
        context: context
      });

      if (!(res.status == 200)) {
        throw new Error('Error creating post');
      }

      await new Promise((r) => setTimeout(r, 2000));

      queryClient.refetchQueries('posts');
    } catch (e) {
      console.error('Error creating post', e);
    } finally {
      setIsAddingComment(false);
    }
  };

  return (
    <VStack gap={8} bgColor="brand.secondary" p={4} rounded="xl" w="4xl" border="1px solid" borderColor="brand.tertiary">
      <Text>Context: {context}</Text>
      <VStack gap={8} as="form" w="full">
        <FormControl isRequired isInvalid={errors.content ? true : false}>
          <FormLabel>Post Content</FormLabel>
          <Textarea {...register('content', { required: true })} />
          {errors.content && <FormErrorMessage>{errors.content?.message}</FormErrorMessage>}
        </FormControl>

        <Button type="submit" onClick={handleSubmit(addComment)} isLoading={isAddingComment}>
          Add Comment
        </Button>

        {posts && posts.data.length > 0 && posts.data.map((post) => <Post post={post} />)}
      </VStack>
    </VStack>
  );
};
