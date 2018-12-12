import { NavBar } from "js/NavBar";
import { Atom } from "js/Atom";
import { Service } from "js/Service";
import { Content } from "js/Content";

class Root extends Base {
    constructor () {
        // object for horizontal data sharing
        const channel = {};		
        super(channel, 'div');
        // register components
        this.loadStyle("css/style.css");
        new NavBar(channel, [
            ["Home", [Nav.toggleSelected, Content.load(new Content(channel), "homepage")]],
            ["Atom", [Nav.toggleSelected, Atom.start(new Atom(channel))]]
        ]);
        this.render();
    }
    async loadStyle(url) {
        try {
            const el = document.createElement('style'),
                style = await Service.loadContent(url);
            el.innerHTML = style;
            document.head.appendChild(el);
        } catch(err) {
            alert("Error: maybe you have problem with CORS? "+err)
        }
    }
    render() {
        this.DOM.appendChild(this.channel.NavBar.DOM);
        this.DOM.appendChild(this.channel.Content.DOM);
        document.body.appendChild(this.DOM);
    }
}