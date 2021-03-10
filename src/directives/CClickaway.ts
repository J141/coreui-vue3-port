import { DirectiveBinding } from 'vue';
import NamedDirective from './NamedDirective';

const HANDLER = 'c_clickaway_handler';

interface ElementExtension {
  'c_clickaway_handler'?: (e: Event) => void
}

function setListeners(el : Element, binding: DirectiveBinding<(e: Event) => void>): void {
  const element = (el as Element & ElementExtension);
  const callback = binding.value;

  if (typeof callback !== 'function') return;

  element[HANDLER] = (e) => el.contains(e.target as HTMLElement)
    || callback.call(binding.instance, e);

  const handler = element[HANDLER];
  if (handler !== undefined) document.documentElement.addEventListener(binding.arg || 'click', handler);
}

function unsetListeners(el: Element, binding: DirectiveBinding<(e: Event) => void>): void {
  const element = el as Element & ElementExtension;

  const handler = element[HANDLER];
  if (handler !== undefined) document.documentElement.removeEventListener(binding.arg || 'click', handler);

  delete element[HANDLER];
}

const directive: NamedDirective<Element, (e: Event) => void> = {
  name: 'c-clickaway',
  beforeMount: (setListeners),

  updated: (el: Element, binding: DirectiveBinding<(e: Event) => void>) => {
    if (binding.value !== binding.oldValue) {
      unsetListeners(el, binding);
      setListeners(el, binding);
    }
  },
  unmounted: unsetListeners,
};

export default directive;
