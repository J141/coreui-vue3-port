import { App as VueApp, DefineComponent as Component, Plugin } from 'vue';
import * as Components from './components';
import * as Directives from './directives';
import NamedDirective from './directives/NamedDirective';

declare type ComponentCollection = {[key: string]: Component};

// no-explicit-any had to be disabled because of Vue's typings for Directive.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type DirectiveCollection = {[key: string]: NamedDirective<Element, any>};

const removeComponents = (object: ComponentCollection, keys: string[]): ComponentCollection => {
  const output: ComponentCollection = {};
  Object.entries(object).forEach(([key, value]) => {
    if (!keys.includes(key) && !keys.includes(value.name)) output[key] = value;
  });
  return output;
};

const removeDirectives = (object: DirectiveCollection, keys: string[]): DirectiveCollection => {
  const output: DirectiveCollection = {};
  Object.entries(object).forEach(([key, value]) => {
    if (!keys.includes(key) && !keys.includes(value.name)) output[key] = value;
  });

  return output;
};

const CoreuiVuePlugin: Plugin = {
  install(app: VueApp, options?: {remove?: string[]}) {
    let pluginComponents: ComponentCollection = Components;
    let pluginDirectives: DirectiveCollection = Directives;

    const toRemove = options !== undefined
      && options.remove !== undefined
      && Array.isArray(options.remove) ? options.remove : null;

    if (toRemove !== null) {
      pluginComponents = removeComponents(pluginComponents, toRemove);
      pluginDirectives = removeDirectives(pluginDirectives, toRemove);
    }

    Object.values(pluginComponents).forEach((pluginComponent) => {
      app.component(pluginComponent.name, pluginComponent);
    });

    Object.values(pluginDirectives).forEach((pluginDirective) => {
      app.directive(pluginDirective.name, pluginDirective);
    });
  },
};

// Export library
export default CoreuiVuePlugin;

// Export components
export * from './components';
export * from './directives';
