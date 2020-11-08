import { ReactElement, ReactNode, useState } from 'react'

import PageContainer from 'components/foundations/PageContainer/PageContainer'
import Meta from 'components/foundations/PageLayout/Meta'
import type { Config } from 'services/CMS/config'

import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'
import { State } from './PageLayout.d'

type PageLayoutProps = {
  preview: boolean
  config: Config
  children: ReactNode
}
export default function PageLayout({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preview,
  config,
  children,
}: PageLayoutProps): ReactElement {
  const [state, setState] = useState<State>({ isCartOpen: false })

  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header config={config} setState={setState} />
        <Aside state={state} setState={setState} />
        <PageContainer>
          <main>{children}</main>
        </PageContainer>
      </div>
      <Footer config={config} />
    </>
  )
}
