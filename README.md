# Appcues Expo Module

> **This is a pre-release alpha package in preparation for v4 of the Appcues SDK. It is not necessary for integrating v3 of the Appcues SDK. Please refer to the [Appcues React Native Module](https://github.com/appcues/appcues-react-native-module).**

Appcues Expo Module allows you to integrate Appcues push notifications into your Expo app alongside the [Appcues React Native Module](https://github.com/appcues/appcues-react-native-module).

- [Appcues Expo Module](#appcues-expo-module)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Usage](#usage)
  - [🎬 Examples](#-examples)
  - [👷 Contributing](#-contributing)
  - [📄 License](#-license)

## 🚀 Getting Started

### Prerequisites

1. Ensure the [Appcues React Native Module](https://github.com/appcues/appcues-react-native-module) is installed in your app and the SDK is initialized:
    ```js
    import * as Appcues from '@appcues/react-native'

    await Appcues.setup('APPCUES_ACCOUNT_ID', 'APPCUES_APPLICATION_ID')
    ```

2. It is recommended to have [configured your Android and iOS push settings in Appcues Studio](https://docs.appcues.com/en_US/push-notifications/push-notification-settings) before configuring push notifications in your app to allow you quickly test your configuration end to end.

3. Copy your Firebase configuration file into your project and set the path to the file in your `app.json` file, in the `android.googleServicesFile` ([doc](https://docs.expo.dev/versions/latest/config/app/#googleservicesfile-1)) property:
    ```json
    {
      "expo": {
        ...
        "android": {
          "googleServicesFile": "./google-services.json",
        }
      }
    }
    ```
    Note that Appcues iOS push notifications do not use Firebase.

### Usage

1. Install the Appcues expo config plugin
   ```sh
   npm install @appcues/expo-config
   ```
2. App `@appcues/expo-config` to the plugin list in your `app.json` file:
   ```json
   {
     "expo": {
       ...
       "plugins": [
         "@appcues/expo-config"
         ...
       ]
     }
   }
   ```
3. Test locally with a new development or EAS build:
     ```sh
     npx expo prebuild
     ```

## 🎬 Examples

The `example` directory in this repository contains full example Expo app to providing references for correct installation of the Appcues Expo Module.

## 👷 Contributing

See the [contributing guide](https://github.com/appcues/appcues-expo-module/blob/main/CONTRIBUTING.md) to learn how to get set up for development and how to contribute to the project.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](https://github.com/appcues/appcues-expo-module/blob/main/LICENSE) for more information.
