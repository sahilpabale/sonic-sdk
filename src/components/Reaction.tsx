import { Button, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import orbis from '../orbis.client';

interface ReactionProps {
  reaction: string;
  postId: string;
  count: number;
  didViewerReact: boolean;
  children: ReactNode;
}

const Reaction: React.FC<ReactionProps> = ({ reaction, postId, count, didViewerReact, children }) => {
  const react = async () => {
    try {
      const res = await orbis.react(postId, reaction);
      if (!(res.status == 200)) throw new Error('Error reacting');

      await new Promise((r) => setTimeout(r, 2000));

      queryClient.refetchQueries(`userReaction-${postId}`);
      queryClient.refetchQueries('posts');
    } catch (e) {
      console.log('error', e);
    }
  };

  const queryClient = useQueryClient();

  const { isLoading: isReacting, mutate } = useMutation(react);

  return (
    <Button
      aria-label={reaction}
      rounded="full"
      w={14}
      h={8}
      fontSize="sm"
      isLoading={isReacting}
      onClick={() => mutate()}
      borderColor={didViewerReact ? 'accent.primary' : 'brand.quaternary'}
      backgroundColor={didViewerReact ? 'accent.secondary' : 'brand.secondary'}
      _hover={{
        backgroundColor: didViewerReact ? 'accent.tertiary' : 'brand.tertiary'
      }}
    >
      {children} <Text ml={2}>{count}</Text>
    </Button>
  );
};

export default Reaction;
