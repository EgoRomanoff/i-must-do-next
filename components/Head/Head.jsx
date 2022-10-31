import React from 'react'
import { Helmet } from "react-helmet";
import ogImage from '../../img/og-image.jpg'
import ogImageTwitter from '../../img/og-image-twitter.jpg'

function Head() {
  return (
    <Helmet>
      <meta property="og:title" content="I Must Do" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ ogImage } />
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta property="og:url" content="egoromanoff.github.io/i-must-do-react/" />

      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ru_RU" />
      <meta property="og:site_name" content="Web TODO 'I Must Do'"/>
      <meta property="og:description" content="Web TODO-application based on React.js" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@EgoRomanoff" />
      <meta name="twitter:title" content="I Must Do" />
      <meta name="twitter:description" content="Web TODO-application. Based on React.js" />
      <meta name="twitter:image" content={ ogImageTwitter } />
    </Helmet>
  )
}

export default Head