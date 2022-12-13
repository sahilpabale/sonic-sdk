import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState as userAtom } from '../state';

export interface ISonicProps {}

export const User: React.FC<ISonicProps> = () => {
  const user = useRecoilValue(userAtom);
  return <div>Connected to {user.did}</div>;
};
