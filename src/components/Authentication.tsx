"use client"
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialogBody, AlertDialogHeader, Button, Code, Flex, FormControl, FormLabel, HStack, Img, Input, InputGroup, InputRightElement, ListItem, OrderedList, Stack, Switch, Text, UnorderedList, useToast } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ArrowForwardIcon, ChevronRightIcon, ExternalLinkIcon, LockIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { UserContext } from '@/context/UserContext';
import InputHelpButton from './InputHelpButton';
import { H3 } from "./Headings";

interface IAuthenticationForm {
    accountId?: string;
    zoneId?: string;
    accessToken?: string;
    quickAuth?: string;
}

export default function Authentication() {

    const router = useRouter();
    const { authorize, isAuthenticated, isLoading } = useContext(UserContext);
    const [isQuickAuth, setIsQuickAuth] = useState(true);
    const toast = useToast()

    const { register, handleSubmit } = useForm<IAuthenticationForm>();

    const onSubmit = async (data: IAuthenticationForm) => {
        let { accountId, zoneId, accessToken, quickAuth } = data;

        if (isQuickAuth && quickAuth) {
            [accountId, zoneId, accessToken] = quickAuth.split(",");
        }

        if (!accountId || !zoneId || !accessToken) {
            toast({
                title: "Please fill in all fields",
                status: "error"
            })
            return;
        }

        await authorize(accountId, zoneId, accessToken);
    }

    useEffect(() => {

        if (!isLoading && isAuthenticated) {
            router.push("/app");
        }

    }, [isAuthenticated, isLoading])

    const QuickAuth = () => (
        <>
            <InputGroup>
                <Input placeholder="Quick Auth" type="password" tabIndex={3} defaultValue={process.env.NEXT_PUBLIC_QUICK_AUTH} {...register("quickAuth", { required: true })} />
                <InputRightElement>
                    <InputHelpButton content={<>
                        <AlertDialogHeader fontSize='2xl' fontWeight='bold'>
                            Quick Auth
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text>
                                <b>Format: </b>
                                <br /><Code>Account ID, Zone ID, Access token</Code>
                                <br />
                                <br />
                                <b>Example:</b><br /> <Code>123,456,abc</Code>
                            </Text>
                        </AlertDialogBody>
                    </>} />
                </InputRightElement>
            </InputGroup>
        </>
    )

    const RegularAuth = () => (
        <>
            <InputGroup>
                <Input placeholder="Account ID" tabIndex={1} defaultValue={process.env.NEXT_PUBLIC_ACCOUNT_ID}  {...register("accountId", { required: true })} />
            </InputGroup>
            <InputGroup>
                <Input placeholder="Zone ID" tabIndex={2} defaultValue={process.env.NEXT_PUBLIC_ZONE_ID} {...register("zoneId", { required: true })} />
            </InputGroup>

            <InputGroup>
                <Input placeholder="Access token" type="password" tabIndex={3} defaultValue={process.env.NEXT_PUBLIC_ACCESS_TOKEN} {...register("accessToken", { required: true })} />
                <InputRightElement>
                    <InputHelpButton content={<>
                        <AlertDialogHeader fontSize='2xl' fontWeight='bold'>
                            Access token
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text mb={2} fontWeight={'bold'}>
                                Permissions:
                            </Text>
                            <OrderedList spacing={3}>
                                <ListItem>
                                    <Code>Account</Code><ChevronRightIcon /><Code>Email Routing Addresses</Code><ChevronRightIcon /><Code>Read</Code>
                                </ListItem>
                                <ListItem>
                                    <Code>Zone</Code><ChevronRightIcon /><Code>Email Routing Rules</Code><ChevronRightIcon /><Code>Edit</Code>
                                </ListItem>
                                <ListItem>
                                    <Code>Zone</Code><ChevronRightIcon /><Code>Zone Settings</Code><ChevronRightIcon /><Code>Read</Code>
                                </ListItem>
                            </OrderedList> 
                            <br />
                            <NextLink href="https://dash.cloudflare.com/profile/api-tokens" target='_blank'>
                                <Button colorScheme='orange' rightIcon={<ExternalLinkIcon />} size={'md'}>
                                    Open token manager
                                </Button>
                            </NextLink>
                        </AlertDialogBody>
                    </>} />
                </InputRightElement>
            </InputGroup>
        </>
    )

    return (
        <>
            <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} mt={20}>

                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <H3 m={0}>Cloudflare info</H3>
                    <div>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='email-alerts' mb='0'>
                                Quick auth
                            </FormLabel>
                            <Switch id='email-alerts'
                                onChange={(e) => setIsQuickAuth(e.target.checked)}
                            />
                        </FormControl>
                    </div>
                </Flex>

                {isQuickAuth ? <QuickAuth /> : <RegularAuth />}

                <Button type="submit"
                    iconSpacing="2"
                    isLoading={isLoading}
                    tabIndex={4}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="orange" size={"lg"}>
                    Connect to Cloudflare
                </Button>
            </Stack>
        </>
    )
}
