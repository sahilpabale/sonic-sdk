import { HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import orbis from '../orbis.client';
import { userAtom } from '../state';
import Reaction from './Reaction';

interface ReactionsProps {
  id: string;
  like_count: number;
  haha_count: number;
  downvote_count: number;
}

const Reactions: React.FC<ReactionsProps> = ({ id, like_count, haha_count, downvote_count }) => {
  const user = useRecoilValue(userAtom);

  const [reactedTo, setReactedTo] = useState<string | null>(null);

  const fetchReactions = async () => {
    const { data, error } = await orbis.getReaction(id, user.did);

    if (error) {
      console.error('error fetching reactions', error);
      return;
    }

    if (data) {
      setReactedTo(data.type);
    }
  };

  useEffect(() => {
    fetchReactions();
  });

  return (
    <HStack px={6} pb={4}>
      <Reaction reaction="like" postId={id} count={like_count} didViewerReact={reactedTo === 'like'}>
        ❤️
      </Reaction>
      <Reaction reaction="haha" postId={id} count={haha_count} didViewerReact={reactedTo === 'haha'}>
        😂
      </Reaction>
      <Reaction reaction="downvote" postId={id} count={downvote_count} didViewerReact={reactedTo === 'downvote'}>
        👎
      </Reaction>
    </HStack>
  );
};

export default Reactions;
