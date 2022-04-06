import { ReactNode } from 'react'
import { Box } from '@chakra-ui/layout'

import { ColorModeSwitcher } from '../elements/ColorModeSwitcher'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      minH="100vh"
      py={8}
      px={6}
      maxW="container.md"
      marginX="auto"
      position="relative"
    >
      <ColorModeSwitcher />
      <Box as="main">{children}</Box>
    </Box>
  )
}
