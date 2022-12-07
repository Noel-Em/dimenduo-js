/*
*   @author     Leonardo Ulino
*   @copyright  2022 Leonardo Ulino
*   @license    {@link https://opensource.org/licenses/MIT|MIT License}
*/

import { default as elements } from "./elements/elements_index.js";
import { default as audio } from "./elements/audio_index.js";
import { default as events } from "./events/index.js";

var Dimenduo = {
    elements: elements,
    audio: audio,
    events: events
};

export { Dimenduo };