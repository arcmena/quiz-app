import { gql } from 'graphql-request'

import { apiClient } from '@config/apiClient'
import { TSubmission } from '../schema'

export const GET_SUBMISSION_DATA = gql`
  query getSubmissionData($id: ID!) {
    submission(where: { id: $id }) {
      id
      currentQuestionId
      isFinished
      selectedAnswers {
        id
        text
        isCorrectAnswer
      }
      quiz {
        title
        description
        slug
        questions {
          id
          text
          answers {
            id
            text
          }
        }
      }
    }
  }
`

export const getSubmissionData = async (submissionId: string) => {
  const variables = { id: submissionId }

  const { submission } = await apiClient.request(GET_SUBMISSION_DATA, variables)

  return submission as TSubmission
}
