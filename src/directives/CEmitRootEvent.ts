import { DirectiveBinding } from 'vue';
import NamedDirective from './NamedDirective';

const directive: NamedDirective<Element, unknown> = {
  name: 'c-emit-root-event',
  beforeMount(el: Element, binding: DirectiveBinding<unknown>) {
    if (binding.arg === undefined || binding.arg.length === 0) return;

    const customListeners = Object.keys(binding.modifiers);
    const listeners = customListeners.length ? customListeners : ['click'];

    listeners.forEach((listener) => {
      el.addEventListener(listener, () => {
        if (binding.arg === undefined || binding.arg.length === 0) return;

        binding.instance?.$root?.$emit(binding.arg, binding.value);
      });
    });
  },
};

export default directive;
