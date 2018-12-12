import { Base } from "js/Base";

class Electron extends Base {
    constructor(channel, atom) {
        super(channel, 'div');
        this.atom = atom;
        this.ctx = atom.ctx;
        this.cX = this.ctx.canvas.width / 2;
        this.cY = this.ctx.canvas.height / 2;
        this.fullCircle = 2 * Math.PI;
        this.baseSpeed = this.fullCircle / 20;
        this.theta = Math.random() * this.fullCircle;
        this.size = 3;
        this.update(1);
    }               

    update(dt) {
        const radius = this.atom.radius;
        this.theta += this.baseSpeed * this.atom.speed * dt;
        (this.theta > this.fullCircle) && (this.theta = 0);
        const x = radius*(Math.cos(this.theta) * 0.2),
            y = radius*(Math.sin(this.theta));
        this.nX = this.cX+x*Math.cos(this.rAngle)+y*Math.sin(this.rAngle);
        this.nY = this.cY-x*Math.sin(this.rAngle)+y*Math.cos(this.rAngle);
        this.render();
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.nX, this.nY, this.size, 0, this.fullCircle);
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
        this.ctx.shadowColor = '#aaf';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;                    
        this.ctx.closePath();    
        this.ctx.stroke();  
    } 
}          