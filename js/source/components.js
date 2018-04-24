;(function (w) {
    "use strict";

    /**
     * Buffer for components
     * @returns {function} - operations with buffer
     */
    let componentsBuffer = (() => {
        let buffer = [];

        return (data) => data ? buffer.push(data) : buffer;
    })();

    function compareOrder(component1, component2) {
        if (component1["_order"] > component2["_order"]) return 1;
        if (component1["_order"] < component2["_order"]) return -1;
    }

    function replacer(string, data) {
        let newString = string;

        for (let value in data) {
            if (data.hasOwnProperty(value)) {
                let regexp = new RegExp(`{${value}}`, 'g');

                newString = newString.replace(regexp, data[value]);
            }
        }

        return newString;
    }

    function bindMenuClick(event) {
        let newComponent = this.getAttribute('href');

        if (newComponent !== "#") {
            let viewParent = document.querySelector(w[newComponent].options.parent);

            if (viewParent) {
                let components = componentsBuffer();

                for (let component of components) {
                    if (component._view === viewParent) {
                        component._rendered = false;
                        break;
                    }
                }

                viewParent.remove();
            }

            Component.renderPage(w[newComponent]);
        }

        event.preventDefault();
    }

    class Component {
        constructor(options) {
            this.options = options;
            this._order = 0;
            this._name = options.name;
            this._rendered = false;
            this._view = null;

            componentsBuffer(this);
        }

        setOrder(order) {
            let orderNum = +order;

            if (!isNaN(orderNum)) {
                this._order = orderNum;
            }
        }

        setView(view, data = null) {
            let element = document.createElement(this.options.parent);

            if (data) {
                let viewChild;

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


        createView(view, data, viewChild) {
            let item = "";
            let newView;
            let subMenu;
            let newViewChild;

            for (let value of data) {
                subMenu = "";

                if (value.hasOwnProperty('items')) {
                    subMenu = this.createView(
                        '<ul class="submenu">{li}</ul>',
                        value['items'],
                        '<li><a href="{url}">{name}</a>{submenu}</li>'
                    );
                }

                newViewChild = viewChild.replace(/\{submenu\}/, subMenu);
                item += replacer(newViewChild, value);
            }

            newView = view.replace(/\{\w*\}/g, item);
            return newView;
        }

        static renderPage(...components) {
            let viewBody = document.querySelector('body');

            components.sort(compareOrder);

            components.map((component) => {
                components.length === 1
                    ? viewBody.insertBefore(component._view, componentFooter._view)
                    : viewBody.appendChild(component._view);

                component._rendered = true;
                console.log(`${component._name} rendered`);
            });
        }

        delete() {
            this._view.remove();
        }
    }

    w.Component = Component;

})(window);