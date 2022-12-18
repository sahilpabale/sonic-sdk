import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react';
import Avatar from '@davatar/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import orbis from '../orbis.client';
import { truncateDid } from '../utils/truncate';
import Reaction from './Reaction';
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

      await fetchPosts();
      console.log('fetched');
    } catch (e) {
      console.error('Error creating post', e);
    } finally {
      setIsAddingComment(false);
    }
  };

  const fetchPosts = async () => {
    const posts = await orbis.getPosts({ context: context });
    console.log('posts', posts.data);
    setPosts(posts.data);
  };

  useEffect(() => {
    fetchPosts();
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

        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
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
