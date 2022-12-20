import { extendTheme } from '@chakra-ui/react';
import { accentPurple, accentTokens, mainColors, stateColors } from './colors';
import { components } from './components';

const theme = extendTheme({
  components,
  colors: { ...accentPurple },
  semanticTokens: {
    colors: { ...mainColors, ...stateColors, ...accentTokens }
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
