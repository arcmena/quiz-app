import { apiClient } from '@config/apiClient'
import { gql } from 'graphql-request'

export const PUBLISH_SUBMISSION = gql`
  mutation publishSubmission($id: ID!) {
    publishSubmission(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`

export const publishSubmission = async (submissionId: string) => {
  const variables = { id: submissionId }

  const { publishSubmission } = await apiClient.request(
    PUBLISH_SUBMISSION,
    variables
  )

  return publishSubmission.id as string
}
