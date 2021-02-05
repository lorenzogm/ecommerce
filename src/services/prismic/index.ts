// category
import getAllCategories from './customTypes/category/getAllCategories'
import getCategoryByUID from './customTypes/category/getCategoryByUID'

// config
import getConfig from './customTypes/config/getConfig'

// product
import getAllProducts from './customTypes/product/getAllProducts'
import getAllProductsByCategory from './customTypes/product/getAllProductsByCategory'
import getAllProductsByTags from './customTypes/product/getAllProductsByTags'
import getAllProductsSku from './customTypes/product/getAllProductsSku'
import getProductByUID from './customTypes/product/getProductByUID'

// translations
import getTranslations from './customTypes/translations/getTranslations'

import client from './client'

export default {
  client,

  // category
  getAllCategories,
  getCategoryByUID,

  // config
  getConfig,

  // product
  getAllProducts,
  getAllProductsByCategory,
  getAllProductsByTags,
  getProductByUID,
  getAllProductsSku,

  // getTranslations
  getTranslations,
}
