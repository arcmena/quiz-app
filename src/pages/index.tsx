import type { GetStaticProps, NextPage } from 'next'
import {
  Box,
  Text,
  Flex,
  VStack,
  Stack,
  Heading,
  useColorMode
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

import Link from '@components/elements/Link'

import {
  getLatestQuizzes,
  TLatestQuizzes
} from '@graphql/queries/getLatestQuizzes'

import { SEO } from '@components/common/SEO'

import { TEN_MINUTES_IN_SECONDS } from '@constants/globalConstants'

interface HomePageProps {
  latestQuizzes: TLatestQuizzes
}

const HomePage: NextPage<HomePageProps> = ({ latestQuizzes }) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <SEO title="Arctiquiz" description="Quizzes!" />

      <VStack spacing={6} align="start">
        <Stack>
          <Heading as="h2" size="lg">
            Which test you want to do?
          </Heading>
          <Text fontSize="lg" fontWeight="medium" color="gray.400">
            Start by choosing one of the quizzes below
          </Text>
        </Stack>

        <VStack as="nav" spacing={6} width="full">
          {latestQuizzes.map(({ id, title, description, slug }) => (
            <Link
              key={id}
              href={`/quiz/${slug}`}
              width="full"
              _hover={{ textDecoration: 'none' }}
            >
              <Flex
                justifyContent="space-between"
                cursor="pointer"
                width="full"
                borderY="1px"
                borderTopColor={colorMode === 'light' ? 'gray.700' : 'gray.700'}
                borderBottomColor={
                  colorMode === 'light' ? 'gray.700' : 'gray.700'
                }
                paddingY={4}
              >
                <Stack>
                  <Heading as="h4" size="md" color="purple.400">
                    {title}
                  </Heading>
                  <Text fontSize="md" fontWeight="medium" color="gray.400">
                    {description}
                  </Text>
                </Stack>
                <Flex alignItems="center">
                  <ChevronRightIcon width={6} height={6} color="gray.400" />
                </Flex>
              </Flex>
            </Link>
          ))}
        </VStack>
      </VStack>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const latestQuizzes = await getLatestQuizzes()

  return {
    props: {
      latestQuizzes
    },
    revalidate: TEN_MINUTES_IN_SECONDS
  }
}

export default HomePage
