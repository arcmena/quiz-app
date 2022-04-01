import { gql } from 'graphql-request'

import { apiClient } from '@config/apiClient'
import { TQuiz } from '../schema'

export const GET_QUIZZES_INDEX = gql`
  query getQuizzesIndex {
    quizzes {
      slug
    }
  }
`

export type TQuizzesIndex = [
  Omit<TQuiz, 'id' | 'createdAt' | 'title' | 'description' | 'questions'>
]

export const getQuizzesIndex = async () => {
  const { quizzes } = await apiClient.request(GET_QUIZZES_INDEX)

  return quizzes as TQuizzesIndex
}
