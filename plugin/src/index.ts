import { ConfigPlugin } from 'expo/config-plugins';

import { ConfigProps } from './types';
import { withIosAppcuesPush } from './withIosAppcuesPush';

const withAppcuesPush: ConfigPlugin<ConfigProps> = (config, props = {}) => {
  config = withIosAppcuesPush(config, props);

  return config;
};

export default withAppcuesPush;
