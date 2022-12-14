import { Avatar, Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import orbis from '../orbis.client';
import { userAtom } from '../state';
import { truncateDid } from '../utils/truncate';
import Blockies from 'react-blockies';

// export interface IConnectProps {}

export const Connect: React.FC = () => {
  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);

  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!user.did) {
      checkIfUserIsConnected();
    }
  }, [user]);

  const checkIfUserIsConnected = async () => {
    let res = await orbis.isConnected();

    console.log('res', res);

    if (res && res.status == 200) {
      setUser(res.details);
    }
  };

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

  const logout = async () => {
    try {
      await orbis.logout();
      setUser({});
    } catch (e) {
      console.log('logout error');
    }
  };

  return (
    <>
      {user.did ? (
        <Popover>
          <PopoverTrigger>
            <button>{user.profile?.pfp ? <Avatar size="sm" src={user.profile.pfp} /> : <Avatar as={Blockies} seed={user.did} size="sm" />}</button>
          </PopoverTrigger>

          <PopoverContent w={32}>
            <PopoverBody as={VStack} gap={4}>
              {user?.profile?.username && (
                <Text fontSize="xs" fontWeight="bold">
                  {user.profile.username}
                </Text>
              )}
              <Text fontSize="xs" textOverflow="ellipsis">
                {truncateDid(user.did)}
              </Text>
              <Button onClick={logout} colorScheme="red">
                Logout
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Button onClick={connect} isLoading={isConnecting} loadingText="Connecting..." colorScheme="green">
          Connect Wallet
        </Button>
      )}
    </>
  );
};
