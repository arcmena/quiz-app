import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/layout'

import { NextPage } from 'next'

const SubmissionPage: NextPage = () => {
  const router = useRouter()
  const { submissionId } = router.query

  return (
    <Box textAlign="center" fontSize="xl">
      <Text>Submission {submissionId}</Text>
    </Box>
  )
}

export default SubmissionPage
