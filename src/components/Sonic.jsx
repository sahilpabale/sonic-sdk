import React from 'react';
import { useOrbis } from '../state/orbis';

const Sonic = () => {
  const [orbis] = useOrbis();

  const connect = async () => {
    const res = await orbis.connect_v2({
      provider: window.ethereum,
      lit: true
    });

    console.log(res);
  };

  return (
    <div>
      <button onClick={connect}>Connect</button>
    </div>
  );
};

export default Sonic;
