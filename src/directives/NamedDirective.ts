import { ObjectDirective } from 'vue';

export default interface NamedDirective<T, V> extends ObjectDirective<T, V> {
  name: string;
}