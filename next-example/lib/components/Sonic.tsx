import { Button, FormControl, FormErrorMessage, FormLabel, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import orbis from '../orbis.client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Post } from './Post';
import { AddPost } from './AddPost';
dayjs.extend(relativeTime);

interface SonicProps {
  context: string;
}

export const Sonic: React.FC<SonicProps> = ({ context }) => {
  const fetchPosts = async () => {
    const posts = await orbis.getPosts({ context: context, only_master: true });
    return posts;
  };

  const { data: posts } = useQuery<IOrbisGetPosts>('posts', fetchPosts);

  return (
    <VStack gap={8} bgColor="brand.secondary" p={4} rounded="xl" w="4xl" border="1px solid" borderColor="brand.tertiary">
      <Text>Context: {context}</Text>
      <VStack gap={8} w="full">
        <AddPost context={context} />

        {posts && posts.data.length > 0 && posts.data.map((post) => <Post context={context} post={post} key={post.stream_id} />)}
      </VStack>
    </VStack>
  );
};
