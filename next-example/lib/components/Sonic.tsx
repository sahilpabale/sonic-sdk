import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import orbis from '../orbis.client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Post } from './Post';
import { fetchPosts } from '../utils/posts';
dayjs.extend(relativeTime);

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

  const [posts, setPosts] = useState<IOrbisPost[] | null>(null);

  const [isAddingComment, setIsAddingComment] = useState(false);

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

      console.log('gonna fetch');

      const posts = await fetchPosts(context);
      setPosts(posts);

      console.log('fetched');
    } catch (e) {
      console.error('Error creating post', e);
    } finally {
      setIsAddingComment(false);
    }
  };

  useEffect(() => {
    fetchPosts(context).then((data) => {
      setPosts(data);
    });
  }, [context]);

  return (
    <VStack gap={8} bgColor="brand.secondary" p={4} rounded="xl" w="4xl" border="1px solid" borderColor="brand.tertiary">
      <Text>Context: {context}</Text>
      <VStack gap={8} as="form" w="full">
        <FormControl isRequired isInvalid={errors.content ? true : false}>
          <FormLabel>Post Content</FormLabel>
          <Input {...register('content', { required: true })} />
          {errors.content && <FormErrorMessage>{errors.content?.message}</FormErrorMessage>}
        </FormControl>

        <Button type="submit" onClick={handleSubmit(addComment)} isLoading={isAddingComment}>
          Add Comment
        </Button>

        {posts && posts.length > 0 && posts.map((post) => <Post key={post.stream_id} post={post} />)}
      </VStack>
    </VStack>
  );
};
