"use strict";

var _jsdom = require("jsdom");

global.window = new _jsdom.JSDOM("", { url: "http://localhost" }).window; /*
                                                                           * Guangyao Li
                                                                           * 2017/11/22
                                                                           * lgy87@foxmail.com
                                                                           */

//# sourceMappingURL=shim.js.map