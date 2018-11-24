import nextGetConfig from 'next/config';

export const isServer = typeof window === 'undefined';
const serverPort = process.env.PORT;

// https://github.com/zeit/next.js#exposing-configuration-to-the-server--client-side
export const getPublicConfig = () => {
  const { publicRuntimeConfig } = nextGetConfig();

  return publicRuntimeConfig;
};

export const getServerConfig = () => {
  if (!isServer) {
    // eslint-disable-next-line
    console.error(`!!! WARNING : USING THE SERVER CONFIG ON CLIENT SIDE, SECRET DATA MAYBE GET EXPOSED !!!`);
  }

  const { serverRuntimeConfig } = nextGetConfig();

  return serverRuntimeConfig;
};

export const getServerPort = () => serverPort;
