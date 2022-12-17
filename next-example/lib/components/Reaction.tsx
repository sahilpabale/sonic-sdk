import { Button } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import orbis from '../orbis.client';

interface ReactionProps {
  reaction: string;
  postId: string;
  children: ReactNode;
}

const Reaction: React.FC<ReactionProps> = ({ reaction, postId, children }) => {
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
    <Button aria-label={reaction} rounded="full" w={10} h={8} fontSize="sm" isLoading={isReacting} onClick={react}>
      {children}
    </Button>
  );
};

export default Reaction;
