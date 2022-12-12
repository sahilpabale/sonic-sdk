import { atom } from 'recoil';

type User = {
  did?: string;
  github_details?: any;
  hasLit?: boolean;
  metadata?: {
    chain: string;
    address: string;
    ensName: string;
  };
  profile?: {
    pfp: string;
    username: string;
    description: string;
  };
};

export const userState = atom<User>({
  key: 'userState',
  default: {}
});
