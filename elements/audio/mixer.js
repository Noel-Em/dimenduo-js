export { Mixer };

class Mixer {

    #audio_ids = {"default" : 1}

    constructor()
    {
        
    }

    add(id, value = 1.0)
    {
        this.#audio_ids[id] = value;
    }

    set_value(id, value = 1.0)
    {
        if (id in this.#audio_ids) 
            this.#audio_ids[id] = value; 
        console.error("Dimenduo: There is no value named '" + id + "' in the mixer");
    }

    get_volume(id)
    {
        if (id in this.#audio_ids) 
            return this.#audio_ids[id]; 
        console.error("Dimenduo: There is no value named '" + id + "' in the mixer");
    }

    exist(id)
    {
        if (id in this.#audio_ids)
            return true;
        return false;
    }

}