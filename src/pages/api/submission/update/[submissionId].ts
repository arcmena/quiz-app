import type { NextApiRequest, NextApiResponse } from 'next'

import { updateSubmission } from '@graphql/mutations/updateSubmission'
import { publishSubmission } from '@graphql/mutations/publishSubmission'

type Data = {
  newCurrentQuestionId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { submissionId } = req.query as { submissionId: string }
  const { nextQuestionId, isFinished, selectedAnswerId } = req.body as {
    nextQuestionId: string
    isFinished: boolean
    selectedAnswerId: string
  }

  const newCurrentQuestionId = await updateSubmission(
    submissionId,
    nextQuestionId,
    isFinished,
    selectedAnswerId
  )

  await publishSubmission(submissionId)

  res.status(200).json({ newCurrentQuestionId })
}
