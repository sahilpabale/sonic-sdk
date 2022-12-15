import React, { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { SonicContext } from '../SonicProvider';
import { Text } from '@chakra-ui/react';

export interface ISonicProps {}

export const User: React.FC<ISonicProps> = () => {
  const userAtom = useContext(SonicContext);
  const user = useRecoilValue(userAtom);

  return <Text>Connected to {user.did}</Text>;
};
