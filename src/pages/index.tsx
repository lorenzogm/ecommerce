import { GetStaticProps } from 'next'

import HomeTemplate from 'components/templates/HomeTemplate/HomeTemplate'
import getCMS from 'services/CMS/getCMS'

export default HomeTemplate

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const CMS = getCMS()

  const config = await CMS.getConfig()

  return {
    props: {
      preview,
      config,
    },
  }
}
