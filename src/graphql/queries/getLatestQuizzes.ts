import { gql } from 'graphql-request'

import { apiClient } from '@config/apiClient'
import { TQuiz } from '../schema'

export const GET_LATEST_QUIZZES = gql`
  query getLatestQuizzes {
    quizzes(orderBy: createdAt_DESC) {
      id
      title
      description
      slug
    }
  }
`

export type TLatestQuizzes = [Omit<TQuiz, 'createdAt' | 'questions'>]

export const getLatestQuizzes = async () => {
  const { quizzes } = await apiClient.request(GET_LATEST_QUIZZES)

  return quizzes as TLatestQuizzes
}
