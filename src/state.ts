import { atom } from 'recoil';

type User = {
  did?: string;
  profile?: {
    pfp: string;
    username: string;
    description: string;
  };
};
const user: User = {};

export const userState = atom({
  key: 'userState',
  default: user
});
