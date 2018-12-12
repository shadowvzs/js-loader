import { Base } from "js/Base";

class Content extends Base {
    constructor(channel) {
        super(channel, 'div');
        this.className = ['content'];
        this.render();
    }

    setContent(content) {
        this.DOM.innerHTML = typeof content == "string" ? content : "";
        if (typeof content == "object") {
            this.DOM.appendChild(content);
        }
    }

    static load(ctxObj, page) {
        const pages = {
            homepage: 'pages/homepage.txt'
        }
        return async function(e) {
            if (!pages[page]) { return; }
            const content = await Service.loadContent(pages[page]);
            ctxObj.setContent(content);
        }
    }
    
    render() {
        this.DOM.classList.add(...this.className);
        return this.DOM;
    }
}