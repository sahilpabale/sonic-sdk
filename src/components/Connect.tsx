import React from 'react';
import { RecoilRoot, useRecoilValue, useRecoilState } from 'recoil';
import { sonicState as sonicAtom, userState as userAtom } from '../state';

export interface IConnectProps {}

const App: React.FC<IConnectProps> = () => {
  const sonic = useRecoilValue(sonicAtom);
  const [_, setUser] = useRecoilState(userAtom);

  const connect = async () => {
    try {
      const res = await sonic.connect_v2({
        chain: 'ethereum',
        lit: true
      });
      setUser(res.details);
      console.log(res);
    } catch (e) {
      setUser({});
      console.log(e);
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
