"use strict";

const ul = require("ul")
    , $ = require("elm-select")
    , noop = require("noop6")
    ;

/**
 * Donate
 * Create the selection UI where the user can choose a fixed or a custom amount.
 *
 * @name Donate
 * @function
 * @param {Object} options An object containing the following fields:
 *
 *  - `prefix` (String): The snippet that should appear *before* the amount value (default: `""`). Could be useful for currencies (e.g. `"$"`).
 *  - `sufix` (String): The snippet that should appear *after* the amount value (default: `""`).
 *  - `onChange` (Function): The change handler called with: the amount value (Number), the amount element and the event object.
 *  - `format` (Function): The format handler which is used to format the amounts. Should return strings or values that can be stringified.
 *  - `itemAppended` (Function): The after-append handler.
 *  - `container` (String|Element): The donate.js container.
 *  - `amounts` (Array): An array of numbers representing the fixed amounts (e.g. `[5, 10, 50]`).
 *  - `classes`: An object to configure the classes:
 *    - `active` (String): The active class.
 *  - `custom` (Boolean|String): If `true`, then the custom amount input will appear. If it's a string, it will be interpreted as raw HTML (default: `false`).
 *  - `defaultValue` (Boolean|Number): The default value. If `true`, the first amount will be used as default amount.
 *
 * @return {Object} An object containing the following fields:
 *
 *  - `options` (Object): The input options. Note that some new fields are added by the library:
 *    - `_container` (Element): The container element.
 *    - `_amounts` (Array): An array of stringified amounts.
 *  - `amountsMap` (Object): A amount value to element map.
 *  - `active` (Element): The active element.
 *  - `ul` (Element): The `<ul>` list element created by the library.
 *  - `select` (Function): The select function (see below).
 */
function Donate(options) {

    let self = {};

    options = self.options = ul.deepMerge(options, {
        prefix: ""
      , sufix: ""
      , onChange: noop
      , format: String
      , itemAppended: noop
      , container: null
      , amounts: []
      , custom: false
      , classes: {
            active: "active"
        }
    });

    options._container = $(options.container)[0];
    options._amounts = options.amounts.map(options.format);

    if (!options._container) {
        throw new Error("Cannot find any container for donate.js");
    }

    if (options.custom) {
        if (options.custom === true) {
            options.custom = "<input type='number' min='0'>";
        }
        options._amounts.push(
            options.custom
        );
    }

    self.amountsMap = {};
    self.active = null;
    self.ul = document.createElement("ul");

    options._amounts.forEach((c, i) => {
        let li = document.createElement("li")
          , n = options.amounts[i]
          , k = typeof n === "number" ? n : "custom"
          , input = null
          , isCustom = k === "custom"
          ;

        self.amountsMap[k] = li;
        li.addEventListener("click", e => {
            self.select(li, k, e, isCustom);
        });

        li.innerHTML = options.prefix + c.toString() + options.sufix;

        if (isCustom) {
            input = li.querySelector("input");
            input.addEventListener("change", e => {
                self.select(li, Number(e.target.value), e, isCustom);
            });
        }

        self.ul.appendChild(li);
        options.itemAppended(li, c, i);
    });

    self.value = null;

    /**
     * select
     * Selects an amount.
     *
     * @name select
     * @function
     * @param {Element|Number} amount The element to select or a number representing the amount.
     * @param {Number} value The amount value.
     * @param {Event} e The event object.
     * @param {Boolean} isCustom A flag representing if the amount is fixed or custom.
     */
    self.select = (amount, value, e, isCustom) => {
        if (typeof amount === "number") {
            return self.select(self.amountsMap[amount], amount, e, isCustom);
        }

        if (self.active === amount && !isCustom) {
            return;
        }

        if (!amount) {
            if (!options.custom) {
                return console.warn("Invalid amount selected.");
            }
            amount = self.amountsMap.custom;
            amount.querySelector("input").value = value;
        }

        if (self.active) {
            self.active.classList.remove(options.classes.active);
        }

        self.active = amount;
        amount.classList.add(options.classes.active);
        if (typeof value !== "number") {
            return;
        }
        options.onChange(value, amount, e);
    };

    options._container.appendChild(self.ul);
    if (options.defaultValue) {
        if (options.defaultValue === true) {
            options.defaultValue = options._amounts[0];
        }
        self.select(options.defaultValue);
    }

    return self;
}

module.exports = Donate;
