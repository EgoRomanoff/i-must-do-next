import Head from 'next/head'

function HeadOG({
  title,
  description,
  ogTitle,
  ogType,
  ogUrl,
  ogImg,
  ogSiteName,
  twitterCard,
  twitterSite
}) {

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta name="description" content={description}/>

      <meta property="og:title" content={ogTitle} />
      <meta property="og:type" content={ogType} />
      {/* <meta property="og:image" content="https://i.ibb.co/zXWJ0sQ/og-image.jpg" /> */}
      <meta property="og:image" content={ogImg} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={ogUrl} />

      <meta property="og:locale" content="ru_RU" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* <meta name="twitter:image" content="https://i.ibb.co/fSCGCWS/og-image-twitter.jpg" /> */}
      <meta name="twitter:image" content={ogImg} />
    </Head>
  )
}

export default HeadOG