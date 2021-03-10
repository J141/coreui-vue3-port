import { DirectiveBinding, ObjectDirective } from 'vue';
import { Boundary, PopperOptions } from 'popper.js';
import Tooltip, { Options as TooltipOptions } from 'tooltip.js';
import NamedDirective from './NamedDirective';
import './old-popover.css';

export interface CPopoverProps {
  /** Content of the popover header. */
  header?: string;
  /** Content of the popover. */
  content?: string;
  /** Enables passing HTML content to popover. */
  html?: boolean;
  /** Placement of the popover.  */
  placement?: 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  /** Delay before popover appears in miliseconds. */
  delay?: number;
  /** Offset of the popover in pixels. */
  offset?: number | string;
  /** Element which is boundary for popover display.
   * Available values: 'scrollParent', 'window', 'viewport', or id of the boundary element. */
  boundaries?: string;
  /** Append element to body. Useful when there is problem with rendering in some elements. */
  appendToBody?: boolean;
  /** Close popover on click outside, works only if 'click' is the only trigger. */
  closeOnClickOutside?: boolean;
  /** Optional property used to pass aditional popper.js properties. */
  popperOptions?: PopperOptions;
  /** immediately opens the tooltip if true. */
  active?: boolean;
}

interface CPopoverObjectDirective extends ObjectDirective<never, CPopoverProps> {
  getTooltipConfig(binding: DirectiveBinding<CPopoverProps>): TooltipOptions;
  getTemplate(header: string | undefined): string;
  tooltip: Tooltip | null;
}

const directive: NamedDirective<Element, CPopoverProps> & CPopoverObjectDirective = {
  name: 'c-popover',
  tooltip: null,

  mounted(el: Element, binding: DirectiveBinding<CPopoverProps>) {
    const self = binding.dir as CPopoverObjectDirective;
    const tooltip = new Tooltip(el as HTMLElement, self.getTooltipConfig(binding));
    self.tooltip = tooltip;

    if (binding.value.active) tooltip.show();
  },

  unmounted(_: Element, binding: DirectiveBinding<CPopoverProps>) {
    const self = binding.dir as CPopoverObjectDirective;
    let { tooltip } = self;
    if (tooltip) {
      tooltip.dispose();
      tooltip = null;
    }
  },

  getTooltipConfig(binding: DirectiveBinding<CPopoverProps>): TooltipOptions {
    const props = binding.value;
    const title = props.content || 'content';
    const closeOnClickOutside = props.closeOnClickOutside !== false;
    const html = props.html !== false;
    const popperOptions = props.popperOptions || { modifiers: { preventOverflow: { boundariesElement: 'scrollParent' } } };
    const boundaries = props.boundaries !== undefined ? props.boundaries : 'scrollParent';
    const self = binding.dir as CPopoverObjectDirective;
    return {
      title,
      trigger: 'click',
      html,
      placement: props.placement || 'right',
      delay: props.delay || 0,
      offset: props.offset || 0,
      arrowSelector: '.arrow',
      innerSelector: '.popover-old-body',
      template: self.getTemplate(props.header),
      boundariesElement: document.getElementById(boundaries) || boundaries as Boundary,
      container: props.appendToBody ? document.body : undefined,
      closeOnClickOutside,
      popperOptions,
    };
  },

  getTemplate(header) {
    return `<div class="popover-old bs-popover-old-auto fade show" role="tooltip">
              <div class="arrow"></div>
              <h3 class="popover-old-header">${header || 'header'}</h3>
              <div class="popover-old-body"></div>
            </div>`;
  },
};

export default directive;
