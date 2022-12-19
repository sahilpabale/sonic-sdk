import { ChakraProvider } from '@chakra-ui/react';
import React, { createContext } from 'react';
import { RecoilRoot } from 'recoil';
import { userAtom } from './state';
import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

export interface ISonicProviderProps {
  children: React.ReactNode;
}

export const SonicContext = createContext(userAtom);
const queryClient = new QueryClient();

export const SonicProvider: React.FC<ISonicProviderProps> = ({ children }) => {
  return (
    <SonicContext.Provider value={userAtom}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </SonicContext.Provider>
  );
};
