import Head from 'next/head'

export interface SEOProps {
  title: string
  description: string
}

export const SEO = ({ title, description }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta itemProp="name" content={title} />
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="description" content={description} />
      <meta itemProp="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
