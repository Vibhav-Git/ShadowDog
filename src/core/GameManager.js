import InputManager from "./InputManager.js";

export default class GameManager{
    constructor(assets, gameWidth, gameHeight){
        this.assets = assets;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.input = new InputManager();
    }

    update(deltaTime) {
    }
}