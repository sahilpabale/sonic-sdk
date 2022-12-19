import { ChakraProvider } from '@chakra-ui/react';
import React, { createContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { userAtom } from './state';
import theme from './theme';

export interface ISonicProviderProps {
  children: React.ReactNode;
}

export const SonicContext = createContext(userAtom);

const queryClient = new QueryClient();

export const SonicProvider: React.FC<ISonicProviderProps> = ({ children }) => {
  return (
    <SonicContext.Provider value={userAtom}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ChakraProvider>
      </RecoilRoot>
    </SonicContext.Provider>
  );
};
