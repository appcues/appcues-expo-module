export const APPCUES_NSE_TARGET = {
  NAME: 'AppcuesNotificationServiceExtension',
  // https://github.com/apache/cordova-node-xcode/blob/5158ec512d7ebd57c6fd62dbbcc4ce18c79a8ef6/lib/pbxProject.js#L1742
  TYPE: 'app_extension',
  SOURCE_PATH: __dirname + '/../ios/NotificationServiceExtension',
  POD_NAME: 'AppcuesNotificationService',
};

export const PODFILE_SNIPPET = `
target '${APPCUES_NSE_TARGET.NAME}' do
  pod '${APPCUES_NSE_TARGET.POD_NAME}', '4.0.0-alpha.1'
end
`;

export const DEFAULT_BUNDLE_VERSION = '1';
export const DEFAULT_BUNDLE_SHORT_VERSION = '1.0';

export const BUNDLE_SHORT_VERSION_TEMPLATE_REGEX = /{{BUNDLE_SHORT_VERSION}}/gm;
export const BUNDLE_VERSION_TEMPLATE_REGEX = /{{BUNDLE_VERSION}}/gm;
