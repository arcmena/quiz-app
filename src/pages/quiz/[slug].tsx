import { useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  useColorModeValue
} from '@chakra-ui/react'

import { SEO } from '@components/common/SEO'

import { getQuizzesIndex } from '@graphql/queries/getQuizzesIndex'
import { getQuizData } from '@graphql/queries/getQuizData'
import { TQuiz } from '@graphql/schema'

import {
  TEN_MINUTES_IN_SECONDS,
  AVG_QUESTION_TIME
} from '@constants/globalConstants'

interface QuizStartPageProps {
  quizData: TQuiz
}

const QuizStartPage: NextPage<QuizStartPageProps> = ({ quizData }) => {
  const { id: quizId, questions } = quizData

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const quizQuestionAmount = questions.length

  const averageQuizTime = quizQuestionAmount * AVG_QUESTION_TIME

  const handleStartSubmission = async () => {
    setIsLoading(true)

    try {
      const data = await fetch(`/api/submission/start/${quizId}`, {
        method: 'post'
      }).then(data => data.json())
  
      const { newSubmissionId } = data as {
        newSubmissionId: string
      }
    
      router.push(`/submission/${newSubmissionId}`)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  const quizInfoColor = useColorModeValue('gray.800', 'gray.300')

  return (
    <>
      <SEO
        title={`Quiz: ${quizData.title}`}
        description={quizData.description}
      />

      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        minHeight="lg"
        px={6}
      >
        <Heading as="h1" size="xl">
          {quizData.title}
        </Heading>
        <Text color="gray.500" fontSize="lg" mt={6}>
          {quizData.description}
        </Text>

        <Stack
          direction={['column', 'row']}
          spacing={[1, 4]}
          marginTop={4}
          justify="center"
        >
          <Text color={quizInfoColor} fontWeight="medium">
            {quizQuestionAmount} questions
          </Text>
          <Text as="span">&bull;</Text>
          <Text color={quizInfoColor} fontWeight="medium">
            Average completing time is {averageQuizTime} minutes
          </Text>
        </Stack>

        <Button
          colorScheme="purple"
          bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
          color="white"
          variant="solid"
          mt={6}
          paddingX="8"
          width="fit-content"
          isLoading={isLoading}
          onClick={handleStartSubmission}
        >
          Start
        </Button>
      </Flex>
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
