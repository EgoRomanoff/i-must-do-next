import Link from "next/link"
import HeadOG from "../../components/HeadOG/HeadOG"
import staticMeta from "../static-meta"
import Image from "next/image"

function Usage() {
  const comingSoonImg = '/img/coming-soon.jpg'

  return (
    <div>
      <HeadOG
        title={`I Must Do - Usage`}
        description={`Wide description about how to use 'I Must Do' and get the greatest user experience!`}
        ogTitle={`How to use 'I Must Do'`}
        ogType={`article`}
        ogUrl={`https://i-must-do-next.vercel.app/usage`}
        ogImg={ comingSoonImg }
        ogSiteName={`Web TODO 'I Must Do'`}
        twitterCard={ staticMeta.twitterCard }
        twitterSite={ staticMeta.twitterSite }
      />
      <Link href="/">Назад</Link>
      <h1>How to use 'I Must Do'</h1>
      <Image
        src={ comingSoonImg }
        width='640'
        height='427'
        alt="Coming Soon..."
        priority={ true }
      />
    </div>
  )
}

export default Usage