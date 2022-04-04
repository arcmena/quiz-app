import { useCallback, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Checkbox,
  Button
} from '@chakra-ui/react'

import { SEO } from '@components/common/SEO'

import { getSubmissionData } from '@graphql/queries/getSubmissionData'
import { TQuestion, TSubmission } from '@graphql/schema'

const getQuestion = (questionId: string, questions: [TQuestion]): TQuestion => {
  const question = questions.find(({ id }) => id === questionId)

  return question ?? questions[0]
}

const getCurrentIndex = (questionId: string, questions: [TQuestion]): number =>
  questions.findIndex(({ id }) => id === questionId)

interface SubmissionPageProps {
  submissionData: TSubmission
}

const SubmissionPage: NextPage<SubmissionPageProps> = ({ submissionData }) => {
  const { currentQuestionId, quiz } = submissionData
  const { title: quizTitle, questions } = quiz

  const [currentQuestion, setCurrentQuestion] = useState<TQuestion>(
    getQuestion(currentQuestionId, questions)
  )
  const [selectedAnswerId, setSelectedAnswerId] = useState('')

  // const isFirstQuestion = !currentQuestionId && !isFinished
  // const questionsRemaining = questions.slice(questions.findIndex(({ id }) => id === currentQuestion.id) + 1, questions.length).length

  const hasSelectedAnswer = !!selectedAnswerId

  const getQuestionIndex = useCallback(() => {
    const question = getCurrentIndex(currentQuestion.id, questions) + 1

    return `${question} of ${questions.length}`
  }, [currentQuestion.id, questions])

  const handleChangeSelectedAnswerId = useCallback(
    id => setSelectedAnswerId(id),
    []
  )

  const handleNextQuestion = () => {
    const nextQuestion = getCurrentIndex(currentQuestion.id, questions) + 1

    setSelectedAnswerId('')
    setCurrentQuestion(questions[nextQuestion])
  }

  return (
    <>
      <SEO title={`Quiz: ${quiz.title}`} description={quiz.description} />
      <Box>
        <Flex>
          <Text fontWeight="medium" color="gray.300">
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
                border="1px"
                borderColor="gray.600"
                borderRadius="md"
                width="full"
                padding={4}
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
            disabled={!hasSelectedAnswer}
            onClick={handleNextQuestion}
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

  return {
    props: {
      submissionData
    }
  }
}

export default SubmissionPage
