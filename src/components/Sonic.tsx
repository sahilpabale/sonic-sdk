/* eslint-disable camelcase */
import { Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import orbis from '../orbis.client';
import dayjs from 'dayjs';
import { userAtom } from '../state';
import { useRecoilValue } from 'recoil';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Post } from './Post';
import { AddPost } from './AddPost';
import { Connect } from './Connect';
import { IOrbisGetPosts } from '@orbisclub/orbis-sdk';
dayjs.extend(relativeTime);

interface SonicProps {
  context: string;
}

export const Sonic: React.FC<SonicProps> = ({ context }) => {
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if (!user.did) {
      checkIfUserIsConnected();
    }
  }, [user]);

  const checkIfUserIsConnected = async () => {
    const res = await orbis.isConnected();

    console.log('res', res);
  };

  const fetchPosts = async () => {
    const posts = await orbis.getPosts({ context: context, only_master: true });
    return posts;
  };

  const { data: posts } = useQuery<IOrbisGetPosts>('posts', fetchPosts);

  return (
    <>
      {user && user.did ? (
        <VStack gap={8} bgColor="brand.secondary" p={4} rounded="xl" w="4xl" border="1px solid" borderColor="brand.tertiary">
          <VStack gap={8} w="full">
            <AddPost context={context} />

            {posts && posts.data.length > 0 && posts.data.map((post) => <Post context={context} post={post} key={post.stream_id} />)}
          </VStack>
        </VStack>
      ) : (
        <VStack gap={8} bgColor="brand.secondary" p={4} rounded="xl" w="4xl" border="1px solid" borderColor="brand.tertiary">
          <Text fontSize="xl" fontWeight="bold">
            Sign in to comment
          </Text>
          <Connect />
        </VStack>
      )}
    </>
  );
};
