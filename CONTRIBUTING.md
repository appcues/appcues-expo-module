# Contributing

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of the community. Here are a few guidelines that will help you along the way.

## Sending a pull request

Pull requests are always welcome, but before working on a large change or something that changes the API, it is best to open an issue first to discuss it with the maintainers.

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, don't bundle more than one feature or bug fix per pull request. It's always best to create two smaller PRs than one big one.

When adding new features or modifying existing, please attempt to include tests to confirm the new behaviour.

### Increasing the chance of a PR being accepted

We will only accept a pull request for which all tests pass. Make sure the following is true:

- The branch is targeted at `main`.
- The branch is not behind its target.
- If a feature is being added, test cases for the functionality of the feature.
- If a bug is being fixed, test cases that fail without the fix are included.
- Documentation is up to date.
- The code is linted.
- The commit messages are formatted.
- The pull request template is complete.


## Getting started

1. Clone `appcues-expo-module` locally:

    ```bash
    git clone https://github.com/appcues/appcues-expo-module.git
    ```

   If you cloned a while ago, get the latest changes from upstream:

    ```bash
    git checkout main
    git pull upstream main
    ```

2. Never work directly on `main`. Create a new feature/fix branch:

    ```bash
    git checkout -b <branch-name>
    ```

4. Commit your changes in logical chunks following the commit message guidelines.

5. Always update documentation and unit tests.

6. Make your changes, lint, then push your local branch to the remote:

    ```bash
    git push -u origin <branch-name>
    ```

7. Open a pull request to get your `<branch-name>` merged into `main`

### Branch structure

Never work directly on `main`. Create a new feature/fix branch, following the convention:

`feature/my-branch`

`fix/my-branch`

## Architectural overview

This expo module contains several parts:

1. A [config plugin](/plugin/) that modifies the native project files to support Appcues push notifications.
2. An [iOS AppDelegate subscriber](/ios/) to handle iOS push notifications at runtime.
3. An [Android lifecycle listener](/android/) to handle Android push notifications. This doesn't actually implement any Kotlin code, but the AndroidManifest.xml and build.gradle provide necessary configuration.

## Development workflow

To get started with the project, run `npm install` in the root directory to install the required dependencies for each package:

```sh
npm install
```

While developing, you can run the [example app](/example/) to test your changes.

Ensure the plugin build is up to date:

```sh
npm run build plugin
```

To generate the native projects for the example app:

```sh
cd example
npx expo prebuild --clean
```

To run the example app on Android:

```sh
npx expo run:android
```

To run the example app on iOS:

```sh
npx expo run:ios
```

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
npm run lint plugin
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
npm run test plugin
```

### Commit messages

Commit messages should follow the pattern `:emoji: Imperative commit message`. See [How to Write an Imperative Message](https://chris.beams.io/posts/git-commit/#imperative) for a great explanation.

[Gitmoji](https://gitmoji.dev) is an emoji guide for your commit messages which improves searchability and scannability of the commit history. In particular Appcues utilizes the following. When considering which Gitmoji is correct, use this list from top to bottom (e.g. moving files in an example app should use 🎬, not 🚚, because 🎬 appears closer to the top of the list).

| Emoji | Shortcut | Meaning |
| ------ | ------ | ------ |
| 🔧 | `:wrench:` | Changing configuration/pipeline files |
| 🗃 | `:card_file_box:` | Updating package.json |
| 🎬 | `:clapper:` | Updating example app |
| 💥 | `:boom:` | Introducing breaking changes |
| ⬆️ | `:arrow_up:` | Upgrading dependencies |
| 📸 | `:camera_with_flash:` | Updating snapshots |
| ✅ | `:white_check_mark:` | Updating tests |
| 💡 | `:bulb:` | Documenting source code |
| 📝 | `:pencil:` | Writing docs |
| 🚨 | `:rotating_light:` | Fixing linter warnings |
| 🔊 | `:loud_sound:` | Updating logging |
| 💄 | `:lipstick:` | Updating styles |
| ♿ | `:wheelchair:` | Improving accessibility |
| 🚚 | `:truck:` | Moving or renaming files |
| ♻️ | `:recycle:` | Refactoring code |
| 🏗 | `:building_construction:` | Making architectural changes |
| 🎨 | `:art:` | Improving structure/format of the code |
| 👌 | `:ok_hand:` | Updating code due to code review changes |
| 🐛 | `:bug:` | Fixing a bug |
| ✨ | `:sparkles:` | Introducing a new feature |

## The review process

- Maintainers, and potentially other committers, may comment on the changes and suggest modifications. Changes can be added by simply pushing more commits to the same branch.
- Lively, polite, rapid technical debate is encouraged from everyone in the community. The outcome may be a rejection of the entire change.
- Keep in mind that changes to more critical parts of `appcues-expo-module` will be subjected to more review, and may require more testing and proof of its correctness than other changes.
- The person who starts the discussion should be the person who resolves the discussion.
- In order to pass review your PR will need approval from at least one maintainer.

## Releasing

You must be a repository admin and member of the Appcues npm organization. From a clean copy of the `main` branch:

```sh
npm run release 1.0.0
```
