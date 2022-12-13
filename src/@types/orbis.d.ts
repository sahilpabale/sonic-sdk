declare module '@orbisclub/orbis-sdk' {
  type ConnectV2Options = {
    provider?: string;
    chain: 'ethereum' | 'solana';
    lit: boolean;
  };

  export class Orbis {
    // ...
    constructor();
    connect_v2(options: ConnectV2Options): Promise<any>;
  }
}
