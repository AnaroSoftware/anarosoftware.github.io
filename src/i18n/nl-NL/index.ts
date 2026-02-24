import { prefixObjectKeys } from 'src/utils/typeFunctions';
import { indexPage } from './indexPage';
import { routesNames } from './routesNames';

export default {
  ...routesNames,
  ...prefixObjectKeys('indexPage', indexPage),
};
