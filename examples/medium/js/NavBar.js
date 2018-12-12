import { Nav } from "js/Nav";

class NavBar extends Base {

    constructor(channel, list) {
        super(channel, 'div');
        this.navs = list.map(([text, cb]) => new Nav(channel, text, cb) )
        this.render();
        this.navs[0].DOM.click();
    }

    render() {
        const navBar = this.DOM;
        navBar.classList.add('navbar');
        return this.navs.reduce((obj, e) => {
            obj.appendChild(e.render());
        return obj;
        }, navBar);
    }
}