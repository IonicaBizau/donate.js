
# donate.js

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][paypal-donations] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/donate.js.svg)](https://www.npmjs.com/package/donate.js) [![Downloads](https://img.shields.io/npm/dt/donate.js.svg)](https://www.npmjs.com/package/donate.js) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> A JavaScript library for creating a friendly way to send money donations.

[![donate.js](http://i.imgur.com/zd8iezr.jpg)](http://ionicabizau.github.io/donate.js/example)

## :cloud: Installation


Check out the [`dist`](/dist) directory to download the needed files and include them on your page.

If you're using this module in a CommonJS environment, you can install it from `npm` and `require` it:

```sh
$ npm i --save donate.js
```


## :clipboard: Example



```js
Donate({
    container: ".donate"
  , prefix: "$"
  , classes: {
        active: "active"
    }
  , amounts: [
        50
      , 100
      , 200
      , 300
      , 400
      , 500
      , 700
    ]
  , custom: true
  , format: function (val) {
      return val > 1000
           ? (val = val.toString()).substring(0, 1) + "," + val.substring(1)
           : val
           ;
    }
  , onChange: function (val, li, e) {
        document.querySelector("[name=amount]").value = val;
    }
  , defaultValue: 20
});
```

## :memo: Documentation


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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
