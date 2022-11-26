export { Sprite };

class Sprite {
    
    #is_active = true;
    #angle = 0;

    #rotation_set = false;
    
    constructor(x, y, width, height, path, scene) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.path = path;
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

    draw()
    {
        if(this.#is_active)
        {
            this.ctx.save();
            const img = new Image(this.width,this.height);
            img.src = this.path;
            this.#set_position();
            this.#rotation_set = false;
            this.#rotate();
            this.ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
            
            this.#restore_position();
            this.#restore_rotation();
            this.ctx.restore();
        }
    }
}