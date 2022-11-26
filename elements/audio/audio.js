export { Sound };

class Sound {

    constructor(path)
    {
        this.path = path;
        this.audio = new Audio(path);
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