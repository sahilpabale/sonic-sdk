import React, { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { SonicContext } from '../SonicProvider';

export interface ISonicProps {}

export const User: React.FC<ISonicProps> = () => {
  const userAtom = useContext(SonicContext);
  const user = useRecoilValue(userAtom);

  return <div>Connected to {user.did}</div>;
};
