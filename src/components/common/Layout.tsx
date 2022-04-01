import { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { ColorModeSwitcher } from '../elements/ColorModeSwitcher'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" py={8} px={6} maxW="container.md" marginX="auto">
      <Flex justifyContent="right">
        <ColorModeSwitcher />
      </Flex>
      <Box as="main">{children}</Box>
    </Box>
  )
}
