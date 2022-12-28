import React from 'react';
import { useRecoilValue } from 'recoil';
import { Text } from '@chakra-ui/react';
import { userAtom } from '../state';

// export interface ISonicProps {}

export const User: React.FC = () => {
  const user = useRecoilValue(userAtom);

  return <Text>Connected to {user.did}</Text>;
};
