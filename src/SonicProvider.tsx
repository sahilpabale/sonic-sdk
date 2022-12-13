import React, { createContext } from 'react';
import { RecoilRoot } from 'recoil';
import { userAtom } from './state';

export interface ISonicProviderProps {
  children: React.ReactNode;
}

export const SonicContext = createContext(userAtom);

export const SonicProvider: React.FC<ISonicProviderProps> = ({ children }) => {
  return (
    <SonicContext.Provider value={userAtom}>
      <RecoilRoot>{children}</RecoilRoot>
    </SonicContext.Provider>
  );
};
