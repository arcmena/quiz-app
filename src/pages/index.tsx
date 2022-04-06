import type { GetStaticProps, NextPage } from 'next'
import {
  Box,
  Text,
  Flex,
  VStack,
  Stack,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

import Link from '@components/elements/Link'
import { SEO } from '@components/common/SEO'

import {
  getLatestQuizzes,
  TLatestQuizzes
} from '@graphql/queries/getLatestQuizzes'

import { TEN_MINUTES_IN_SECONDS } from '@constants/globalConstants'

interface HomePageProps {
  latestQuizzes: TLatestQuizzes
}

const HomePage: NextPage<HomePageProps> = ({ latestQuizzes }) => {
  const borderColor = useColorModeValue('gray.500', 'gray.600')
  const secondaryColor = useColorModeValue('gray.800', 'gray.300')
  const headingColor = useColorModeValue('purple.600', 'purple.500')

  return (
    <>
      <SEO title="Arctiquiz" description="Quizzes!" />

      <VStack spacing={6} align="start">
        <Stack>
          <Heading as="h2" size="lg">
            Which test you want to do?
          </Heading>
          <Text fontSize="lg" fontWeight="medium" color={secondaryColor}>
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
                border="2px"
                borderColor={borderColor}
                borderRadius="md"
                padding={4}
              >
                <Stack spacing={2}>
                  <Heading as="h4" size="md" color={headingColor}>
                    {title}
                  </Heading>
                  <Text fontSize="md" color={secondaryColor}>
                    {description}
                  </Text>
                </Stack>
                <Flex alignItems="center">
                  <ChevronRightIcon width={6} height={6} color={borderColor} />
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
