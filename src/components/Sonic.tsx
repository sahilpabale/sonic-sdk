import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { userState as userAtom } from '../state';

export interface ISonicProps {}

export const App: React.FC<ISonicProps> = () => {
  const user = useRecoilValue(userAtom);
  return <div>Connected to {user.did}</div>;
};

export const Sonic: React.FC = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};
