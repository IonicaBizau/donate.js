<!-- Please do not edit this file. Edit the `blah` field in the `package.json` instead. If in doubt, open an issue. -->


















# donate.js

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Ask me anything](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/donate.js.svg)](https://www.npmjs.com/package/donate.js) [![Downloads](https://img.shields.io/npm/dt/donate.js.svg)](https://www.npmjs.com/package/donate.js) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

<a href="https://www.buymeacoffee.com/H96WwChMy" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>







> A JavaScript library for creating a friendly way to send money donations.











[![donate.js](http://i.imgur.com/zd8iezr.jpg)](http://ionicabizau.github.io/donate.js/example)







## :cloud: Installation


Check out the [`dist`](/dist) directory to download the needed files and include them on your page.

If you're using this module in a CommonJS environment, you can install it using `npm` or `yarn` and `require` it:

```sh
# Using npm
npm install --save donate.js

# Using yarn
yarn add donate.js
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











## :question: Get Help

There are few ways to get help:



 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:





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


## :sparkling_heart: Support my projects
I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:


 - Starring and sharing the projects you like :rocket:
 - [![Buy me a book][badge_amazon]][amazon]—I love books! I will remember you after years if you buy me one. :grin: :book:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)


Thanks! :heart:
























## :scroll: License

[MIT][license] © [Ionică Bizău][website]






[license]: /LICENSE
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
[badge_patreon]: https://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: https://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: https://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: https://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
