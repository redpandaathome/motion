// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dist/components/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = void 0;

var BaseComponent =
/** @class */
function () {
  function BaseComponent(htmlString) {
    var template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild;
  }

  BaseComponent.prototype.attachTo = function (parent, position) {
    if (position === void 0) {
      position = 'afterbegin';
    }

    parent.insertAdjacentElement(position, this.element);
  };

  BaseComponent.prototype.removeFrom = function (parent) {
    if (this.element.parentElement !== parent) {
      throw new Error('Parent mismatching!');
    }

    parent.removeChild(this.element);
  };

  return BaseComponent;
}();

exports.BaseComponent = BaseComponent;
},{}],"dist/components/page/item/image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageComponent = void 0;

var _component = require("../../component.js");

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var ImageComponent =
/** @class */
function (_super) {
  __extends(ImageComponent, _super); // private readonly element:HTMLElement; 


  function ImageComponent(title, url) {
    var _this = _super.call(this, "<section class=\"image\">\n               <div class=\"image__holder\">\n                  <img src=\"\" alt=\"\" class=\"image__thumbnail\">\n               </div>\n               <h2 class=\"page-item__title image__title\"></h2>\n            </section>") || this;

    var imageElement = _this.element.querySelector('.image__thumbnail');

    imageElement.src = url;
    imageElement.alt = title;

    var titleElement = _this.element.querySelector('.image__title');

    titleElement.textContent = title;
    return _this;
  }

  return ImageComponent;
}(_component.BaseComponent);

exports.ImageComponent = ImageComponent;
},{"../../component.js":"dist/components/component.js"}],"dist/components/page/page.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageItemComponent = exports.PageComponent = void 0;

var _component = require("../component.js");

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var PageComponent =
/** @class */
function (_super) {
  __extends(PageComponent, _super);

  function PageComponent(pageItemConstructor) {
    var _this = _super.call(this, "<ul class=\"page\"></ul>") || this;

    _this.pageItemConstructor = pageItemConstructor;

    _this.element.addEventListener('dragover', function (event) {
      _this.onDragOver(event);
    });

    _this.element.addEventListener('drop', function (event) {
      _this.onDrop(event);
    });

    return _this;
  }

  PageComponent.prototype.onDragOver = function (event) {
    event.preventDefault();
    console.log('dragover...');
  };

  PageComponent.prototype.onDrop = function (event) {
    event.preventDefault();
    console.log('dragdrop...');
  };

  PageComponent.prototype.addChild = function (section) {
    var _this = this;

    var item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnClickListener(function () {
      item.removeFrom(_this.element);
    });
  };

  return PageComponent;
}(_component.BaseComponent);

exports.PageComponent = PageComponent;

var PageItemComponent =
/** @class */
function (_super) {
  __extends(PageItemComponent, _super);

  function PageItemComponent() {
    var _this = _super.call(this, "<li draggable=true class=\"page-item\">\n               <section class=\"page-item__body\"></section>\n               <div class=\"page-item__controls\">\n                  <button class=\"close\">x</button>\n               </div>\n            </li>") || this;

    var closeBtn = _this.element.querySelector(".close");

    closeBtn.onclick = function () {
      _this.closeListener && _this.closeListener();
    };

    _this.element.addEventListener('dragstart', function (event) {
      _this.onDragStart(event);
    });

    _this.element.addEventListener('dragend', function (event) {
      _this.onDragEnd(event);
    });

    return _this;
  }

  PageItemComponent.prototype.onDragStart = function (event) {
    console.log('dragstart...');
  };

  PageItemComponent.prototype.onDragEnd = function (event) {
    console.log('dragend...');
  };

  PageItemComponent.prototype.addChild = function (child) {
    var container = this.element.querySelector(".page-item__body");
    child.attachTo(container, "afterbegin");
  };

  PageItemComponent.prototype.setOnClickListener = function (listener) {
    this.closeListener = listener;
  };

  return PageItemComponent;
}(_component.BaseComponent);

exports.PageItemComponent = PageItemComponent;
},{"../component.js":"dist/components/component.js"}],"dist/components/page/item/note.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteComponent = void 0;

var _component = require("../../component.js");

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var NoteComponent =
/** @class */
function (_super) {
  __extends(NoteComponent, _super); // private readonly element:HTMLElement; 


  function NoteComponent(title, body) {
    var _this = _super.call(this, "<section class=\"note\">\n               <h2 class=\"page-item__title note__title\"></h2>\n               <p class=\"note__body\"></p>\n            </section>") || this;

    var titleElement = _this.element.querySelector('.note__title');

    titleElement.textContent = title;

    var bodyElement = _this.element.querySelector('.note__body');

    bodyElement.textContent = body; //☃︎

    return _this;
  }

  return NoteComponent;
}(_component.BaseComponent);

exports.NoteComponent = NoteComponent;
},{"../../component.js":"dist/components/component.js"}],"dist/components/page/item/todo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoComponent = void 0;

var _component = require("../../component.js");

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TodoComponent =
/** @class */
function (_super) {
  __extends(TodoComponent, _super); // private readonly element:HTMLElement; 


  function TodoComponent(title, body) {
    var _this = _super.call(this, "<section class=\"todo\">\n               <h2 class=\"page-item__title todo__title\"></h2>\n               <input type=\"checkbox\" id=\"todo-checkbox\">\n               <label for=\"todo-checkbox\" class=\"todo-label\"></label>\n            </section>") || this;

    var titleElement = _this.element.querySelector('.todo__title');

    titleElement.textContent = title;

    var bodyElement = _this.element.querySelector('.todo-label');

    bodyElement.textContent = body;
    return _this; // bodyElement.textContent= body; // ???? 확인할 것! textContent... insertAdjacentText... innerText innerHTML...ah...
    // bodyElement.insertAdjacentText('afterbegin', body)
  }

  return TodoComponent;
}(_component.BaseComponent);

exports.TodoComponent = TodoComponent;
},{"../../component.js":"dist/components/component.js"}],"dist/components/page/item/video.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoComponent = void 0;

var _component = require("../../component.js");

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var VideoComponent =
/** @class */
function (_super) {
  __extends(VideoComponent, _super); // private readonly element:HTMLElement; 


  function VideoComponent(title, url) {
    var _this = _super.call(this, "<section class=\"video\">\n               <div class=\"video__player\">\n                  <iframe src=\"\" frameborder=\"0\" class=\"video__iframe\"></iframe>\n               </div>\n               <h3 class=\"page-item__title video__title\"></h3>\n            </section>") || this;

    var imageElement = _this.element.querySelector('.video__iframe');

    imageElement.src = _this.convertToEmbededURL(url);

    var titleElement = _this.element.querySelector('.video__title');

    titleElement.textContent = title; //☃︎

    return _this;
  }

  VideoComponent.prototype.convertToEmbededURL = function (url) {
    var regExp = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/);
    var match = url.match(regExp);
    var videoId = match ? match[1] || match[2] : undefined;
    console.log('videoId:', videoId);

    if (videoId) {
      return "https://youtube.com/embed/" + videoId;
    }

    return url;
  };

  return VideoComponent;
}(_component.BaseComponent);

exports.VideoComponent = VideoComponent;
},{"../../component.js":"dist/components/component.js"}],"dist/components/dialog/dialog.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputDialog = void 0;

var _component = require("../component.js");

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var InputDialog =
/** @class */
function (_super) {
  __extends(InputDialog, _super);

  function InputDialog() {
    var _this = _super.call(this, "<dialog class=\"dialog\">\n               <div class=\"dialog__container\">\n                  <button class=\"close\">X</button>\n                  <div id=\"dialog__body\"></div>\n                  <button class=\"dialog_submit\">ADD</button>\n               </div>\n            </dialog>") || this;

    var closeBtn = _this.element.querySelector('.close');

    closeBtn.onclick = function () {
      _this.closeListener && _this.closeListener();
    };

    var submitBtn = _this.element.querySelector('.dialog_submit');

    submitBtn.onclick = function () {
      _this.submitListener && _this.submitListener();
    };

    return _this;
  }

  InputDialog.prototype.setOnCloseListener = function (listener) {
    this.closeListener = listener;
  };

  InputDialog.prototype.setOnSubmitListener = function (listener) {
    this.submitListener = listener;
  };

  InputDialog.prototype.addChild = function (child) {
    var body = this.element.querySelector("#dialog__body");
    child.attachTo(body);
  };

  return InputDialog;
}(_component.BaseComponent);

exports.InputDialog = InputDialog;
},{"../component.js":"dist/components/component.js"}],"dist/components/input/media-input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaSectionInput = void 0;

var _component = require("../component.js");

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var MediaSectionInput =
/** @class */
function (_super) {
  __extends(MediaSectionInput, _super);

  function MediaSectionInput() {
    return _super.call(this, "<div>\n               <div class=\"form__container\">\n                  <label for=\"title\">Title</label>\n                  <input type=\"text\" id=\"title\">\n               </div>\n               <div class=\"form__container\">\n                  <label for=\"url\">URL</label>\n                  <input type=\"text\" id=\"url\">\n               </div>\n            </div>") || this;
  }

  Object.defineProperty(MediaSectionInput.prototype, "title", {
    get: function get() {
      var title = document.querySelector('#title');
      return title.value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MediaSectionInput.prototype, "url", {
    get: function get() {
      var url = document.querySelector('#url');
      return url.value;
    },
    enumerable: false,
    configurable: true
  });
  return MediaSectionInput;
}(_component.BaseComponent);

exports.MediaSectionInput = MediaSectionInput;
},{"../component.js":"dist/components/component.js"}],"dist/components/input/text-input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextSectionInput = void 0;

var _component = require("../component.js");

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TextSectionInput =
/** @class */
function (_super) {
  __extends(TextSectionInput, _super);

  function TextSectionInput() {
    return _super.call(this, "<div>\n               <div class=\"form__container\">\n                  <label for=\"title\">Title</label>\n                  <input type=\"text\" id=\"title\">\n               </div>\n               <div class=\"form__container\">\n                  <label for=\"body\">Body</label>\n                  <textarea type=\"text\" row=\"3\" id=\"body\"></textarea>\n               </div>\n            </div>") || this;
  }

  Object.defineProperty(TextSectionInput.prototype, "title", {
    get: function get() {
      var title = document.querySelector('#title');
      return title.value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(TextSectionInput.prototype, "body", {
    get: function get() {
      var body = document.querySelector('#body');
      return body.value;
    },
    enumerable: false,
    configurable: true
  });
  return TextSectionInput;
}(_component.BaseComponent);

exports.TextSectionInput = TextSectionInput;
},{"../component.js":"dist/components/component.js"}],"dist/app.js":[function(require,module,exports) {
"use strict";

var _image = require("./components/page/item/image.js");

var _page = require("./components/page/page.js");

var _note = require("./components/page/item/note.js");

var _todo = require("./components/page/item/todo.js");

var _video = require("./components/page/item/video.js");

var _dialog = require("./components/dialog/dialog.js");

var _mediaInput = require("./components/input/media-input.js");

var _textInput = require("./components/input/text-input.js");

var App =
/** @class */
function () {
  function App(appRoot, dialogRoot) {
    var _this = this;

    this.page = new _page.PageComponent(_page.PageItemComponent);
    this.page.attachTo(appRoot, 'afterbegin');
    var imageBtn = document.querySelector("#new-image");
    imageBtn.addEventListener("click", function () {
      var dialog = new _dialog.InputDialog();
      var inputSection = new _mediaInput.MediaSectionInput();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);
      dialog.setOnCloseListener(function () {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(function () {
        var image = new _image.ImageComponent(inputSection.title, inputSection.url);

        _this.page.addChild(image);

        dialog.removeFrom(dialogRoot);
      });
    });
    var videoBtn = document.querySelector("#new-video");
    videoBtn.addEventListener('click', function () {
      var dialog = new _dialog.InputDialog();
      var inputSection = new _mediaInput.MediaSectionInput();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);
      dialog.setOnCloseListener(function () {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(function () {
        var video = new _video.VideoComponent(inputSection.title, inputSection.url);

        _this.page.addChild(video);

        dialog.removeFrom(dialogRoot);
      });
    });
    var noteBtn = document.querySelector("#new-note");
    noteBtn.addEventListener('click', function () {
      var dialog = new _dialog.InputDialog();
      var inputSection = new _textInput.TextSectionInput();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);
      dialog.setOnCloseListener(function () {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(function () {
        var note = new _note.NoteComponent(inputSection.title, inputSection.body);

        _this.page.addChild(note);

        dialog.removeFrom(dialogRoot);
      });
    });
    var todoBtn = document.querySelector("#new-todo");
    todoBtn.addEventListener('click', function () {
      var dialog = new _dialog.InputDialog();
      var inputSection = new _textInput.TextSectionInput();
      dialog.addChild(inputSection);
      dialog.attachTo(dialogRoot);
      dialog.setOnCloseListener(function () {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(function () {
        var todo = new _todo.TodoComponent(inputSection.title, inputSection.body);

        _this.page.addChild(todo);

        dialog.removeFrom(dialogRoot);
      });
    }); // For demo :)

    this.page.addChild(new _image.ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new _video.VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
    this.page.addChild(new _note.NoteComponent('Note Title', "Don't forget to code your dream"));
    this.page.addChild(new _todo.TodoComponent('Todo Title', 'TypeScript Course!'));
    this.page.addChild(new _image.ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new _video.VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
    this.page.addChild(new _note.NoteComponent('Note Title', "Don't forget to code your dream"));
    this.page.addChild(new _todo.TodoComponent('Todo Title', 'TypeScript Course!'));
  }

  return App;
}();

new App(document.querySelector('.document'), document.body);
},{"./components/page/item/image.js":"dist/components/page/item/image.js","./components/page/page.js":"dist/components/page/page.js","./components/page/item/note.js":"dist/components/page/item/note.js","./components/page/item/todo.js":"dist/components/page/item/todo.js","./components/page/item/video.js":"dist/components/page/item/video.js","./components/dialog/dialog.js":"dist/components/dialog/dialog.js","./components/input/media-input.js":"dist/components/input/media-input.js","./components/input/text-input.js":"dist/components/input/text-input.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56691" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dist/app.js"], null)
//# sourceMappingURL=/app.b3a8c8ec.js.map