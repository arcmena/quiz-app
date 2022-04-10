/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Checkbox,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import NProgress from 'nprogress'

import { SEO } from '@components/common/SEO'

import { getSubmissionData } from '@graphql/queries/getSubmissionData'
import { TQuestion, TSubmission } from '@graphql/schema'

const getQuestion = (
  questionId: string | null,
  questions: [TQuestion]
): TQuestion => {
  const question = questions.find(({ id }) => id === questionId)

  return question ?? questions[0]
}

const getCurrentQuestionIndex = (
  questionId: string,
  questions: [TQuestion]
): number => questions.findIndex(({ id }) => id === questionId)

interface SubmissionPageProps {
  submissionData: TSubmission
}

const SubmissionPage: NextPage<SubmissionPageProps> = ({ submissionData }) => {
  const router = useRouter()

  const {
    id: submissionId,
    currentQuestionId,
    quiz,
  } = submissionData
  const { title: quizTitle, questions } = quiz

  const [currentQuestion, setCurrentQuestion] = useState<TQuestion>(
    getQuestion(currentQuestionId, questions)
  )

  const [selectedAnswerId, setSelectedAnswerId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const hasSelectedAnswer = !!selectedAnswerId
  const currentQuestionIndex = getCurrentQuestionIndex(
    currentQuestion.id,
    questions
  )

  useEffect(() => {
      const currentPosition = currentQuestionIndex + 1
      const max = questions.length + 1

      NProgress.configure({ showSpinner: false, trickle: false, minimum: 0.1 })
      NProgress.set(currentPosition / max)
  }, [currentQuestionIndex, questions])

  const getQuestionIndex = useCallback(() => {
    const question = currentQuestionIndex + 1

    return `${question} of ${questions.length}`
  }, [currentQuestionIndex, questions.length])

  const handleChangeSelectedAnswerId = useCallback(
    id => setSelectedAnswerId(id),
    []
  )

  const handleNextQuestion = async () => {
    setIsLoading(true)

    try {
      const nextQuestion = questions[currentQuestionIndex + 1]

      const body = JSON.stringify({
        nextQuestionId: nextQuestion?.id,
        isFinished: !nextQuestion,
        selectedAnswerId
      })

      await fetch(`/api/submission/update/${submissionId}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })

      if (nextQuestion) {
        setSelectedAnswerId('')
        setCurrentQuestion(nextQuestion)
        setIsLoading(false)
        return
      }

      NProgress.done()
      router.push(`/submission/${submissionId}/results`)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  const questionColor = useColorModeValue('gray.800', 'gray.300')
  const checkboxColor = useColorModeValue('gray.500', 'gray.600')

  return (
    <>
      <SEO title={`Quiz: ${quiz.title}`} description={quiz.description} />

      <Box>
        <Flex>
          <Text fontWeight="medium" color={questionColor}>
            Question {getQuestionIndex()}
          </Text>
          <Text marginLeft={4} fontWeight="bold">
            {quizTitle}
          </Text>
        </Flex>
        <Flex mt={8} direction="column">
          <Heading size="md">{currentQuestion.text}</Heading>
          <VStack align="start" mt={6} spacing={4}>
            {currentQuestion.answers.map(({ id, text }) => (
              <Checkbox
                key={id}
                colorScheme="purple"
                isChecked={selectedAnswerId === id}
                onChange={() => handleChangeSelectedAnswerId(id)}
                border="2px"
                borderColor={
                  selectedAnswerId === id ? 'purple.600' : checkboxColor
                }
                borderRadius="md"
                width="full"
                padding={4}
                disabled={isLoading}
              >
                {text}
              </Checkbox>
            ))}
          </VStack>
        </Flex>
        <HStack spacing={4} mt={4} justifyContent="end">
          <Button colorScheme="gray">Exit</Button>
          <Button
            colorScheme="purple"
            bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
            color="white"
            variant="solid"
            disabled={!hasSelectedAnswer || isLoading}
            onClick={handleNextQuestion}
            isLoading={isLoading}
          >
            Next question
          </Button>
        </HStack>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { submissionId } = context.query as { submissionId: string }

  const submissionData = await getSubmissionData(submissionId)

  if (submissionData.isFinished) {
    return {
      props: {},
      redirect: {
        destination: `/submission/${submissionId}/results`,
        permanent: false
      }
    }
  }

  return {
    props: {
      submissionData
    }
  }
}

export default SubmissionPage
