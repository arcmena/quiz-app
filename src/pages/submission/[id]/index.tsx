import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/router'

export default function SubmissionIndexPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <Box textAlign="center" fontSize="xl">
      <Text>Submission {id}</Text>
    </Box>
  )
}
