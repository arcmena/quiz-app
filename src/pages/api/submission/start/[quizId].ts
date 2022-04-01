import type { NextApiRequest, NextApiResponse } from 'next'

import { createSubmission } from '@graphql/mutations/createSubmission'
import { publishSubmission } from '@graphql/mutations/publishSubmission'

type Data = {
  newSubmissionId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { quizId } = req.query as { quizId: string }

  const newSubmissionId = await createSubmission(quizId)

  await publishSubmission(newSubmissionId)

  res.status(201).json({ newSubmissionId })
}
