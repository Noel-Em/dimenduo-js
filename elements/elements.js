export { Button, Text };

class Text {
    constructor(text, font_size, font_name, font_color, x, y, align = "center", scene)
    {
        this.text = text;
        this.font_size = font_size;
        this.font_name = font_name;
        this.font_color = font_color;
        this.x = x;
        this.y = y;
        this.align = align;
        this.ctx = scene.ctx;
    }

    draw()
    {
        this.ctx.font = this.font_size + " " + this.font_name;
        this.ctx.textAlign = this.align;
        this.ctx.fillStyle = this.font_color;
        this.ctx.fillText(this.text, this.x, this.y);
    }
}

class Button {
    constructor(x,y,width,height, scene)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = scene.ctx;
    }

    click(func)
    {
        this.ctx.addEventListener('click', function(e) {
            var mousePos = getMousePos(this.ctx, e);
        }).bind(this);
    }
}