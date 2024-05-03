import { ConfigPlugin } from 'expo/config-plugins';

import { ConfigProps } from './types';
import { withIosAppcuesRichPush } from './withIosAppcuesRichPush';

const withAppcuesPush: ConfigPlugin<ConfigProps> = (config, props) => {
  config = withIosAppcuesRichPush(config, props);

  return config;
};

export default withAppcuesPush;
