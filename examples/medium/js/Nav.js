import { Base } from "js/Base";

class Nav extends Base {
    constructor(channel, text, targets) {
        super(null, 'a');
        this.parent = channel.NavBar;
        this.text = text;
        this.targets = targets;
        this.className = ['nav'];
        this.state = {
            selected: false
        };
    }

    setState(k, v) {
        // remove selected state/class from siblings
        if (k == "selected") {
            this.parent.navs
                .filter( e => e.state.selected && e != this)
                .forEach( e => {
                    e.DOM.classList.remove("selected");
                    e.state.selected = false;										
                });
            if (this.state.selected) {
                return;
            }
        }
        super.setState(k, v);
    }

    static toggleSelected (ev) {
        this.setState("selected", !this.state.selected);
    }
    
    render() {
        const nav = this.DOM;
        // i prefer onclick with for of and i don't need
        // removeEventListener for avoid memory leaks 
        if (this.targets.length > 0) {
            nav.onclick = e => {
                for (const target of this.targets) {
                    const type = typeof target;
                    if (type == "string") {
                        location.href = target;
                    } else if (type == "function") {
                        target.call(this, e);
                    }
                }                           
            };
        }

        nav.classList[this.state.selected ? 'add' : 'remove']("selected");
        nav.classList.add(...this.className);
        nav.textContent = this.text;
        return nav;
    }
}