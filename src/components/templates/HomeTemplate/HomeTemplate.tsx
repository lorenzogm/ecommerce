import PageLayout from 'components/foundations/PageLayout/PageLayout'
import Head from 'next/head'
import { ReactElement } from 'react'

import { Config, Navigation } from 'services/CMS/config'
import Hero, {
  HeroButton,
  HeroDescription,
  HeroTitle,
  HeroType,
} from 'components/elements/Hero/Hero'

type HomeTemplateProps = {
  config: Config
}

export default function HomeTemplate({
  config,
}: HomeTemplateProps): ReactElement {
  return (
    <PageLayout config={config}>
      <Head>
        <title>{config.siteName}</title>
      </Head>

      <Hero hero={getHeroFromCategory(config.navigation[0])} variant="primary">
        <HeroTitle />
        <HeroDescription />
        <HeroButton />
      </Hero>

      <div className="md:flex mt-8 justify-between">
        <div className="mr-4 w-full">
          <Hero hero={getHeroFromCategory(config.navigation[1])}>
            <HeroTitle />
            <HeroDescription />
            <HeroButton />
          </Hero>
        </div>
        <div className="w-full">
          <Hero hero={getHeroFromCategory(config.navigation[2])}>
            <HeroTitle />
            <HeroDescription />
            <HeroButton />
          </Hero>
        </div>
      </div>
    </PageLayout>
  )
}

function getHeroFromCategory(navigationItem: Navigation): HeroType | undefined {
  if (!navigationItem) {
    return undefined
  }

  return {
    backgroundImage: navigationItem.image,
    title: navigationItem.name,
    href: `/${navigationItem.slug}`,
    description: navigationItem.description,
  }
}
