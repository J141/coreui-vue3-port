import { DirectiveBinding, ObjectDirective, VNode } from 'vue'
import Tooltip, { Options as TooltipOptions } from 'tooltip.js'
import { Boundary } from 'popper.js';
import NamedDirective from './NamedDirective'
import './old-tooltip.css'

export interface CTooltipProps {
  /** Content of the popover */
  content?: string;
  /** Enables passing HTML content to popover. */
  html?: boolean;
  /** Placement of the popover. */
  placement?: 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  /** Delay before popover appears in miliseconds */
  delay?: number;
  /** Offset of the popover in pixels. */
  offset?: number | string;
  /** Element which is boundary for popover display . Available values: 'scrollParent', 'window', 'viewport', or id of the boundary element. */
  boundaries?: string;
  /** Append element to body. Useful when there is problem with rendering in some elements. */
  appendToBody?: boolean;
  /** Close tooltip on click outside, works only if 'click' is the only trigger. */
  closeOnClickOutside?: boolean;
  /** Optional property used to pass aditional popper.js properties. */
  popperOptions?: object
  /** immediately opens the tooltip if true. */
  active?: boolean;
}

interface CTooltipObjectDirective extends ObjectDirective<any, CTooltipProps> {
  getTooltipConfig(binding: DirectiveBinding<CTooltipProps>): TooltipOptions;
  getTemplate(): string;
  _tooltip: Tooltip | null;
}

interface ElementExtension {
  _c_tooltip: Tooltip | null;
}

const directive: NamedDirective<Element, CTooltipProps> & CTooltipObjectDirective = {
  name: 'c-tooltip',
  _tooltip: null,

  mounted (el: Element, binding: DirectiveBinding<CTooltipProps>) {
    const self = binding.dir as CTooltipObjectDirective;
    const element = el as Element & ElementExtension;

    self._tooltip = new Tooltip(el as HTMLElement, self.getTooltipConfig(binding))
    element._c_tooltip = self._tooltip

    if (binding.value.active) {
      self._tooltip.show()
    }
  },

  unmounted (el: Element, binding: DirectiveBinding<CTooltipProps>) {
    const self = binding.dir as CTooltipObjectDirective;
    const element = el as Element & ElementExtension;

    let tooltip = self._tooltip

    if (tooltip) {
      tooltip.dispose()
      tooltip = null
      element._c_tooltip = null
    }
  },

  getTooltipConfig (binding: DirectiveBinding<CTooltipProps>): TooltipOptions {
    const props = binding.value
    const title = props.content || 'content'
    const html = props.html === false ? false : true
    const closeOnClickOutside = props.closeOnClickOutside === false ? false : true
    const popperOptions = props.popperOptions || { modifiers: { preventOverflow: { boundariesElement: 'offsetParent' }}}
    const boundaries = props.boundaries || 'scrollParent'
    const self = binding.dir as CTooltipObjectDirective;
    return {
      title,
      trigger: 'hover',
      html,
      placement: props.placement || 'top',
      delay: props.delay || 0,
      offset: props.offset || 0,
      arrowSelector: '.arrow',
      innerSelector: '.tooltip-old-inner',
      template: self.getTemplate(),
      boundariesElement: document.getElementById(boundaries) || boundaries as Boundary,
      container: props.appendToBody ? document.body : undefined,
      closeOnClickOutside,
      popperOptions
    }
  },
  getTemplate () {
    return `<div class="tooltip-old bs-tooltip-old-auto fade show" role="tooltip">
              <div class="arrow"></div>
              <div class="tooltip-old-inner"></div>
            </div>`
  },

  updated(el: Element, binding: DirectiveBinding<CTooltipProps>, vnode: VNode<any, Element>) {
    const element = el as Element & ElementExtension;

    if ((binding.value.content !== binding.oldValue?.content) && el === vnode.el) {
        binding.instance?.$nextTick(() => {
        const title = binding.value.content
          element._c_tooltip?.updateTitleContent(title || '')
      })
    }
  }
}

export default directive;