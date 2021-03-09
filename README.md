# Vue 3 port of the CoreUI Vue component library

![License](https://img.shields.io/npm/l/@coreui/vue?style=flat-square)[coreui]

> Vue 3 port of the [@coreui/vue](https://npmjs.org/@coreui/vue) [(github)](https://github.com/coreui/coreui-vue) 3.2.7 package.

> :x: **This library is currently a WIP and not usable on vue 3 yet.**

## Over 90 bootstrap based Vue.js components and directives!

### For library guide please visit our [Documentation site »](https://coreui.io/vue/docs)

Check out demo of components usage: [CoreUI Vue Admin Template »](https://coreui.io/vue/demo)

![Template](https://coreui.io/images/github/vue-free-template-3.gif)

## Installation
> :x: This library is not usable in its current state. Installing it in your own projects is not advised.

Before installation you need to install [node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on your machine.
```shell
npm install coreui-vue3-port
```

### Styling
> :x: This library is not usable in its current state. This documentation section has yet to be updated.

Components are styled using @coreui/coreui CSS library, but you can use them also with bootstrap CSS library. That is possible because @coreui/coreui library is compatible with bootstrap, it just extends its functionalities. The only exception is custom CoreUI components, which don't exist in the Bootstrap ecosystem (template components, callout, switch).

Styles have to be imported separately! Import [CoreUI](https://github.com/coreui/coreui) CSS library (recommended), or [Bootstrap](https://getbootstrap.com/) library

Installation:
```shell
npm install @coreui/coreui
```

Basic usage:
```scss
@import "~@coreui/coreui/scss/coreui";
```

### Registering components
> :construction: This section is from the original @coreui/vue package and has not been updated for Vue 3 yet.

> :x: The library is not usable in its current state. This documentation section has yet to be updated.

```js
// Installing whole package
import CoreuiVue from '@coreui/vue';
Vue.use(CoreuiVue);

// Registering a single component
import { CSwitch, CButton } from '@coreui/vue';

// globally
Vue.component('CButton', CButton)

export default {
  ...
  // locally
  components: {
    CSwitch
  },
  ...
}
```

### Registering directives
> :construction: This section is from the original @coreui/vue package and has not been updated for Vue 3 yet.

> :x: This library is not usable in its current state. This documentation section has yet to be updated.

```js
// Registering single directives
import { CEmitRootEvent, CTooltip } from '@coreui/vue';

// globally
Vue.directive('c-emit-root-event', CEmitRootEvent)

export default {
  ...
  // locally
  directives: {
    'c-tooltip': CTooltip
  },
  ...
}
```

### Optimization
> :construction: This section is from the original @coreui/vue package and has not been updated for Vue 3 yet.

> :x: This library is not usable in its current state. This documentation section has yet to be updated.

Components are imported from CommonJS module by default, if you want to use only specific components you can import them from source to enable treeshaking.

```js
// Import components this way to allow tree shaking
import { CDataTable } from '@coreui/vue/src';
```

### Code autocompletion
> :construction: This section is from the original @coreui/vue package and has not been updated for Vue 3 yet.

> :x: This library is not usable in its current state. This documentation section has yet to be updated.

If you are using [VS Code](https://code.visualstudio.com/) editor with Vetur plugin installed, then the editor would display hints for our library (component names and prop names).

### Changelog
> :construction: This section is from the original @coreui/vue package and has not been updated for Vue 3 yet.

> :x: This library is not usable in its current state. This documentation section has yet to be updated.

See the GitHub [release history](https://github.com/coreui/coreui-vue/releases).



### Credits

Some design ideas and solutions in this library are inspired by [Bootstrap-Vue library](https://bootstrap-vue.js.org/)
