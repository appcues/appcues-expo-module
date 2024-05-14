import {
  ConfigPlugin,
  withDangerousMod,
  withXcodeProject,
} from 'expo/config-plugins';
import fs from 'fs';

import {
  APPCUES_NSE_TARGET,
  BUNDLE_SHORT_VERSION_TEMPLATE_REGEX,
  BUNDLE_VERSION_TEMPLATE_REGEX,
  DEFAULT_BUNDLE_SHORT_VERSION,
  DEFAULT_BUNDLE_VERSION,
  PODFILE_SNIPPET,
} from './iosConstants';
import { ConfigProps } from './types';

// Add the Notification Service Extension files to the expected path.
const withAppcuesFiles: ConfigPlugin<ConfigProps> = (config, props) => {
  if (props.enableIosRichPush === false) {
    return config;
  }

  return withDangerousMod(config, [
    'ios',
    (config) => {
      const projectRoot = config.modRequest.projectRoot;

      const destinationPath = `${projectRoot}/ios/${APPCUES_NSE_TARGET.NAME}`;
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
      }

      const sourceFiles = fs.readdirSync(APPCUES_NSE_TARGET.SOURCE_PATH);
      for (const file of sourceFiles) {
        if (file.endsWith('-Info.plist')) {
          // Set Info.plist version numbers to match
          let plistFile = fs.readFileSync(
            `${APPCUES_NSE_TARGET.SOURCE_PATH}/${file}`,
            'utf8'
          );
          plistFile = plistFile.replace(
            BUNDLE_VERSION_TEMPLATE_REGEX,
            config.ios?.buildNumber ?? DEFAULT_BUNDLE_VERSION
          );
          plistFile = plistFile.replace(
            BUNDLE_SHORT_VERSION_TEMPLATE_REGEX,
            config.version ?? DEFAULT_BUNDLE_SHORT_VERSION
          );
          fs.writeFileSync(`${destinationPath}/${file}`, plistFile);
        } else {
          fs.copyFileSync(
            `${APPCUES_NSE_TARGET.SOURCE_PATH}/${file}`,
            `${destinationPath}/${file}`
          );
        }
      }

      return config;
    },
  ]);
};

// Update the podfile with the Notification Service Extension target.
const withAppcuesPodfile: ConfigPlugin<ConfigProps> = (config, props) => {
  if (props.enableIosRichPush === false) {
    return config;
  }

  return withDangerousMod(config, [
    'ios',
    (config) => {
      const projectRoot = config.modRequest.projectRoot;

      // Add Podfile dependency.
      const podfilePath = `${projectRoot}/ios/Podfile`;
      const podfile = fs.readFileSync(podfilePath);
      if (!podfile.includes(APPCUES_NSE_TARGET.POD_NAME)) {
        fs.appendFileSync(podfilePath, PODFILE_SNIPPET);
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
  config = withAppcuesFiles(config, props);
  config = withAppcuesPodfile(config, props);
  return config;
};
