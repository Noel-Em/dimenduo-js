export { Circle };

class Circle
{

    #is_active = true;
    #is_visible = true;

    #color = "black";

    constructor(x, y, radius, filled = true, scene)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.filled = filled;
        this.ctx = scene.ctx;
    }

    #distance(x, y, c_x, c_y)
    {
        return Math.hypot(c_x - x, c_y - y);
    }

    // SECTION: Rect Color

    color(hex) {
        if(typeof hex === 'string' || hex instanceof String)
        {
            this.#color = hex;
        }
        else
        {
            console.error("Dimenduo: invalid hex value");
        }

    }

    // SECTION: Circle Position

    #set_position() {
        if(this.#is_active)
            this.ctx.translate( this.x + this.radius / 2, this.y + this.radius / 2 );
    }

    #restore_position() {
        if(this.#is_active)
            this.ctx.translate(-this.x - this.radius / 2, -this.y - this.radius / 2);
    }

    // SECTION: Draw

    draw()
    {
        this.ctx.save();
        if(this.#is_active)
        {
            if(this.#is_visible)
            {
                this.#set_position();
                this.ctx.fillStyle = this.#color;
                this.ctx.beginPath();
                this.ctx.arc(-this.radius / 2, -this.radius / 2, this.radius, 0, 2 * Math.PI);
                if(this.filled) this.ctx.fill();
                this.#restore_position();
            }
            
        }
    }

    // SECTION: Collision

    is_colliding(other)
    {

        var distX = Math.abs(this.x - other.x - other.width/2);
        var distY = Math.abs(this.y - other.y - other.height/2);

        if (distX > (other.width/2 + this.radius)) 
            return false;
        if (distY > (other.height/2 + this.radius)) 
            return false;
        if (distX <= (other.width/2)) 
            return true;
        if (distY <= (other.height/2)) 
            return true;

        var dx=distX-other.width/2;
        var dy=distY-other.width/2;

        return dx * dx + dy * dy <= Math.pow(this.radius, 2);

    }

}