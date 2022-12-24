export { Scene };
import { Camera } from "../camera/camera.js";

class Scene {

    #meant_size = [];
    #screen_size = [];
    #sync = "none";
    #scene = null;

    #camera = null;

    constructor(background_color = "#000000", canvas_size="fullscreen", game_size = "1920x1080" ,sync="none" , query="canvas")
    {
        this.color = background_color;
        let canvas = document.querySelector(query);

        this.#screen_size = this.#get_size(canvas_size);
        this.#meant_size = this.#get_sync_size(game_size);

        this.#sync = sync;

        this.ctx = canvas.getContext("2d");
        this.#set_canvas_size();

    }

    set_camera(camera_object)
    {
        this.#camera = camera_object;
    }

    get_camera_coords()
    {
        if(this.#camera instanceof Camera)
            return [this.#camera.x, this.#camera.y];
        return [0,0];
    }

    get_ratio()
    {
        return [
            (this.get_sync().includes("width") ? (this.get_size()[0] / this.get_og_size()[0]) : 
            (this.get_sync().includes("height") ? (this.get_size()[1] / this.get_og_size()[1]) : 1)), 

            (this.get_sync().includes("height") ? (this.get_size()[1]) / this.get_og_size()[1] : 
            (this.get_sync().includes("width") ? (this.get_size()[0] / this.get_og_size()[0]) : 1 ))
        ];
    }

    #set_canvas_size()
    {
        switch(this.#screen_size)
        {
            case 'fullscreen':
                this.ctx.canvas.width = window.innerWidth;
                this.ctx.canvas.height = window.innerHeight;
                break;
            case 'error':
                this.ctx.canvas.width = 0;
                this.ctx.canvas.height = 0;
                console.error("Dimenduo: The canvas value of `size` is not correct");
                break;
            default:
                this.ctx.canvas.width = this.#screen_size[0];
                this.ctx.canvas.height = this.#screen_size[1];
        }
    }

    #get_sync_size(size)
    {
        if(!size.includes("x")) 
            return "error";

        let values = size.split("x");

        return [parseInt(values[0]), parseInt(values[1])];
    }

    #get_size (size)
    {
        if(size == "fullscreen")
            return "fullscreen";

        if(!size.includes("x")) 
            return "error";

        let values = size.split("x");

        return [parseInt(values[0]), parseInt(values[1])];
    }

    get_size()
    {
        return [this.ctx.canvas.width, this.ctx.canvas.height];
    }

    get_og_size()
    {
        return this.#meant_size;
    }

    get_sync()
    {
        if(this.#sync != "width-height" && this.#sync != "width" && this.#sync != "height" && this.#sync != "none")
        {
            console.error("Dimenduo: '" + this.#sync + "' is not a sync method");
            return "error";
        }

        return this.#sync;
    }

    draw()
    {
        this.#set_canvas_size();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0,0, window.innerWidth, window.innerHeight);
    }
}