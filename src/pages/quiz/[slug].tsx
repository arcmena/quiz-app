import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Box, Heading, Text, Button } from '@chakra-ui/react'

import { getQuizzesIndex } from '@graphql/queries/getQuizzesIndex'
import { getQuizData } from '@graphql/queries/getQuizData'
import { TQuiz } from '@graphql/schema'

import { SEO } from '@components/common/SEO'

import { TEN_MINUTES_IN_SECONDS } from '@constants/globalConstants'

interface QuizStartPageProps {
  quizData: TQuiz
}

const QuizStartPage: NextPage<QuizStartPageProps> = ({ quizData }) => {
  return (
    <>
      <SEO
        title={`Quiz ${quizData.title}`}
        description={quizData.description}
      />

      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {quizData.title}
        </Heading>
        <Text color="gray.500" fontSize="lg">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>

        <Button
          colorScheme="purple"
          bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
          color="white"
          variant="solid"
          mt={6}
        >
          Start
        </Button>
      </Box>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const quizzes = await getQuizzesIndex()

  const quizzesPaths = quizzes.map(({ slug }) => ({ params: { slug } }))

  return {
    paths: quizzesPaths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as { slug: string }

  const quizData = await getQuizData(slug)

  return {
    props: {
      quizData
    },
    revalidate: TEN_MINUTES_IN_SECONDS
  }
}

export default QuizStartPage
