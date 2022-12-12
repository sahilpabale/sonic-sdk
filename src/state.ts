import { atom } from 'recoil';
import { Orbis } from '@orbisclub/orbis-sdk';

const orbis = new Orbis();

type User = {
  did?: string;
  profile?: {
    pfp: string;
    username: string;
    description: string;
  };
};
const user: User = {};

export const sonicState = atom({
  key: 'sonicState',
  default: orbis
});

export const userState = atom({
  key: 'userState',
  default: user
});
