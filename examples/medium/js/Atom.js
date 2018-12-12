import { AtomController } from "js/AtomController";
import { Orbit } from "js/Orbit";
import { Electron } from "js/Electron";

class Atom extends Base {
    constructor(channel) {
        super(channel, 'div');
        this.className = ['atom'];
        this.orbits = [];
        this.electrons = [];
        this.speed = 5;
        this.maxOrbits = 25;
        this.radius = 100;
        this.state = {
            run: false
        };
        this.lastTime = 0;
        this.init();
    }
    init() {
        const canvas = document.createElement('canvas'),
            initNr = 3;
        let i = 0;
        this.DOM.innerHTML = '';
        this.ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 500;
        this.controller = new AtomController(null, this);
        this.DOM.appendChild(canvas);
        this.DOM.classList.add(...this.className);
        for (; i < initNr; i++) {
            this.add();
        }
    }
    add() {
        if (this.orbits.length >= this.maxOrbits) {
            return;
        }
        this.orbits.push(new Orbit(this.channel, this));
        this.electrons.push(new Electron(this.channel, this));
        this.update();
    }
    remove() {
        if (this.orbits.length < 1) {
            return;
        }
        this.orbits.pop();
        this.electrons.pop();
        this.update();
    }
    update() {
        const nr = this.orbits.length,
            part = 1 / nr;
        let rAng;
        let i = 0;
        for (; i<nr;i++) {
            rAng = Math.PI * part * i;
            this.orbits[i].rAngle = rAng;
            this.electrons[i].rAngle = rAng;
        }
    }
    run() {
        const now = Date.now(),
            dt = (now - this.lastTime) / 1000.0;
        this.lastTime = now;
        if (!this.DOM.parentElement || !this.state.run) {
            this.state.run = false;
            return;
        }
        this.render(dt);
        this.state.run && window.requestAnimationFrame(this.run.bind(this));
    }
    setState(k, v) {
        this.state[k] = v;
        this.render();
    }
    static start(ctxObj) {
        // lets make curry :)
        // here we have access to: ctxObj = atom, this = nav, ev = event
        return function(ev) {
            if (ctxObj.state.run) {
                return;
            }
            ctxObj.channel.Content.setContent(ctxObj.DOM);
            ctxObj.playButton.click();
            ctxObj.run.call(ctxObj);
        }
    }
    render(dt) {
        const {width,height} = this.ctx.canvas;
        this.ctx.clearRect(0,0,width,height);
        this.orbits.forEach(e => e.render(dt));
        this.electrons.forEach(e => e.update(dt));
    }
}