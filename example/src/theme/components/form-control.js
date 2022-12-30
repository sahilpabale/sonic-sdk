import { formAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';
import { runIfFn } from '../utils/run-if-fn';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleRequiredIndicator = defineStyle(() => {
  return {
    marginStart: '1',
    color: 'state.error'
  };
});

const baseStyleHelperText = defineStyle(() => {
  return {
    mt: '2',
    color: 'brand.quaternary',
    lineHeight: 'normal',
    fontSize: 'sm'
  };
});

const baseStyle = definePartsStyle(() => ({
  container: {
    width: '100%',
    position: 'relative'
  },
  requiredIndicator: runIfFn(baseStyleRequiredIndicator),
  helperText: runIfFn(baseStyleHelperText)
}));

export const formTheme = defineMultiStyleConfig({
  baseStyle
});

export default formTheme;
