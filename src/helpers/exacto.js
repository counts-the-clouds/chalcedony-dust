
// X (or Exacto) is a super tiny replacement for jQuery, just a quick
// reimplementation of everything I would actually use from that library.

global.X = function(query) {
  return document.querySelectorAll(query)
}

X.first = function(query) {
  return document.querySelector(query)
}

X.body = function() { return document.getElementsByTagName('body')[0]; }
X.each = function(query, callback) { X(query).forEach(callback); }


// === Create and Modify Elements -=============================================

// Either remove all elements that match the query string. There's no need for
// this to only work on a single element, just call element.remove() instead.
X.remove = function(query) {
  X(query).forEach(element => { element.remove(); });
}

X.removeAttribute = function(arg, attribute) {
  (typeof arg == "string" ? X.first(arg) : arg).removeAttribute(attribute);
}

X.empty = function(arg) {
  (typeof arg == "string" ? X.first(arg) : arg).replaceChildren();
}

X.fill = function(arg, element) {
  (typeof arg == "string" ? X.first(arg) : arg).replaceChildren(element);
}

X.createElement = function(string) {
  let element = document.createElement("div");
  element.innerHTML = string;
  return element.children[0];
}

X.copyElement = function(selector) {
  return X.first(selector).cloneNode(true);
}

X.loadDocument = function(selector, path) {
  X.fill(X.first(selector), X.createElement(FileHelper.readFile(path)));
}

// === Events ==================================================================

X.onClick = function(selector, callback) {
  window.addEventListener('click', event => {
    if (event.target.matches(".disabled") === false && event.target.closest(selector)) {
      callback(event);
    }
  });
}

X.registerKeyAction = function(action, when, callback) {
  window.addEventListener('keydown', event => {
    if (when(event) && lookupActionCodes(action).includes(event.code)) {
      callback(event);
    }
  });
}

// X.onInput = function(selector, callback) {
//   window.addEventListener('keydown', event => {
//     if (event.target.matches(".disabled") === false && event.target.closest(selector)) {
//       callback(event);
//     }
//   });
// }

// X.onKeyDown = function(key, when, callback) {
//   window.addEventListener('keydown', event => {
//     if (event.key === key && when(event)) { callback(event); }
//   });
// }

X.onCodeDown = function(code, when, callback) {
  window.addEventListener('keydown', event => {
    // console.log("Code:",event.code);
    if (event.code === code && when(event)) { callback(event); }
  });
}

// X.onCodesDown = function(codes, when, callback) {
//   window.addEventListener('keydown', event => {
//     // console.log("Code:",event.code);
//     if (codes.includes(event.code) && when(event)) { callback(event); }
//   });
// }

// X.onCodesUp = function(codes, when, callback) {
//   window.addEventListener('keyup', event => {
//     if (codes.includes(event.keyCode) && when(event)) { callback(event); }
//   });
// }

// X.onWheelUp = function(when, callback) {
//   window.addEventListener('wheel', event => {
//     if (event.deltaY < 0 && when(event)) { callback(event); }
//   });
// }

// X.onWheelDown = function(when, callback) {
//   window.addEventListener('wheel', event => {
//     if (event.deltaY > 0 && when(event)) { callback(event); }
//   });
// }

// X.onResize = function(when, callback) {
//   window.addEventListener('resize', (event) => {
//     if (when(event)) { callback(event); }
//   });
// }

// X.onEscape = function(when, callback)     { X.onCodeDown(_keyCodeEscape, when, callback); }
// X.onPageUp = function(when, callback)     { X.onCodeDown(_keyCodePageUp, when, callback); }
// X.onPageDown = function(when, callback)   { X.onCodeDown(_keyCodePageDown, when, callback); }
// X.onArrowUp = function(when, callback)    { X.onCodeDown(_keyCodeArrowUp, when, callback); }
// X.onArrowDown = function(when, callback)  { X.onCodeDown(_keyCodeArrowDown, when, callback); }
// X.onArrowLeft = function(when, callback)  { X.onCodeDown(_keyCodeArrowLeft, when, callback); }
// X.onArrowRight = function(when, callback) { X.onCodeDown(_keyCodeArrowRight, when, callback); }

// === Classes =================================================================

// These class manipulation function can all take either an element or a query
// selector. With hasClass() the function really only makes sense for a single
// element so it only considers the first element with the selector, intended
// for use with element IDs.

X.hasClass = function(arg, classname) {
  return (typeof arg == "string" ? X.first(arg) : arg).classList.contains(classname);
}

X.addClass = function(arg, classname) {
  if (typeof arg == "string") {
    return Array.from(document.querySelectorAll(arg)).forEach((element) => element.classList.add(classname));
  }
  arg.classList.add(classname);
}

X.removeClass = function(arg, classname) {
  if (typeof arg == "string") {
    return Array.from(document.querySelectorAll(arg)).forEach((element) => element.classList.remove(classname));
  }
  arg.classList.remove(classname);
}

X.removeClassWithin = function(element, classname) {
  element.querySelectorAll(`.${classname}`)[0].classList.remove(classname);
}

// X.classesExcept = function(element, classList) {
//   let list = [];
//   element.classList.forEach(classname => {
//     if (!classList.includes(classname)) { list.push(classname); }
//   });
//   return list;
// }

// === Style ===================================================================

X.getPosition = function(element) {
  return element.getBoundingClientRect();
}

X.assetURL = function(path) {
  return `url('${APP}/assets/${path}')`;
}

// === Helper Functions ========================================================

function lookupActionCodes(action) {
  return WorldState.getKeyBindings().filter(bind => bind.action == action)[0].codes;
}
