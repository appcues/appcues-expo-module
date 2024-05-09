import {
  ConfigPlugin,
  withDangerousMod,
  withXcodeProject,
} from 'expo/config-plugins';
import fs from 'fs';

import { ConfigProps } from './types';

const APPCUES_NSE_TARGET = {
  NAME: 'AppcuesNotificationServiceExtension',
  // https://github.com/apache/cordova-node-xcode/blob/5158ec512d7ebd57c6fd62dbbcc4ce18c79a8ef6/lib/pbxProject.js#L1742
  TYPE: 'app_extension',
  SOURCE_PATH: __dirname + '/../ios/NotificationServiceExtension',
  POD_NAME: 'AppcuesNotificationService',
};

// Update the podfile with the Notification Service Extension target.
// Add the Notification Service Extension files to the expected path.
const withAppcuesDangerousMod: ConfigPlugin<ConfigProps> = (config, props) => {
  if (props.enableIosRichPush === false) {
    return config;
  }

  return withDangerousMod(config, [
    'ios',
    (config) => {
      const projectRoot = config.modRequest.projectRoot;

      // Copy extension files to project path.
      const destinationPath = `${projectRoot}/ios/${APPCUES_NSE_TARGET.NAME}`;
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
      }

      const sourceFiles = fs.readdirSync(APPCUES_NSE_TARGET.SOURCE_PATH);
      for (const file of sourceFiles) {
        fs.copyFileSync(
          `${APPCUES_NSE_TARGET.SOURCE_PATH}/${file}`,
          `${destinationPath}/${file}`
        );
      }

      // Add Podfile dependency.
      const podfilePath = `${projectRoot}/ios/Podfile`;
      const podfile = fs.readFileSync(podfilePath);
      if (!podfile.includes(APPCUES_NSE_TARGET.POD_NAME)) {
        const notificationServiceTarget = `
          target '${APPCUES_NSE_TARGET.NAME}' do
            pod '${APPCUES_NSE_TARGET.POD_NAME}', '4.0.0-alpha.1'
          end
        `;
        fs.appendFileSync(podfilePath, notificationServiceTarget);
      }

      return config;
    },
  ]);
};

// Add the Notification Service Extension to the Xcode project.
const withAppcuesXcodeProject: ConfigPlugin<ConfigProps> = (config, props) => {
  return withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;

    if (
      props.enableIosRichPush === false ||
      xcodeProject.pbxGroupByName(APPCUES_NSE_TARGET.NAME)
    ) {
      return config;
    }

    // https://github.com/apache/cordova-node-xcode/issues/121
    // addTargetDependency misses some dependency links if
    // PBXTargetDependency or PBXContainerItemProxy are not present.
    const projObjects = xcodeProject.hash.project.objects;
    projObjects['PBXTargetDependency'] =
      projObjects['PBXTargetDependency'] || {};
    projObjects['PBXContainerItemProxy'] =
      projObjects['PBXContainerItemProxy'] || {};

    // Create new PBXGroup for the extension.
    const sourceFiles = fs.readdirSync(APPCUES_NSE_TARGET.SOURCE_PATH);
    const appcuesNotificationServiceGroup = xcodeProject.addPbxGroup(
      sourceFiles,
      APPCUES_NSE_TARGET.NAME,
      APPCUES_NSE_TARGET.NAME
    );

    // Add the group to the main group. This makes the files appear in the file explorer in Xcode.
    const mainGroupUUID =
      xcodeProject.pbxProjectSection()[xcodeProject.getFirstProject().uuid]
        .mainGroup;
    xcodeProject.addToPbxGroup(
      appcuesNotificationServiceGroup.uuid,
      mainGroupUUID
    );

    // Add a target for the extension.
    const targetBundleId = `${config.ios?.bundleIdentifier}.${APPCUES_NSE_TARGET.NAME}`;
    const target = xcodeProject.addTarget(
      APPCUES_NSE_TARGET.NAME,
      APPCUES_NSE_TARGET.TYPE,
      APPCUES_NSE_TARGET.NAME,
      targetBundleId
    );

    // Add build phases to the new target.
    xcodeProject.addBuildPhase(
      ['NotificationService.swift'],
      'PBXSourcesBuildPhase',
      'Sources',
      target.uuid
    );

    // Fix "Value for SWIFT_VERSION cannot be empty."
    const swiftVersion = xcodeProject.getBuildProperty('SWIFT_VERSION');
    xcodeProject.addBuildProperty('SWIFT_VERSION', swiftVersion);

    return config;
  });
};

export const withIosAppcuesRichPush: ConfigPlugin<ConfigProps> = (
  config,
  props
) => {
  config = withAppcuesXcodeProject(config, props);
  config = withAppcuesDangerousMod(config, props);
  return config;
};
