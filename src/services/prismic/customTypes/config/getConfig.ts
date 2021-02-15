import { GetConfig } from 'services/CMS/config'
import Client from '../../client'

import configParser from './configParser'

const getConfig: GetConfig = async ({ ref }) => {
  const client = Client()
  const config = await client.getSingle('config', {
    ...(ref ? { ref } : {}),
  })

  if (!config) {
    throw new Error(
      'Undefined "config" document. Please create the single custom type and the document in Prismic. You can find the "config.json" in this repo at "src/services/prismic/customTypes/config/config.json". Use this file to import it in Prismic.',
    )
  }

  if (config.data.navigation.length === 0) {
    return configParser({ config, navigationItems: [] })
  }

  const navigationItemIds = config.data.navigation
    .filter(
      ({ navigation_item }: { navigation_item: { id: string } }) =>
        navigation_item.id,
    )
    .map(
      ({ navigation_item }: { navigation_item: { id: string } }) =>
        navigation_item.id,
    )

  const navigationItems = await client.getByIDs(navigationItemIds, {})

  return configParser({ config, navigationItems: navigationItems.results })
}

export default getConfig
