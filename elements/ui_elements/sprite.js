export { Sprite };

class Sprite {
    
    #is_active = true;
    #angle = 0;

    #rotation_set = false;
    #scene = null;
    
    constructor(x, y, width, height, path, scene) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.path = path;
        this.#scene = scene;
        this.ctx = scene.ctx;
    }

    // SECTION: Rect Rotation

    set_angle(angle) {
        this.#angle = angle;
    }

    get_angle() {
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

    // SECTION: Rect Position

    #set_position() {
        if(this.#is_active)
            this.ctx.translate( this.get_sync_x() + this.get_sync_width() / 2, this.get_sync_y() + this.get_sync_height() / 2 );
    }

    #restore_position() {
        if(this.#is_active)
            this.ctx.translate( -this.get_sync_x() - this.get_sync_width() / 2, -this.get_sync_y() - this.get_sync_height() / 2 );
    }

    // SECTION: Draw

    draw()
    {
        if(this.#is_active)
        {
            this.ctx.save();
            const img = new Image(this.get_sync_width(),this.get_sync_height());
            img.src = this.path;
            this.#set_position();
            this.#rotation_set = false;
            this.#rotate();
            this.ctx.drawImage(img, -this.get_sync_width() / 2, -this.get_sync_height() / 2, this.get_sync_width(), this.get_sync_height());
            
            this.#restore_position();
            this.#restore_rotation();
            this.ctx.restore();
        }
    }
}