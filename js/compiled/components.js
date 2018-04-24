"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function (w) {
    "use strict";

    /**
     * Buffer for components
     * @returns {function} - operations with buffer
     */

    var componentsBuffer = function () {
        var buffer = [];

        return function (data) {
            return data ? buffer.push(data) : buffer;
        };
    }();

    function compareOrder(component1, component2) {
        if (component1["_order"] > component2["_order"]) return 1;
        if (component1["_order"] < component2["_order"]) return -1;
    }

    function replacer(string, data) {
        var newString = string;

        for (var value in data) {
            if (data.hasOwnProperty(value)) {
                var regexp = new RegExp("{" + value + "}", 'g');

                newString = newString.replace(regexp, data[value]);
            }
        }

        return newString;
    }

    function bindMenuClick(event) {
        var newComponent = this.getAttribute('href');

        if (newComponent !== "#") {
            var viewParent = document.querySelector(w[newComponent].options.parent);

            if (viewParent) {
                var components = componentsBuffer();

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var component = _step.value;

                        if (component._view === viewParent) {
                            component._rendered = false;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                viewParent.remove();
            }

            Component.renderPage(w[newComponent]);
        }

        event.preventDefault();
    }

    var Component = function () {
        function Component(options) {
            _classCallCheck(this, Component);

            this.options = options;
            this._order = 0;
            this._name = options.name;
            this._rendered = false;
            this._view = null;

            componentsBuffer(this);
        }

        _createClass(Component, [{
            key: "setOrder",
            value: function setOrder(order) {
                var orderNum = +order;

                if (!isNaN(orderNum)) {
                    this._order = orderNum;
                }
            }
        }, {
            key: "setView",
            value: function setView(view) {
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                var element = document.createElement(this.options.parent);

                if (data) {
                    var viewChild = void 0;

                    switch (this._name) {
                        case "menu":
                            viewChild = '<li><a href="{url}">{name}</a>{submenu}</li>';
                            break;

                        case "articles":
                            viewChild = '<article><a href="{url}">{name}</a> {text}</article>';
                            break;

                        case "about":
                            viewChild = '<li>{name} {surname}, {age} лет, {from}, <a href="{profile}">profile</a></li>';
                            break;
                    }

                    element.innerHTML = this.createView(view, data, viewChild);

                    if (this._name === "menu") {
                        element.querySelectorAll('a').forEach(function (link) {
                            link.addEventListener('click', bindMenuClick);
                        });
                    }
                } else {
                    element.innerHTML = replacer(view, this.options);
                }

                this._view = element;
            }
        }, {
            key: "createView",
            value: function createView(view, data, viewChild) {
                var item = "";
                var newView = void 0;
                var subMenu = void 0;
                var newViewChild = void 0;

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var value = _step2.value;

                        subMenu = "";

                        if (value.hasOwnProperty('items')) {
                            subMenu = this.createView('<ul class="submenu">{li}</ul>', value['items'], '<li><a href="{url}">{name}</a>{submenu}</li>');
                        }

                        newViewChild = viewChild.replace(/\{submenu\}/, subMenu);
                        item += replacer(newViewChild, value);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                newView = view.replace(/\{\w*\}/g, item);
                return newView;
            }
        }, {
            key: "delete",
            value: function _delete() {
                this._view.remove();
            }
        }], [{
            key: "renderPage",
            value: function renderPage() {
                for (var _len = arguments.length, components = Array(_len), _key = 0; _key < _len; _key++) {
                    components[_key] = arguments[_key];
                }

                var viewBody = document.querySelector('body');

                components.sort(compareOrder);

                components.map(function (component) {
                    components.length === 1 ? viewBody.insertBefore(component._view, componentFooter._view) : viewBody.appendChild(component._view);

                    component._rendered = true;
                    console.log(component._name + " rendered");
                });
            }
        }]);

        return Component;
    }();

    w.Component = Component;
})(window);