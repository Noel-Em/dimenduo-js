export { Text };

class Text {

    #font_size = "25px";
    #font_family = "";

    constructor(text, font_color, x, y, align = "center", scene)
    {
        this.text = text;
        this.font_color = font_color;
        this.x = x;
        this.y = y;
        this.align = align;
        this.ctx = scene.ctx;
    }

    set_size(value)
    {
        if(typeof value === 'string')
        {
            this.#font_size = value;
        }
        else
        {
            if(!isNaN(value))
            {
                this.#font_size = String(value) + "px";
            }
            else
            {
                console.error("Dimenduo: Text 'font size' is not a string nor a number");
            }
        }
    }

    set_font_family(name, path)
    {
        var font = new FontFace(name, "url(" + path + ")");
        document.fonts.add(font);
        this.#font_family = font;
    }

    draw()
    {
        this.ctx.font = this.#font_size + " " + String(this.#font_family.family);
        this.ctx.textAlign = this.align;
        this.ctx.fillStyle = this.font_color;
        this.ctx.fillText(this.text, this.x, this.y);
    }
}