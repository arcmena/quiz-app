import { apiClient } from '@config/apiClient'
import { gql } from 'graphql-request'

export const UPDATE_SUBMISSION = gql`
  mutation updateSubmission(
    $submissionId: ID!
    $nextQuestionId: String
    $isFinished: Boolean
    $selectedAnswerId: ID!
  ) {
    updateSubmission(
      where: { id: $submissionId }
      data: {
        currentQuestionId: $nextQuestionId
        isFinished: $isFinished
        selectedAnswers: { connect: { where: { id: $selectedAnswerId } } }
      }
    ) {
      id
    }
  }
`

export const updateSubmission = async (
  submissionId: string,
  nextQuestionId: string,
  isFinished: boolean,
  selectedAnswerId: string
) => {
  const variables = {
    submissionId,
    nextQuestionId,
    isFinished,
    selectedAnswerId
  }

  const { updateSubmission } = await apiClient.request(
    UPDATE_SUBMISSION,
    variables
  )

  return updateSubmission.currentQuestionId as string
}
