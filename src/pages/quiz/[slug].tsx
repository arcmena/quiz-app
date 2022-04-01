import { useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
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
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleStartSubmission = async () => {
    setIsLoading(true)

    const data = await fetch(`/api/submission/start/${quizData.id}`, {
      method: 'post'
    })

    const { newSubmissionId } = (await data.json()) as {
      newSubmissionId: string
    }

    setIsLoading(false)

    router.push(`/submission/${newSubmissionId}`)
  }

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
          {quizData.description}
        </Text>

        <Button
          colorScheme="purple"
          bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
          color="white"
          variant="solid"
          mt={6}
          isLoading={isLoading}
          onClick={handleStartSubmission}
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
