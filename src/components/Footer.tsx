'use client'

import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Link,
    useColorModeValue,
    Center,
    HStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import NextLink from 'next/link'
import { GithubIcon } from '@/icons'

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'900'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    )
}

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')} mt={'28'}>
            <Container as={Stack} maxW={'6xl'} pt={'16'} pb={'32'}>
                <SimpleGrid
                    templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr' }}
                    spacing={8}>
                    <Stack spacing={2}>
                        <Box>
                            <Link as={NextLink} href={"/"}>
                                <img src="/img/logo.svg" alt="mailmail" width={'130px'} />
                            </Link>
                        </Box>
                        <Text fontSize={'sm'}>
                            Personal email management
                        </Text>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Link as={NextLink} href={"https://github.com/hnguyen1910/mailmail"} isExternal={true}>
                            <HStack spacing={1} >
                                <GithubIcon />
                                <Text>Github</Text>
                            </HStack>
                        </Link>
                    </Stack>
                </SimpleGrid>
            </Container>
            <Center py={10} color={'gray.600'}>
                mailmail is not affiliated with Cloudflare
            </Center>
        </Box >
    )
}