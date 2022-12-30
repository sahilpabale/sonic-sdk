import React from 'react';
import { Sonic } from '@0xsonic/sdk';
import { Heading, Link, VStack, Button, HStack, Text, Flex, Icon, chakra, useClipboard } from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { BsGithub } from 'react-icons/bs';
import { ImNpm } from 'react-icons/im';

const COMMAND = 'yarn add';
const PACKAGES = '@0xsonic/sdk';

const INSTALL_COMMAND = `${COMMAND} ${PACKAGES}`;

function App() {
  const { onCopy: onInstallCommandCopy, hasCopied: hasCopiedInstallCommand } = useClipboard(INSTALL_COMMAND);

  return (
    <>
      <VStack mx={[8, 16]} my={16} gap={16}>
        <VStack gap={4}>
          <Heading as="h1" fontWeight="bold" fontSize="5xl">
            Sonic ⚡️
          </Heading>
          <Heading textColor="whiteAlpha.800" fontWeight="semibold" fontSize="2xl" textAlign="center">
            Plug 'n' Play comments widget for your react application powered by the{' '}
            <Link href="https://orbis.club/" isExternal textColor="green.400" _hover={{ textColor: 'green.500' }}>
              Orbis Protocol
            </Link>
          </Heading>
        </VStack>
        <VStack gap="4">
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
          <HStack>
            <Link href="https://github.com/sahilpabale/sonic-sdk" isExternal>
              <Button
                bg="brand.secondary"
                justifyContent="center"
                alignItems="center"
                rounded="full"
                cursor="pointer"
                pl={4}
                pr={4}
                h={12}
                as={HStack}
                spacing={6}
                textAlign="center"
                role="group"
                fontFamily="mono"
                leftIcon={<BsGithub />}
              >
                sonic-sdk
              </Button>
            </Link>
            <Link href="https://npmjs.com/@0xsonic/sdk" isExternal>
              <Button
                bg="brand.secondary"
                justifyContent="center"
                alignItems="center"
                rounded="full"
                cursor="pointer"
                pl={4}
                pr={4}
                h={12}
                as={HStack}
                spacing={6}
                textAlign="center"
                role="group"
                fontFamily="mono"
                leftIcon={<ImNpm />}
              >
                @0xsonic/sdk
              </Button>
            </Link>
          </HStack>
        </VStack>
      </VStack>
      <VStack mx={[8, 16]} my={16} gap={8}>
        <Sonic context="sonic" />
        <Text textColor="gray.300" fontFamily="mono">
          built with 🫶🏻 by{' '}
          <Link href="https://sahil.lol" isExternal textColor="green.400" _hover={{ textColor: 'green.500' }}>
            sahilpabale.eth
          </Link>{' '}
          &{' '}
          <Link href="https://anishde.dev" isExternal textColor="green.400" _hover={{ textColor: 'green.500' }}>
            anishde.eth
          </Link>
        </Text>
      </VStack>
    </>
  );
}

export default App;
