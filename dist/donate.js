(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Donate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
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

},{"elm-select":4,"noop6":6,"ul":8}],3:[function(require,module,exports){
// Dependencies
var Typpy = require("typpy");

/**
 * Deffy
 * Computes a final value by providing the input and default values.
 *
 * @name Deffy
 * @function
 * @param {Anything} input The input value.
 * @param {Anything|Function} def The default value or a function getting the
 * input value as first argument.
 * @param {Object|Boolean} options The `empty` value or an object containing
 * the following fields:
 *
 *  - `empty` (Boolean): Handles the input value as empty field (`input || default`). Default is `false`.
 *
 * @return {Anything} The computed value.
 */
function Deffy(input, def, options) {

    // Default is a function
    if (typeof def === "function") {
        return def(input);
    }

    options = Typpy(options) === "boolean" ? {
        empty: options
    } : {
        empty: false
    };

    // Handle empty
    if (options.empty) {
        return input || def;
    }

    // Return input
    if (Typpy(input) === Typpy(def)) {
        return input;
    }

    // Return the default
    return def;
}

module.exports = Deffy;

},{"typpy":7}],4:[function(require,module,exports){
"use strict";

var typpy = require("typpy");

/**
 * elmSelect
 * Select DOM elements and optionally call a function.
 *
 * @name elmSelect
 * @function
 * @param {String|Element|NodeList} elm A stringified query selector, an element or a node list.
 * @param {Function} fn If this function is provided, it will be called with the current element and additional arguments passed in `args`.
 * @param {Array} args An array of arguments used in the `fn` function call (default: `[]`).
 * @param {String|Element} parent The parent element where to search the elements (default: `document`). This makes sense only when a query selector is used.
 * @return {NodeList} A node list containing the selected elements.
 */
function elmSelect(elm, fn, args, parent) {

    // Handle the query selectors
    if (typeof elm === "string") {
        parent = parent || document;
        parent = typeof parent === "string" ? elmSelect(parent, null, null, document)[0] : parent;
        if (!parent) throw new Error("Cannot find the parent element.");
        elm = parent.querySelectorAll(elm);
    }

    // Check if the input is a nodelist
    if (!typpy(elm, NodeList) && !typpy(elm, HTMLCollection)) {
        elm = [elm];
    }

    // Handle the function call
    if (typeof fn === "function") {
        if (!Array.isArray(args)) {
            args = [args];
        }
        for (var i = 0; i < elm.length; ++i) {
            var _args = [elm[i]].concat(args);
            fn.apply(this, _args);
        }
    }

    return elm;
}

module.exports = elmSelect;
},{"typpy":7}],5:[function(require,module,exports){
"use strict";

var noop6 = require("noop6");

(function () {
    var NAME_FIELD = "name";

    if (typeof noop6.name === "string") {
        return;
    }

    Object.defineProperty(Function.prototype, NAME_FIELD, {
        get: function get() {
            var name = this.toString().trim().match(/^function\s*([^\s(]+)/)[1];
            Object.defineProperty(this, NAME_FIELD, { value: name });
            return name;
        }
    });
})();

/**
 * functionName
 * Get the function name.
 *
 * @name functionName
 * @function
 * @param {Function} input The input function.
 * @returns {String} The function name.
 */
module.exports = function functionName(input) {
    return input.name;
};
},{"noop6":6}],6:[function(require,module,exports){
"use strict";

module.exports = function () {};
},{}],7:[function(require,module,exports){
"use strict";

require("function.name");

/**
 * Typpy
 * Gets the type of the input value or compares it
 * with a provided type.
 *
 * Usage:
 *
 * ```js
 * Typpy({}) // => "object"
 * Typpy(42, Number); // => true
 * Typpy.get([], "array"); => true
 * ```
 *
 * @name Typpy
 * @function
 * @param {Anything} input The input value.
 * @param {Constructor|String} target The target type.
 * It could be a string (e.g. `"array"`) or a
 * constructor (e.g. `Array`).
 * @return {String|Boolean} It returns `true` if the
 * input has the provided type `target` (if was provided),
 * `false` if the input type does *not* have the provided type
 * `target` or the stringified type of the input (always lowercase).
 */
function Typpy(input, target) {
    if (arguments.length === 2) {
        return Typpy.is(input, target);
    }
    return Typpy.get(input, true);
}

/**
 * Typpy.is
 * Checks if the input value has a specified type.
 *
 * @name Typpy.is
 * @function
 * @param {Anything} input The input value.
 * @param {Constructor|String} target The target type.
 * It could be a string (e.g. `"array"`) or a
 * constructor (e.g. `Array`).
 * @return {Boolean} `true`, if the input has the same
 * type with the target or `false` otherwise.
 */
Typpy.is = function (input, target) {
    return Typpy.get(input, typeof target === "string") === target;
};

/**
 * Typpy.get
 * Gets the type of the input value. This is used internally.
 *
 * @name Typpy.get
 * @function
 * @param {Anything} input The input value.
 * @param {Boolean} str A flag to indicate if the return value
 * should be a string or not.
 * @return {Constructor|String} The input value constructor
 * (if any) or the stringified type (always lowercase).
 */
Typpy.get = function (input, str) {

    if (typeof input === "string") {
        return str ? "string" : String;
    }

    if (null === input) {
        return str ? "null" : null;
    }

    if (undefined === input) {
        return str ? "undefined" : undefined;
    }

    if (input !== input) {
        return str ? "nan" : NaN;
    }

    return str ? input.constructor.name.toLowerCase() : input.constructor;
};

module.exports = Typpy;
},{"function.name":5}],8:[function(require,module,exports){
(function (process){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var typpy = require("typpy"),
    Deffy = require("deffy");

var Ul = module.exports = {
    /**
     * merge
     * One level merge. Faster than `deepMerge`.
     *
     * @name merge
     * @function
     * @param dst {Object} The destination object.
     * @param src {Object} The source object (usually defaults).
     * @return {Object} The result object.
     */

    merge: function merge(dst, src, p) {
        var res = {};

        src = Deffy(src, {});
        dst = Deffy(dst, {});

        for (var k in src) {
            res[k] = src[k];
        }
        for (var _k in dst) {
            if (undefined === dst[_k]) {
                continue;
            }
            res[_k] = dst[_k];
        }

        return res;
    }

    /**
     * deepMerge
     * Recursively merge the objects from arguments, returning a new object.
     *
     * Usage: `Ul.deepMerge(obj1, obj2, obj3, obj4, ..., objN)`
     *
     * @name deepMerge
     * @function
     * @return {Object} The merged objects.
     */
    ,
    deepMerge: function deepMerge() {

        var dst = {},
            src = null,
            p = null,
            args = [].splice.call(arguments, 0);

        while (args.length > 0) {
            src = args.splice(-1)[0];
            if (!typpy(src, Object)) {
                continue;
            }
            for (p in src) {
                if (!src.hasOwnProperty(p)) {
                    continue;
                }
                if (typpy(src[p], Object)) {
                    dst[p] = this.deepMerge(src[p], dst[p] || {});
                } else {
                    if (src[p] !== undefined) {
                        dst[p] = src[p];
                    }
                }
            }
        }

        return dst;
    }

    /**
     * clone
     * Deep clone of the provided item.
     *
     * @name clone
     * @function
     * @param {Anything} item The item that should be cloned
     * @return {Anything} The cloned object
     */
    ,
    clone: function clone(item) {

        if (!item) {
            return item;
        }

        var types = [Number, String, Boolean],
            result = null;

        for (var _i = 0; _i < types.length; ++_i) {
            var type = types[_i];
            if (item instanceof type) {
                result = type(item);
            }
        }

        if (typeof result == "undefined") {
            if (Array.isArray(item)) {
                result = [];
                for (var i = 0; i < item.length; ++i) {
                    result[i] = this.clone(item[i]);
                }
            } else if ((typeof item === "undefined" ? "undefined" : _typeof(item)) == "object") {
                if (!item.prototype) {
                    if (item instanceof Date) {
                        result = new Date(item);
                    } else {
                        result = {};
                        for (i in item) {
                            result[i] = this.clone(item[i]);
                        }
                    }
                } else {
                    result = item;
                }
            } else {
                result = item;
            }
        }

        return result;
    },
    HOME_DIR: process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]

    /**
     * home
     * Get the home directory path on any platform. The value can be
     * accessed using `Ul.HOME_DIR` too.
     *
     * @name home
     * @function
     * @return {String} The home directory path.
     */
    , home: function home() {
        return this.HOME_DIR;
    }
};
}).call(this,require('_process'))
},{"_process":1,"deffy":3,"typpy":7}]},{},[2])(2)
});