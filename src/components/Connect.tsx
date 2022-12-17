import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, VStack } from '@chakra-ui/react';
import Avatar from '@davatar/react';
import React, { useContext, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { userState as userAtom } from '../state';
import orbis from '../orbis.client';
import { SonicContext } from '../SonicProvider';

// export interface IConnectProps {}

export const Connect: React.FC = () => {
  const userAtom = useContext(SonicContext);

  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);

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
            <Avatar size={32} address={user.did as string} />
          </PopoverTrigger>

          <PopoverContent>
            <PopoverBody as={VStack} gap={4}>
              {user?.profile?.username && (
                <Text fontSize="xs" fontWeight="bold">
                  {user.profile.username}
                </Text>
              )}
              <Text fontSize="xs" textOverflow="ellipsis">
                {user.did}
              </Text>
              <Button onClick={logout} colorScheme="red">
                Logout
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Button onClick={connect} isLoading={isConnecting} loadingText="Connecting...">
          Connect +
        </Button>
      )}
    </>
  );
};
