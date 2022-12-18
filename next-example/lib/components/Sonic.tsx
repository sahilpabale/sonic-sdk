import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import Avatar from '@davatar/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import orbis from '../orbis.client';
import { truncateDid } from '../utils/truncate';
import Reactions from './Reactions';

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

        {posts &&
          posts.data.length > 0 &&
          posts.data.map((post) => (
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
          ))}
      </VStack>
    </VStack>
  );
};
