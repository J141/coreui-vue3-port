import { DirectiveBinding } from 'vue'
import NamedDirective from './NamedDirective';

const HANDLER = 'c_clickaway_handler'

interface ElementExtension {
  'c_clickaway_handler'?: (e: Event) => void;
}

function setListeners (el : Element, binding: DirectiveBinding<Function>) {
  const element = el as Element & ElementExtension;
  const callback = binding.value

  if (typeof callback !== 'function') {
    return
  }

  element[HANDLER] = (e) => el.contains(e.target as HTMLElement) || callback.call(binding.instance, e)
  document.documentElement.addEventListener(binding.arg || 'click', element[HANDLER]!)
}

function unsetListeners (el: Element, binding: DirectiveBinding<Function>) {
  const element = el as Element & ElementExtension;

  if(element[HANDLER] !== undefined)
    document.documentElement.removeEventListener(binding.arg || 'click', element[HANDLER]!)
  
  delete element[HANDLER]
}

const directive: NamedDirective<Element, Function> = {
  name: 'c-clickaway',
  beforeMount: (setListeners),
  updated: (el: Element, binding: DirectiveBinding<Function>) => {
    if (binding.value !== binding.oldValue) {
      unsetListeners(el, binding)
      setListeners(el, binding)
    }
  },
  unmounted: unsetListeners
}

export default directive;