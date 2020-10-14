<p align="center">

  <a href="https://wix.github.com/wix-style-react">
      <img src="https://raw.githubusercontent.com/wix/wix-style-react/master/.storybook/logo.svg?sanitize=true" alt="Wix Style React" width="400">
  </a>
  </br>
<span>
A collection of React components that conform to Wix Style.
</span>

</p>

<div align="center">

![](https://flat.badgen.net/badge/React/16.13.1/blue)
[![](https://badgen.net/npm/v/wix-style-react/latest)](https://www.npmjs.com/package/wix-style-react)
[![Dependencies](https://img.shields.io/david/wix/wix-style-react.svg?style=flat-square)](https://david-dm.org/wix/wix-style-react)
[![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design.svg?style=flat-square)](https://david-dm.org/wix/wix-style-react?type=dev)

</div>

<div align="center">
 <a href="https://wix-style-react.com">https://wix-style-react.com/</a>
</div>

## 📦 Install

```bash
npm install wix-style-react
```

```bash
yarn add wix-style-react
```

## 🔨 Setup

wix-style-react is built with [Stylable](https://stylable.io/), therefore we recommend you build your project using a **Stylable compatible** template in order to save some configurations.
Take a look at our usage guide [Create Stylable App](https://github.com/wix/wix-style-react/blob/master/docs/usage/usage-with-create-stylable-app.md) to create a new Stylable project from a boilerplate.

#### Requirements
wix-style-react requires react version `16.13.1` and up.

#### How to load wix-style-react compatible fonts:

Load Wix fonts from CDN:<br/>
- For Madefor font please visit [wix-fonts](https://wix-fonts.now.sh/).
- For Helvetica Neue:
  ```html
  <link
    rel="stylesheet"
    href="//static.parastorage.com/services/third-party/fonts/Helvetica/fontFace.css"
  />
  ```
Enable font smoothing with browser specific css properties:
  ```css
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ```

## Upgrade from older versions

**Read and follow our migration guides:**

- From 7.x to 8.x/9.x read [V8/V9 migration guide](https://github.com/wix/wix-style-react/blob/master/MIGRATION.md)
- From 6.x to 7.x read [V7 migration guide](https://github.com/wix/wix-style-react/blob/version_7.x/docs/migration/v6-v7.md)
- From 5.x to 6.x read [V6 migration guide](https://github.com/wix/wix-style-react/blob/version_7.x/docs/migration/v5-v6.md)
- From 4.x to 5.x read [V5 migration guide](https://github.com/wix/wix-style-react/blob/version_7.x/docs/migration/v4-v5.md)

**Older version Storybook:**

- [V8 Storybook](https://wix-style-react-v8.now.sh)
- [V7 Storybook](https://wix-style-react-v7.now.sh)
- [V6 Storybook](https://wix-wix-style-react-v6.surge.sh/)

## 🚀 Usage

```jsx
import { Button } from 'wix-style-react';

const App = () => (
  <Button>
    Click me!
  </Button>
);
```

## 💫 Testkits

All our components are provided with testkits that help our users test them.

A component testkit provides an interface to the component, enabling automated tests to access component functions without needing to know precise details of the technology being used.

```jsx
//  Here is an example

// 1. import
import { InputTestkit } from 'wix-style-react/dist/testkit';

// 2. initialize
const inputDriver = InputTestkit({
  wrapper: document.body,
  dataHook: 'name-input',
});

// 3. interact
it('test', async () => {
    await inputDriver.enterText('hello world');
    expect(await inputDriver.getText()).toBe('hello world');
});
```
All methods are documented in our storybook components stories and some can be viewed through typescript interface.

Our testkits currently support four major testing frameworks: `react-jsdom`, `protractor`, `puppeteer` and `selenium`. Read our [testing guidelines](https://github.com/wix/wix-style-react/blob/master/docs/usage/testing.md)

## ⌨️ Typescript

The library is javascript based but types are supported with `d.ts` files.
You should get the types automatically when installing `wix-style-react`.
For any issues, check out our types [FAQ](https://github.com/wix/wix-style-react/blob/master/docs/FAQ/TYPES.MD)

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

We welcome contributions to Wix-Style-React!

Read our [contributing guide](https://github.com/wix/wix-style-react/blob/master/CONTRIBUTING.md) and help us build or improve our components.

## 📝 License

This project is offered under [MIT License](https://github.com/wix/wix-style-react/blob/master/LICENSE).
