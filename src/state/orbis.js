import { atom, useAtomValue } from 'jotai';
import { Orbis } from '@orbisclub/orbis-sdk';

const orbisAtom = atom(new Orbis());

const useOrbis = () => {
  const orbis = useAtomValue(orbisAtom);
  return orbis;
};

export { orbisAtom, useOrbis };
