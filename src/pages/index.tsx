import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Box, Text, Link as ChakraLink, VStack, Code } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Arctiquiz</title>
      </Head>
      <Box textAlign="center" fontSize="xl">
        <VStack spacing={8}>
          <Text>
            Arctiquiz! <Code fontSize="xl">Tests and Quizzes</Code>
          </Text>
          <Link href="/submission/1" passHref>
            <ChakraLink color="teal.500" fontSize="2xl">
              Go to submission
            </ChakraLink>
          </Link>
        </VStack>
      </Box>
    </>
  )
}

export default Home
