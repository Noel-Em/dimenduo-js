export { Input };

class Input {
    constructor(type="keypress", key="", run_function)
    {
        this.type = type;
        this.key = key;
        this.run_function = run_function;
    }

    getInput()
    {
        switch(this.type)
        {
            case "keypress":
                keyPressed: addEventListener("keypress", function(e) {
                    if(e.key == this.key)
                    {
                        this.run_function();
                    }
                }.bind(this));
                break;
            case "keydown":
                keyDown: addEventListener("keydown", function(e) {
                    if(e.key == this.key)
                    {
                        this.run_function();
                    }
                }.bind(this));
                break;
            case "keyup":
                keyUp: addEventListener("keyup", function(e) {
                    if(e.key == this.key)
                    {
                        this.run_function();
                    }
                }.bind(this));
                break;
            default:
                console.error("There is no type `" + this.type + "` in the list");
        }
    }
}