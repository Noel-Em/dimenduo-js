export { Circle };

class Circle
{

    #is_active = true;
    #is_visible = true;

    #color = "black";
    #scene = null;

    constructor(x, y, radius, filled = true, scene)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.filled = filled;
        this.#scene = scene;
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

    set_active(is_active = true)
    {
        this.#is_active = is_active;
    }

    get_active()
    {
        return this.#is_active;
    }

    // SECTION: Circle Position

    #set_position() {
        if(this.#is_active)
            this.ctx.translate( this.get_sync_x() + this.get_sync_radius() / 2, this.get_sync_y() + this.get_sync_radius() / 2 );
    }

    #restore_position() {
        if(this.#is_active)
            this.ctx.translate(-this.get_sync_x() - this.get_sync_radius() / 2, -this.get_sync_y() - this.get_sync_radius() / 2);
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

    get_sync_radius()
    {
        return (this.#scene.get_sync().includes("width") ? this.radius * this.#scene.get_ratio()[0] : 
        (this.#scene.get_sync().includes("height") ? this.radius * this.#scene.get_ratio()[1] : this.radius));
    }

    get_element_name()
    {
        return "circle";
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
                this.ctx.arc(-this.get_sync_radius() / 2, -this.get_sync_radius() / 2, this.get_sync_radius(), 0, 2 * Math.PI);
                if(this.filled) this.ctx.fill();
                this.#restore_position();
            }
            
        }
    }

    // SECTION: Collision

    is_colliding(other)
    {

        if(other.get_element_name() == "rect")
        {
            var distX = Math.abs(this.get_sync_x() - other.get_sync_x() - other.get_sync_width()/2);
            var distY = Math.abs(this.get_sync_y() - other.get_sync_y() - other.get_sync_height()/2);

            if (distX > (other.get_sync_width()/2 + this.get_sync_radius())) 
                return false;
            if (distY > (other.get_sync_height()/2 + this.get_sync_radius())) 
                return false;
            if (distX <= (other.get_sync_width()/2)) 
                return true;
            if (distY <= (other.get_sync_height()/2)) 
                return true;

            var dx=distX-other.width/2;
            var dy=distY-other.width/2;

            return dx * dx + dy * dy <= Math.pow(this.get_sync_radius(), 2);
        } else if(other.get_element_name() == "circle")
        {
            var distX = Math.abs(this.get_sync_x() - other.get_sync_x() - other.get_sync_radius()/2);
            var distY = Math.abs(this.get_sync_y() - other.get_sync_y() - other.get_sync_radius()/2);

            if (distX > (other.get_sync_radius()/2 + this.get_sync_radius())) 
                return false;
            if (distY > (other.get_sync_radius()/2 + this.get_sync_radius())) 
                return false;
            if (distX <= (other.get_sync_width()/2)) 
                return true;
            if (distY <= (other.get_sync_height()/2)) 
                return true;

            var dx=distX-other.width/2;
            var dy=distY-other.width/2;

            return dx * dx + dy * dy <= Math.pow(this.get_sync_radius(), 2);
        }

    }

}