import { App as VueApp, DefineComponent as Component, Directive } from 'vue';
import * as Components from './components'
import * as Directives from './directives'
import NamedDirective from './directives/NamedDirective';

const removeComponents = (object: {[name: string]: Component}, keys: string[]): {[key: string]: Component} => 
  {
    return Object.entries(object).reduce((obj: {[key: string]: Component}, [key, value]) => {
      if (!keys.includes(key) && !keys.includes(value.name)) {
        obj[key] = value
      }
      return obj
  }, {})
}

//todo: type directives once migrated to vue 3
const removeDirectives = (object: {[name: string]: NamedDirective<Element, any>}, keys: string[]): {[key: string]: NamedDirective<Element, any>} => 
  {
    return Object.entries(object).reduce((obj: {[key: string]: NamedDirective<Element, any>}, [key, value]) => {
      if (!keys.includes(key) && !keys.includes(value.name)) {
        obj[key] = value
      }
      return obj
  }, {})
}

interface CoreuiVue {
  install(app: VueApp, options?: {remove: string[]}): void;
}

const CoreuiVue: CoreuiVue = {
  install (app: VueApp, options?: {remove?: string[]}) {
    let pluginComponents: {[key: string]: Component} = Components
    let pluginDirectives: {[key: string]: NamedDirective<Element, any>} = Directives

    const toRemove = options !== undefined && options.remove !== undefined && Array.isArray(options.remove) ? options.remove : null;

    if (toRemove !== null) {
      pluginComponents = removeComponents(Components, toRemove)
      pluginDirectives = removeDirectives(Directives, toRemove)        
    }

    for (let plugin in pluginComponents) {
      app.component(plugin, pluginComponents[plugin])
    }
    for (let directive in pluginDirectives) {
      app.directive(directive, pluginDirectives[directive])
    }
  }
}

// Export library
export default CoreuiVue

//Export components
export * from  './components'
export * from  './directives'
