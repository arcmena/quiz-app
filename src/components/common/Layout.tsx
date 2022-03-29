import { ReactNode } from 'react'
import { Box } from '@chakra-ui/layout'
import { ColorModeSwitcher } from '../elements/ColorModeSwitcher'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Box as="main">{children}</Box>
    </Box>
  )
}
