import React from 'react';
import { Sonic } from '@0xsonic/sdk';
import { Heading, Link, VStack, Button, HStack, Text, Flex, Icon, chakra, useClipboard } from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';

const COMMAND = 'yarn add';
const PACKAGES = '@0xsonic/sdk';

const INSTALL_COMMAND = `${COMMAND} ${PACKAGES}`;

function App() {
  const { onCopy: onInstallCommandCopy, hasCopied: hasCopiedInstallCommand } = useClipboard(INSTALL_COMMAND);

  return (
    <VStack mx={[8, 16]} my={16} gap={16}>
      <VStack gap={4}>
        <Heading as="h1" fontWeight="bold" fontSize="5xl">
          Sonic ⚡️
        </Heading>
        <Heading textColor="whiteAlpha.800" fontWeight="semibold" fontSize="2xl" textAlign="center">
          Plug 'n' play comments for your React application powered by the{' '}
          <Link href="https://orbis.club/" isExternal textColor="green.400" _hover={{ textColor: 'green.500' }}>
            Orbis protocol
          </Link>
        </Heading>
      </VStack>

      <Button
        bg="brand.secondary"
        justifyContent="center"
        alignItems="center"
        rounded="full"
        cursor="copy"
        onClick={onInstallCommandCopy}
        pl={6}
        pr={4}
        h={12}
        as={HStack}
        spacing={6}
        textAlign="center"
        role="group"
      >
        <Text textColor="gray.300" fontFamily="mono">
          <chakra.span textColor="green.400">{COMMAND}</chakra.span> {PACKAGES}
        </Text>
        <chakra.span
          bg={hasCopiedInstallCommand ? 'green.600' : 'brand.tertiary'}
          rounded="full"
          w={8}
          h={8}
          as={Flex}
          alignItems="center"
          justifyContent="center"
          _groupHover={{
            bg: hasCopiedInstallCommand ? 'green.500' : 'brand.quaternary'
          }}
        >
          <Icon as={hasCopiedInstallCommand ? CheckIcon : CopyIcon} aria-label={'Copy Command'} w={4} h={4} textAlign="center" />
        </chakra.span>
      </Button>
      <Sonic context="sonic" />
    </VStack>
  );
}

export default App;
