import React, { createContext } from 'react';
import { RecoilRoot } from 'recoil';

export interface ISonicProviderProps {
  children: React.ReactNode;
}

const SonicContext: React.Context<null> = createContext(null);

export const SonicProvider: React.FC<ISonicProviderProps> = ({ children }) => {
  return (
    <SonicContext.Provider value={null}>
      <RecoilRoot>{children}</RecoilRoot>
    </SonicContext.Provider>
  );
};
