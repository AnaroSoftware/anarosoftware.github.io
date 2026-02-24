// This is just an example,
// so you can safely delete all default props below

import { prefixObjectKeys } from 'src/utils/typeFunctions';
import { indexPage } from './indexPage';
import { routesNames } from './routesNames';

export default {
  ...routesNames,
  ...prefixObjectKeys('indexPage', indexPage),
};
