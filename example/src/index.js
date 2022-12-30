import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SonicProvider } from '@0xsonic/sdk';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SonicProvider>
      <ChakraProvider theme={theme}>
        <Box
          bg="red.600"
          filter="blur(200px)"
          h={{ base: '52', md: '72' }}
          position="absolute"
          rounded="full"
          w={{ base: '60', md: '96' }}
          zIndex="-1"
          left="64"
          top="56"
          opacity="0.3"
          mixBlendMode="multiply"
        />
        <Box
          bg="green.600"
          filter="blur(200px)"
          h={{ base: '52', md: '72' }}
          position="absolute"
          rounded="full"
          w={{ base: '60', md: '96' }}
          zIndex="-1"
          left="16"
          top="72"
          opacity="0.3"
          mixBlendMode="multiply"
        />
        <Box
          bg="blue.600"
          filter="blur(200px)"
          h={{ base: '52', md: '72' }}
          position="absolute"
          rounded="full"
          w={{ base: '60', md: '96' }}
          zIndex="-1"
          right="16"
          top="48"
          opacity="0.3"
          mixBlendMode="multiply"
        />
        <Box
          bg="yellow.600"
          filter="blur(200px)"
          h={{ base: '52', md: '72' }}
          position="absolute"
          rounded="full"
          w={{ base: '60', md: '96' }}
          zIndex="-1"
          right="64"
          top="56"
          opacity="0.3"
          mixBlendMode="multiply"
        />
        <App />
      </ChakraProvider>
    </SonicProvider>
  </React.StrictMode>
);
