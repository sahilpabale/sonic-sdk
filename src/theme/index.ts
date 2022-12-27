import { extendTheme } from '@chakra-ui/react';
import { mainColors, stateColors } from './colors';
import { components } from './components';

const theme = extendTheme({
  components,
  semanticTokens: {
    colors: { ...mainColors, ...stateColors }
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true
  },
  styles: {
    global: () => ({
      body: {
        bg: ''
      }
    })
  }
});

export default theme;
