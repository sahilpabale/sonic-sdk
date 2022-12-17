declare module '@orbisclub/orbis-sdk' {
  type ConnectV2Options = {
    provider?: string;
    chain: 'ethereum' | 'solana';
    lit: boolean;
  };

  type PostMention = {
    did: string;
    username: string;
  };

  type Tag = {
    slug: string;
    name: string;
  };

  type MediaItem = {
    url: string;
    gateway: string;
  };

  type PostContent = {
    body: stirng;
    title?: string;
    context?: string;
    master?: string;
    reply_to?: string;
    mentions?: PostMention[];
    tags?: Tag[];
    media?: MediaItem[];
    data?: any;
  };

  type EncryptionRules = {
    type: string;
    chain: string;
    contractType: string;
    minTokenBalance: string;
    tokenId?: string;
    accessControlConditions: any;
  };

  type LogoutResponse = {
    status: number;
    result: string;
    error: any;
  };

  interface IsConnectedResponse {
    status: number;
    did: string;
    details: any;
    result: string;
  }

  export class Orbis {
    // ...
    constructor();
    // eslint-disable-next-line camelcase
    connect_v2(options: ConnectV2Options): Promise<any>;

    createPost(content: PostContent, encryptionRules?: EncryptionRules): Promise<Post>;

    isConnected(): Promise<IsConnectedResponse>;

    logout(): Promise<LogoutResponse>;
  }
}
