import { gql } from 'graphql-request'

import { apiClient } from '@config/apiClient'
import { TQuiz } from '../schema'

export const GET_QUIZ_DATA = gql`
  query getQuizData($slug: String!) {
    quiz(where: { slug: $slug }) {
      id
      createdAt
      title
      description
      slug
      questions {
        id
      }
    }
  }
`

export const getQuizData = async (slug: string) => {
  const variables = { slug }

  const { quiz } = await apiClient.request(GET_QUIZ_DATA, variables)

  return quiz as TQuiz
}
