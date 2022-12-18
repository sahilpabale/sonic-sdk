import { Button, Text } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import orbis from '../orbis.client';

interface ReactionProps {
  reaction: string;
  postId: string;
  count: number;
  didViewerReact: boolean;
  children: ReactNode;
}

const Reaction: React.FC<ReactionProps> = ({ reaction, postId, count, didViewerReact, children }) => {
  const [isReacting, setIsReacting] = useState(false);

  const react = async () => {
    setIsReacting(true);
    try {
      const res = await orbis.react(postId, reaction);
      console.log('res', res);
    } catch (e) {
      console.log('error', e);
    } finally {
      setIsReacting(false);
    }
  };

  return (
    <Button
      aria-label={reaction}
      rounded="full"
      w={12}
      h={8}
      fontSize="sm"
      isLoading={isReacting}
      onClick={react}
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
