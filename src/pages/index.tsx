import { GetStaticProps } from 'next'

import { ReactElement } from 'react'
import ContentTemplate from 'components/templates/ContentTemplate/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'

const { PAGE_HOME } = process.env

export const getStaticProps: GetStaticProps = async () => {
  if (PAGE_HOME !== 'ENABLED') {
    return {
      props: {
        isPageEnabled: false,
      },
    }
  }

  const CMS = getCMS()

  const [config, content] = await Promise.all([
    CMS.getConfig(),
    CMS.getContentByUID({ uid: 'home' }),
  ])

  return {
    props: {
      config,
      content,
    },
  }
}

type HomePageProps = {
  config: Config
  content: Content
}

export default function HomePage({
  config,
  content,
}: HomePageProps): ReactElement {
  return <ContentTemplate config={config} content={content} />
}
