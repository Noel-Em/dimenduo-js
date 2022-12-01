export { Rect };

class Rect {

    #is_active = true;
    #is_visible = true;

    #angle = 0;
    #line_thickness = 1;
    #color = "white";

    #alpha = 1.0;

    #rotation_set = false;

    constructor(x, y, width, height, filled = true, scene) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.filled = filled;
        this.ctx = scene.ctx;
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


    set_alpha(alpha = 1) {
        this.#alpha = alpha;
    }

    // SECTION: MORE OPTIONS

    set_angle(angle = 0.0) {
        this.#angle = angle;
    }

    visible(is_visible = true) {
        this.#is_visible = is_visible;
    }

    set_active(is_active = true) {
        this.#is_active = is_active;
    }

    get_active() {
        return this.#is_active;
    }

    thickness(border_thickness = 1)
    {
        if(!this.filled)
        {
            this.#line_thickness = border_thickness;
        }
        else
        {
            console.error("Dimenduo: it is impossible to set the thickness of a filled rect");
        }
    }

    // SECTION: Rect Rotation

    get_angle()
    {
        return this.#angle;
    }

    #rotate() {
        if(!this.#rotation_set && this.#is_active)
        {
            this.ctx.rotate(this.#angle * Math.PI / 180);
        }
    }

    #restore_rotation() {
        if(!this.#rotation_set && this.#is_active)
        {
            this.ctx.rotate(-this.#angle * Math.PI / 180);
            this.#rotation_set = true;
        }
    }

    rotate(speed) {
        if(this.#is_active)
            this.set_angle(this.get_angle() + speed);
    }

    // SECTION: Rect Position
    
    #set_position() {
        if(this.#is_active)
            this.ctx.translate( this.x + this.width / 2, this.y + this.height / 2 );
    }

    #restore_position() {
        if(this.#is_active)
            this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
    }

    // SECTION: Draw

    draw() {
        this.ctx.save();
        if(this.#is_active)
        {
            if(this.#is_visible == false)
            {
                this.ctx.globalAlpha = 0;
                this.ctx.fillStyle = "transparent";
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                this.ctx.globalAlpha = 1;
            }
            else
            {
                this.#set_position();
                this.#rotation_set = false;
                this.#rotate();
                if(this.filled)
                {
                    this.ctx.globalAlpha = this.#alpha;
                    this.ctx.fillStyle = this.#color;
                    this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
                }
                else
                {
                    this.ctx.globalAlpha = this.#alpha;
                    this.rectStyle = this.#color;
                    this.ctx.lineWidth = this.#line_thickness;
                    this.ctx.strokeRect(this.x,this.y,this.width,this.height);
                }
                this.#restore_position();
                this.#restore_rotation();
                this.ctx.globalAlpha = 1;
            }
            this.ctx.restore();
        }
    }

    is_colliding(other)
    {
        if(other.x < this.x + this.width &&
            other.x + other.width > this.x &&
            other.y < this.y + this.height &&
            other.height + other.y > this.y && other.get_active())
        {
            return true;
        }
    }
}