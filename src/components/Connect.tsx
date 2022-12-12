import React from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { userState as userAtom } from '../state';
import orbis from '../orbis.client';

export interface IConnectProps {}

const App: React.FC<IConnectProps> = () => {
  const setUser = useSetRecoilState(userAtom);

  const connect = async () => {
    try {
      const res = await orbis.connect_v2({
        chain: 'ethereum',
        lit: true
      });
      setUser(res.details);
      console.log('connect sonic res:', res);
    } catch (e) {
      setUser({});
      console.log('connect sonic err:', e);
    }
  };

  return <button onClick={connect}>Connect +</button>;
};

export const Connect: React.FC = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};
