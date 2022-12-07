export { Sound };

class Sound {

    #mixer = null;

    constructor(path, mixer = null, id = "default")
    {
        this.path = path;
        this.id = id;
        this.audio = new Audio(path);
        this.#mixer = mixer;
    }

    set_mixer(mixer)
    {
        this.#mixer = mixer;
    }

    play()
    {
        if(this.#mixer != null)
            this.audio.volume = this.#mixer.exist(this.id) ? this.#mixer.get_volume(this.id) : this.#mixer.get_volume("default");

        this.audio.play();
    }

    stop()
    {
        this.audio.stop();
    }

}