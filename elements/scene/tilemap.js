export { Tilemap };
import { Sprite } from '../ui_elements/sprite.js';

class Tilemap {

    #is_active = true;

    #sprite_path = {};
    #internal_tiles = [];

    constructor(grid_size = "64x64", scene)
    {
        let split_val = grid_size.split("x");
        this.grid_size = [ parseInt(split_val[0]), parseInt(split_val[1]) ];
        this.ctx = scene;
    }

    load_tile(name = null, path = null)
    {
        if (name == null || path == null)
            console.error("Dimnduo: Tile 'name' or 'path' has not been defined");
        else
            this.#sprite_path[name] = path;
    }

    set_map(tiles_coords = [])
    {
        this.#internal_tiles = tiles_coords;
    }

    // SECTION: Draw

    draw()
    {
        if(this.#is_active)
        {
            for(let i = 0; i < this.#internal_tiles.length; i++)
            {
                let tile = new Sprite(this.grid_size[0] * this.#internal_tiles[i][0], this.grid_size[1] * this.#internal_tiles[i][1], this.grid_size[0], this.grid_size[1],
                    this.#sprite_path[this.#internal_tiles[i][2]], this.ctx);
                tile.draw();
            }
        }
    }

}