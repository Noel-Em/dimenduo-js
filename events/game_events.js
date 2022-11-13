export { Game, Input };

class Game
{
    constructor()
    {
        this.times = [];
        this.fps = 0;
    }

    clear(context)
    {
        context.clearRect(0,0,window.innerWidth, window.innerHeight);
    }

    on_start(starting_function)
    {
        document.addEventListener('DOMContentLoaded', starting_function);
    }

    on_update(update_function)
    {
        document.addEventListener('DOMContentLoaded', function() {
            update_function();
        });
    }

    loop(game_loop_function)
    {
        
        requestAnimationFrame(game_loop_function);
    }

    count_fps()
    {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
        }
        this.times.push(now);
        this.fps = this.times.length;

        return this.fps;
    }
}

class Input {
    constructor(type="keypress", key="", run_function)
    {
        this.type = type;
        this.key = key;
        this.run_function = run_function;
    }

    getInput()
    {
        if(this.type == "keypress")
        {
            keyPressed: addEventListener("keypress", function(e) {
                var self = this;
                if(e.key == self.key)
                {
                    self.run_function();
                }
            }.bind(this));
        }
        else if(this.type == "keydown")
        {
            keyDown: addEventListener("keydown", function(e) {
                console.log("running");
                var self = this;
                if(e.key == self.key)
                {
                    self.run_function();
                }
            }.bind(this));
        }
        else if(this.type == "keyup")
        {
            keyUp: addEventListener("keyup", function(e) {
                var self = this;
                if(e.key == self.key)
                {
                    self.run_function();
                }
            }.bind(this));
        }
        else
        {
            console.error("There is no type `" + this.type + "` in the list");
        }
    }
}