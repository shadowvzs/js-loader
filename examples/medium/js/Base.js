class Base {
    constructor(channel = false, type = false) {
        if (channel) { 
            this.channel = channel;
            channel[this.constructor.name] = this;
        };
        (type) && ( this.DOM = document.createElement(type) );
    }

    createElement(type, classes = null, childs = null, attr = null) {
        const e = document.createElement(type);
        classes && (e.classList.add(...classes));
        if (childs && childs.length) {
            for (const child of childs) {
                e.appendChild(child);
            }
        }
        if (attr) {
            for (const key in attr) {
                e[key] = attr[key];
            }
        }
        return e;
    }

    setState(k, v) {
        this.state[k] = v;
        if (!this.DOM) {
            return;
        }
        const e = this.render();
        this.DOM.replaceWith(e);
        this.DOM = e;
    }
}
