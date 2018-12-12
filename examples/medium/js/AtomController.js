import { Base } from "js/Base";

class AtomController extends Base {
    constructor(channel, atom) {
        super();
        this.atom = atom;
        this.className = ['control'];
        this.init();
    }

    init() {
        this.DOM = this.createElement('div', this.className, [
            this.createElement('div', ['row'], [
                this.createElement('div', ['button'], [this.createElement('div', ['pause'])],{
                    onclick: this.toggleAtom.bind(this)
                }),
                this.createElement('div', ['button'], [this.createElement('div', ['plus'])],{
                    onclick: this.atom.add.bind(this.atom)
                }),
                this.createElement('div', ['button'], [this.createElement('div', ['minus'])],{
                    onclick: this.atom.remove.bind(this.atom)
                })
            ]),
            this.createElement('div', ['row'], [
                this.createElement('input', null, null, {
                    name: "speed",
                    type: "range",
                    value: this.atom.speed,
                    min: "0",
                    max: "20",
                    step: "0.1",
                    onchange: this.changeSpeed.bind(this)
                }),
                this.createElement('input', null, null, {
                    name: "speed",
                    type: "range",
                    value: this.atom.radius,
                    min: "1",
                    max: "250",
                    step: "5",
                    onchange: this.changeRadius.bind(this)
                }),                              
            ])
        ]);
        this.atom.playButton = this.DOM.firstChild.firstChild;
        this.render();  
    }

    toggleAtom(ev) {
        const state = this.atom.state.run,
            classes = ['play', 'pause'],
            e = ev.target.firstChild || ev.target;
        e.classList.remove(classes[+state]);
        this.atom.state.run = !state;
        e.classList.add(classes[+!state]);
        (!state) && (this.atom.run.call(this.atom));
     }

    changeSpeed(ev) {
        this.atom.speed = ev.target.value;
    }
    changeRadius(ev) {
        this.atom.radius = ev.target.value;
    }
    render() {
        this.atom.DOM.appendChild(this.DOM);  
    }
}