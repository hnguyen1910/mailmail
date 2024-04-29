"use client"
import { useContext, useEffect } from 'react';
import { Box, Button, Container, Heading, Text, Image, HStack, VStack, SimpleGrid, UnorderedList, ListItem, Flex } from '@chakra-ui/react'
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';

export default function Page() {

  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/app";
    }
  }, [isAuthenticated])

  const ListItemWithIcon = ({ children, icon, ...props }: any) => (
    <HStack spacing={2} mb={5} alignItems={'top'} {...props}>
      {icon}
      <Text>{children}</Text>
    </HStack>
  );

  return (
    <main>
      <Container maxW={870}>
        <Flex minHeight={'81vh'} alignItems={'center'} justifyContent={'center'} mb={10}>
          <VStack spacing={35} textAlign={'center'} py={70}>

            <Box bg="green.100" rounded={7} padding={[2, 3]} fontSize={['x-small', 'lg']}>
              <b>Personal website</b>
            </Box>

            <Heading as="h1" fontSize={['3xl', '5xl', '7xl']} fontWeight={900} m={0}>
              mailmail
            </Heading>
            <div>
              <Box maxW={660}>
                <Text fontSize={['md', 'xl']} lineHeight={2}>
                A mofified version of <Link color='yellow.100' href='https://github.com/jessetinell/x2.email'>x2.email</Link> ❤️
                </Text>
              </Box>
            </div>
          </VStack>
        </Flex>
      </Container>

    </main >
  )
}
