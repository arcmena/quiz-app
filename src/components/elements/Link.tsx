import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/react'

export interface LinkProps extends ChakraLinkProps {
  className?: string
  children: ReactNode
  isExternal?: boolean
  onClick?: () => void
  title?: string
  // @ts-ignore
  href: Url
}

export default function Link({
  href,
  children,
  isExternal = false,
  ...rest
}: LinkProps) {
  if (isExternal) {
    return (
      <ChakraLink
        href={String(href)}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </ChakraLink>
    )
  }

  return (
    <NextLink href={href} passHref>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </NextLink>
  )
}
