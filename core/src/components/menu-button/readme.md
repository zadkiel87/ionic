# ion-menu-button

Menu Button is component that automatically creates the icon and functionality to open a menu on a page.


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                                                                                                                                                                                                                            | Type                              | Default     |
| ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `autoHide` | `auto-hide` | Automatically hides the menu button when the corresponding menu is not active                                                                                                                                                                                          | `boolean`                         | `true`      |
| `color`    | `color`     | The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics). | `string \| undefined`             | `undefined` |
| `disabled` | `disabled`  | If `true`, the user cannot interact with the menu button.                                                                                                                                                                                                              | `boolean`                         | `false`     |
| `menu`     | `menu`      | Optional property that maps to a Menu's `menuId` prop. Can also be `start` or `end` for the menu side. This is used to find the correct menu to toggle                                                                                                                 | `string \| undefined`             | `undefined` |
| `type`     | `type`      | The type of the button.                                                                                                                                                                                                                                                | `"button" \| "reset" \| "submit"` | `'button'`  |


## CSS Custom Properties

| Name                   | Description                                |
| ---------------------- | ------------------------------------------ |
| `--background`         | Background of the menu button              |
| `--background-focused` | Background of the menu button when focused |
| `--background-hover`   | Background of the menu button on hover     |
| `--border-radius`      | Border radius of the menu button           |
| `--color`              | Color of the menu button                   |
| `--color-focused`      | Color of the menu button when focused      |
| `--color-hover`        | Color of the menu button on hover          |
| `--padding-bottom`     | Padding bottom of the button               |
| `--padding-end`        | Padding end of the button                  |
| `--padding-start`      | Padding start of the button                |
| `--padding-top`        | Padding top of the button                  |


## Dependencies

### Depends on

- [ion-menu-toggle](../menu-toggle)
- ion-icon
- [ion-ripple-effect](../ripple-effect)

### Graph
```mermaid
graph TD;
  ion-menu-button --> ion-menu-toggle
  ion-menu-button --> ion-icon
  ion-menu-button --> ion-ripple-effect
  style ion-menu-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
