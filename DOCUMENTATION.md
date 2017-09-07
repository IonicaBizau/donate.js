## Documentation

You can see below the API reference of this module.

### `Donate(options)`
Create the selection UI where the user can choose a fixed or a custom amount.

#### Params

- **Object** `options`: An object containing the following fields:
 - `prefix` (String): The snippet that should appear *before* the amount value (default: `""`). Could be useful for currencies (e.g. `"$"`).
 - `sufix` (String): The snippet that should appear *after* the amount value (default: `""`).
 - `onChange` (Function): The change handler called with: the amount value (Number), the amount element and the event object.
 - `format` (Function): The format handler which is used to format the amounts. Should return strings or values that can be stringified.
 - `itemAppended` (Function): The after-append handler.
 - `container` (String|Element): The donate.js container.
 - `amounts` (Array): An array of numbers representing the fixed amounts (e.g. `[5, 10, 50]`).
 - `classes`: An object to configure the classes:
   - `active` (String): The active class.
 - `custom` (Boolean|String): If `true`, then the custom amount input will appear. If it's a string, it will be interpreted as raw HTML (default: `false`).
 - `defaultValue` (Boolean|Number): The default value. If `true`, the first amount will be used as default amount.

#### Return
- **Object** An object containing the following fields:
 - `options` (Object): The input options. Note that some new fields are added by the library:
   - `_container` (Element): The container element.
   - `_amounts` (Array): An array of stringified amounts.
 - `amountsMap` (Object): A amount value to element map.
 - `active` (Element): The active element.
 - `ul` (Element): The `<ul>` list element created by the library.
 - `select` (Function): The select function (see below).

### `select(amount, value, e, isCustom)`
Selects an amount.

#### Params

- **Element|Number** `amount`: The element to select or a number representing the amount.
- **Number** `value`: The amount value.
- **Event** `e`: The event object.
- **Boolean** `isCustom`: A flag representing if the amount is fixed or custom.

