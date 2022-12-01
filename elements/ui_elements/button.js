export { Button };

class Button {

    #is_active = true;
    #is_visible = true;

    #color = "white";
    #alpha = 1.0;

    #c_res = null;
    #h_res = null;

    constructor(x, y, width, height, scene)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = scene.ctx;
    }

    #isInsideButton(pos, rect)
    {
        return pos[0] >= rect.x && 
        pos[0] <= rect.x + rect.width &&
        pos[1] >= rect.y &&
        pos[1] <= rect.y + rect.height;
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

    // SECTION: Draw

    draw() {
        this.ctx.save();
        if(this.#is_active)
        {
            if(this.#is_visible)
            {
                this.#set_position();

                this.ctx.globalAlpha = this.#alpha;
                this.ctx.fillStyle = this.#color;
                this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

                this.#restore_position();
                this.ctx.globalAlpha = 1;
            }
            this.ctx.restore();
        }
    }

    // SECTION: Events

    on_click(func)
    {
        click: onclick =  function(n1, n2, e) {
            var rect = this.ctx.canvas.getBoundingClientRect();
            var mousePos = [e.clientX - rect.left,
                e.clientY - rect.top];
            if(this.#isInsideButton(mousePos, this))
            {
                if (typeof func === 'function')
                    func();
                
                this.#c_res = true;
            }
            else
            {
                this.#c_res = false;
            }
        }.bind(this, this.#isInsideButton, func);

        return this.#c_res;
    }

    on_hover(func)
    {
        hover: onmousemove =  function(n1, n2, e) {
            var rect = this.ctx.canvas.getBoundingClientRect();
            var mousePos = [e.clientX - rect.left,
                e.clientY - rect.top];
            if(this.#isInsideButton(mousePos, this))
            {
                if (typeof func === 'function')
                    func();

                this.#h_res = true;
            }
            else
            {
                this.#h_res = false;
            }
        }.bind(this, this.#isInsideButton, func);

        return this.#h_res;

    }

}