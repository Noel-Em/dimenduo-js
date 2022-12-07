export { Game };

class Game
{
    constructor()
    {
        this.times = [];
        this.fps = 0;
    }

    clear(context)
    {
        context.ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
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