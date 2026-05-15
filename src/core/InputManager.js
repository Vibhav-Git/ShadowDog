import { KEYBOARD_INPUTS } from "../utils/constants.js";


export default class InputManager {
    constructor() {
        this.currentInputs = new Set();
        this.legalInputs = new Set([...Object.keys(KEYBOARD_INPUTS)]);


        window.addEventListener("keydown", (e) => {
            if(this.legalInputs.has(e.key)) 
                this.currentInputs.add(KEYBOARD_INPUTS[e.key]);

        });

        window.addEventListener("keyup", (e) => {
            if(this.legalInputs.has(e.key)) 
                this.currentInputs.delete(KEYBOARD_INPUTS[e.key]);
        });
    }


    hasCode(keycode) {
        return this.currentInputs.has(keycode);
    }
}

