import { Component, ComponentInterface, Element, Listen, Prop, State, h } from '@stencil/core';

import { getIonMode } from '../../global/ionic-global';
import { Color, CssClassMap, RouterDirection, StyleEventDetail } from '../../interface';
import { AnchorInterface, ButtonInterface } from '../../utils/element-interface';
import { createColorClasses, hostContext, openURL } from '../../utils/theme';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot start - Content is placed to the left of the item text in LTR, and to the right in RTL.
 * @slot end - Content is placed to the right of the item text in LTR, and to the left in RTL.
 */
@Component({
  tag: 'ion-item',
  styleUrls: {
    ios: 'item.ios.scss',
    md: 'item.md.scss'
  },
  shadow: true
})
export class Item implements ComponentInterface, AnchorInterface, ButtonInterface {

  private itemStyles = new Map<string, CssClassMap>();

  @Element() el!: HTMLIonItemElement;

  @State() multipleInputs = false;

  @Prop({ context: 'window' }) win!: Window;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
   * For more information on colors, see [theming](/docs/theming/basics).
   */
  @Prop() color?: Color;

  /**
   * If `true`, a button tag will be rendered and the item will be tappable.
   */
  @Prop() button = false;

  /**
   * If `true`, a detail arrow will appear on the item. Defaults to `false` unless the `mode`
   * is `ios` and an `href` or `button` property is present.
   */
  @Prop() detail?: boolean;

  /**
   * The icon to use when `detail` is set to `true`.
   */
  @Prop() detailIcon = 'ios-arrow-forward';

  /**
   * If `true`, the user cannot interact with the item.
   */
  @Prop() disabled = false;

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop() download: string | undefined;

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  @Prop() href: string | undefined;

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel: string | undefined;

  /**
   * How the bottom border should be displayed on the item.
   */
  @Prop() lines?: 'full' | 'inset' | 'none';

  /**
   * When using a router, it specifies the transition direction when navigating to
   * another page using `href`.
   */
  @Prop() routerDirection: RouterDirection = 'forward';

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
   */
  @Prop() target: string | undefined;

  /**
   * The type of the button. Only used when an `onclick` or `button` property is present.
   */
  @Prop() type: 'submit' | 'reset' | 'button' = 'button';

  @Listen('ionStyle')
  itemStyle(ev: CustomEvent<StyleEventDetail>) {
    ev.stopPropagation();

    const tagName = (ev.target as HTMLElement).tagName;
    const updatedStyles = ev.detail;
    const newStyles = {} as any;
    const childStyles = this.itemStyles.get(tagName) || {};

    let hasStyleChange = false;
    Object.keys(updatedStyles).forEach(key => {
      if (updatedStyles[key]) {
        const itemKey = `item-${key}`;
        if (!childStyles[itemKey]) {
          hasStyleChange = true;
        }
        newStyles[itemKey] = true;
      }
    });
    if (!hasStyleChange && Object.keys(newStyles).length !== Object.keys(childStyles).length) {
      hasStyleChange = true;
    }
    if (hasStyleChange) {
      this.itemStyles.set(tagName, newStyles);
      this.el.forceUpdate();
    }
  }

  componentDidLoad() {
    // Check for multiple inputs to change the position to relative
    const inputs = this.el.querySelectorAll('ion-select, ion-datetime');
    this.multipleInputs = inputs.length > 1 ? true : false;
  }

  private isClickable(): boolean {
    return (this.href !== undefined || this.button);
  }

  hostData() {
    const mode = getIonMode(this);
    const childStyles = {};
    this.itemStyles.forEach(value => {
      Object.assign(childStyles, value);
    });

    return {
      'aria-disabled': this.disabled ? 'true' : null,
      class: {
        ...childStyles,
        ...createColorClasses(this.color),
        'item': true,
        [`${mode}`]: true,
        [`item-lines-${this.lines}`]: this.lines !== undefined,
        'item-disabled': this.disabled,
        'in-list': hostContext('ion-list', this.el),
        'item-multiple-inputs': this.multipleInputs,
        'ion-activatable': this.isClickable(),
        'ion-focusable': true,
      }
    };
  }

  render() {
    const mode = getIonMode(this);
    const { detail, win, detailIcon, routerDirection } = this;

    const clickable = this.isClickable();
    const TagType = clickable ? (this.href === undefined ? 'button' : 'a') : 'div' as any;
    const attrs = (TagType === 'button')
      ? { type: this.type }
      : {
        download: this.download,
        href: this.href,
        rel: this.rel,
        target: this.target
      };
    const showDetail = detail !== undefined ? detail : mode === 'ios' && clickable;

    return [
      <TagType
        {...attrs}
        class="item-native"
        disabled={this.disabled}
        onClick={(ev: Event) => openURL(win, this.href, ev, routerDirection)}
      >
        <slot name="start"></slot>
        <div class="item-inner">
          <div class="input-wrapper">
            <slot></slot>
          </div>
          <slot name="end"></slot>
          {showDetail && <ion-icon icon={detailIcon} lazy={false} class="item-detail-icon"></ion-icon>}
          <div class="item-inner-highlight"></div>
        </div>
        {clickable && mode === 'md' && <ion-ripple-effect></ion-ripple-effect>}
      </TagType>,
      <div class="item-highlight"></div>
    ];
  }
}
