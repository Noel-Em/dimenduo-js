export { Scene };

class Scene {
    constructor(background_color = "#000000", size="fullscreen", query="canvas")
    {
        this.color = background_color;
        let canvas = document.querySelector(query);
        let screen_size = this.#get_height_width(size);
        switch(screen_size)
        {
            case 'fullscreen':
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                break;
            case 'error':
                canvas.width = 0;
                canvas.height = 0;
                console.error("Dimenduo: The canvas value of `size` is not correct");
                break;
            default:
                canvas.width = screen_size[0];
                canvas.height = screen_size[1];
        }
        this.ctx = canvas.getContext("2d");
        this.ctx.save();
    }

    #get_height_width (size)
    {
        if(size == "fullscreen")
        {
            return "fullscreen";
        }
        else
        {
            if(size.includes("x")) {
                let values = size.split("x");

                return [parseInt(values[0]), parseInt(values[1])];
            }
            else {
                return "error";
            }
        }
    }

    draw()
    {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
    }
}