import { apiClient } from '@config/apiClient'
import { gql } from 'graphql-request'

export const CREATE_SUBMISSION = gql`
  mutation createSubmission($id: ID!) {
    createSubmission(data: { quiz: { connect: { id: $id } } }) {
      id
    }
  }
`

export const createSubmission = async (quizId: string) => {
  const variables = { id: quizId }

  const { createSubmission } = await apiClient.request(
    CREATE_SUBMISSION,
    variables
  )

  return createSubmission.id as string
}
