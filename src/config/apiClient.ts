import { GraphQLClient } from 'graphql-request'

import { API_AUTH, API_ENDPOINT } from '@constants/apiConstants'

export const apiClient = new GraphQLClient(API_ENDPOINT, { ...API_AUTH })
