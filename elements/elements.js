export { Scene, Rect, Sprite, Button, Text, Audio };

class Scene {
    constructor(sky_color = "#000000", query="canvas", size="fullscreen")
    {
        this.color = sky_color;
        let canvas = document.querySelector(query);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.ctx = canvas.getContext("2d");
    }

    draw()
    {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
    }
}

class Rect {

    constructor(x, y, width, height, is_visible, is_active = true, filled = true, line_thickness = 0, color = "#000000", alpha_color = 1 , scene)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.is_visible = is_visible;
        this.is_active = is_active;
        this.filled = filled;
        this.line_thickness = line_thickness;
        this.color = color;
        this.alpha_color = alpha_color;
        this.ctx = scene.ctx;
    }

    draw()
    {
        if(this.is_active)
        {
            if(this.is_visible == false)
            {
                this.ctx.globalAlpha = 0;
                this.ctx.fillStyle = "transparent";
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                this.ctx.globalAlpha = 1;
            }
            else
            {
                if(this.filled)
                {
                    this.ctx.globalAlpha = this.alpha_color;
                    this.ctx.fillStyle = this.color;
                    this.ctx.fillRect(this.x, this.y, this.width, this.height);
                    this.ctx.globalAlpha = 1;
                }
                else
                {
                    this.ctx.globalAlpha = this.alpha_color;
                    this.rectStyle = this.color;
                    this.ctx.lineWidth = this.line_thickness;
                    this.ctx.strokeRect(this.x,this.y,this.width,this.height);
                    this.ctx.globalAlpha = 1;
                }
            }
        }
    }

    check_collision(element_collision)
    {
        if(element_collision.x < this.x + this.width &&
            element_collision.x + element_collision.width > this.x &&
            element_collision.y < this.y + this.height &&
            element_collision.height + element_collision.y > this.y)
        {
            return true;
        }
    }
}

class Sprite {
    constructor(x, y, width, height, path, scene)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.path = path;
        this.ctx = scene.ctx;
    }

    draw()
    {
        const img = new Image(this.width,this.height);
        img.src = this.path;
        this.ctx.drawImage(img, this.x, this.y);
    }
}

class Audio {
    constructor(path)
    {
        this.path = path;
        this.audio = new Audio(this.path);
    }

    play()
    {
        this.audio.play();
    }

    stop()
    {
        this.audio.stop();
    }
}

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