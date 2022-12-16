import { Button } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useSetRecoilState } from 'recoil';
// import { userState as userAtom } from '../state';
import orbis from '../orbis.client';
import { SonicContext } from '../SonicProvider';

// export interface IConnectProps {}

export const Connect: React.FC = () => {
  const userAtom = useContext(SonicContext);

  const setUser = useSetRecoilState(userAtom);

  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    setIsConnecting(true);
    try {
      const res = await orbis.connect_v2({
        provider: window.ethereum,
        chain: 'ethereum',
        lit: true
      });
      setUser(res.details);
      console.log('connect sonic res:', res.details);
    } catch (e) {
      setUser({});
      console.log('connect sonic err:', e);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button onClick={connect} isLoading={isConnecting} loadingText="Connecting...">
      Connect +
    </Button>
  );
};
