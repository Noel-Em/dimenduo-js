# Dimenduo.js

![Dimenduo Header Image](https://dimenduo.leonardoulino.com/img/dm-logo1.png)

Developed by [Leonardo Ulino, NoelEm](https://leonardoulino.com)

Experimental Version 0.2.1
Latest Version 0.1.5 -> Documentation (Not available yet)

Dimenduo.js is a 2D javascript framework to facilitate the creation of games.

# Dimenduo 0.1.5 Features

* Scene Management:
    Scenes, Tilemaps.

* Audio Management:
    Audio, Mixer.

* Simple geometric shapes: 
    Squares, Rectangles, Rhombuses, Circles.

* Graphic content: 
    Text, Sprites

* Events:
    Input, Collisions, On Start, On Update.

If there are bugs of any kind, please report them in the 'issues' section of github.

# Startup Example


Start by creating a new `.html` file

``` html

<!DOCTYPE html>
<html>
<head>
    <title>Dimenduo.js Example</title>
</head>
<body>

    <canvas></canvas>

    <script type="module" src="./dimenduo.js"></script>
    <script type="module" src="./index.js"></script>
</body>
</html>

```

Then create the `index.js` file

``` js
import { Dimenduo } from "./dimenduo.js";

var events = Dimenduo.events;
var elements = Dimenduo.elements;
var audio = Dimenduo.audio;

var main = new events.Game();
var scene = new elements.Scene("#000000", "fullscreen"); // color (hex or literal e.g. "black"), canvas size (fullscreen or literal e.g. "1920x1080")


// on_start is called when the canvas is loaded 
main.on_start(function() {
    
    // Your code goes here

});

main.on_update(function loop() {

    main.clear(scene);

    // Your code goes here

    main.loop(loop);

});
```

