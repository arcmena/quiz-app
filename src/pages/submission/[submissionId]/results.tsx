import { GetServerSideProps, NextPage } from 'next'
import { Box, Heading, Text } from '@chakra-ui/layout'

import { SEO } from '@components/common/SEO'

import { getSubmissionData } from '@graphql/queries/getSubmissionData'
import { TSubmission } from '@graphql/schema'

interface QuizResultsPageProps {
  submissionData: TSubmission
}

const QuizResultsPage: NextPage<QuizResultsPageProps> = ({
  submissionData
}) => {
  const { quiz, selectedAnswers } = submissionData
  const { questions } = quiz

  const correctAnswers = selectedAnswers?.filter(
    ({ isCorrectAnswer }) => isCorrectAnswer
  ).length

  const getResults = () => {
    return `${correctAnswers} of ${questions.length}`
  }

  return (
    <>
      <SEO
        title={`Results: ${quiz.title}`}
        description={`Results: ${quiz.title}`}
      />

      <Box textAlign="center" fontSize="xl">
        <Heading size="xl">Results: {quiz.title}</Heading>
        <Text>Your score is: {getResults()}</Text>
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

export default QuizResultsPage
