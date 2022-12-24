export { Rect };

class Rect {

    #is_active = true;
    #is_visible = true;

    #angle = 0;
    #line_thickness = 1;
    #color = "white";

    #alpha = 1.0;

    #rotation_set = false;
    #scene = null;

    constructor(x, y, width, height, filled = true, scene) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.filled = filled;
        this.#scene = scene;
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

    get_element_name()
    {
        return "rect";
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
            this.ctx.translate( this.get_sync_x() + this.get_sync_width() / 2, this.get_sync_y() + this.get_sync_height() / 2 );
    }

    #restore_position() {
        if(this.#is_active)
            this.ctx.translate(-this.get_sync_x() - this.get_sync_width() / 2, -this.get_sync_y() - this.get_sync_height() / 2);
    }

    // SECTION: Sync Positions

    get_sync_x()
    {
        return (this.#scene.get_sync().includes("width") ? (this.x + this.#scene.get_camera_coords()[0]) * this.#scene.get_ratio()[0] : this.x + this.#scene.get_camera_coords()[0]);
    }

    get_sync_y()
    {
        return (this.#scene.get_sync().includes("height") ? (this.y + this.#scene.get_camera_coords()[1]) * this.#scene.get_ratio()[1] : this.y + this.#scene.get_camera_coords()[1]);
    }

    get_sync_width()
    {
        return (this.#scene.get_sync().includes("width") ? this.width * this.#scene.get_ratio()[0] : 
        (this.#scene.get_sync().includes("height") ? this.width * this.#scene.get_ratio()[1] : this.width));
    }

    get_sync_height()
    {
        return (this.#scene.get_sync().includes("height") ? this.height * this.#scene.get_ratio()[1] : 
        (this.#scene.get_sync().includes("width") ? this.height * this.#scene.get_ratio()[0] : this.height) );
    }

    // SECTION: Draw

    draw() {
        this.ctx.save();
        if(this.#is_active)
        {
            if(this.#is_visible)
            {
                this.#set_position();
                this.#rotation_set = false;
                this.#rotate();
                if(this.filled)
                {
                    this.ctx.globalAlpha = this.#alpha;
                    this.ctx.fillStyle = this.#color;
                    this.ctx.fillRect(-this.get_sync_width() / 2, -this.get_sync_height() / 2, this.get_sync_width(), this.get_sync_height());
                }
                else
                {
                    this.ctx.globalAlpha = this.#alpha;
                    this.rectStyle = this.#color;
                    this.ctx.lineWidth = this.#line_thickness;
                    this.ctx.strokeRect(this.get_sync_x(),this.get_sync_x(),this.get_sync_width(),this.get_sync_height());
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
        if(other.get_element_name() == "rect")
        {
            if(other.get_sync_x() < this.get_sync_x() + this.get_sync_width() &&
                other.get_sync_x() + other.get_sync_width() > this.get_sync_x() &&
                other.get_sync_y() < this.get_sync_y() + this.get_sync_height() &&
                other.get_sync_height() + other.get_sync_y() > this.get_sync_y() && other.get_active())
            {
                return true;
            }
        } else if(other.get_element_name() == "circle")
        {
            if(other.get_sync_x() < this.get_sync_x() + this.get_sync_width() &&
                other.get_sync_x() + other.get_sync_radius() > this.get_sync_x() &&
                other.get_sync_y() < this.get_sync_y() + this.get_sync_height() &&
                other.get_sync_radius() + other.get_sync_y() > this.get_sync_y() && other.get_active())
            {
                return true;
            }
        }
    }
}