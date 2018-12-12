import { Base } from "js/Base";

class Orbit extends Base {
    constructor(channel, atom) {
        super(channel, 'div');
        this.atom = atom;
        this.ctx = atom.ctx;
        this.cX = this.ctx.canvas.width / 2;
        this.cY = this.ctx.canvas.height / 2;
        this.fullCircle = 2*Math.PI;
        this.speed = this.fullCircle/20;
        this.render(1);
    }               

    render(dt) {
        const step = this.speed * dt,
            radius = this.atom.radius;
        let theta = 0, x, y, nX, nY;
        this.ctx.beginPath();
        for(; theta < this.fullCircle; theta += step ) { 
            x = radius*(Math.cos(theta)*0.2);
            y = radius*(Math.sin(theta));    
            nX = x*Math.cos(this.rAngle)+y*Math.sin(this.rAngle);
            nY = -x*Math.sin(this.rAngle)+y*Math.cos(this.rAngle);
            this.ctx.lineTo(this.cX+nX,this.cY+nY);
        }
        this.ctx.closePath();    
        this.ctx.stroke();  
    } 
}