import Player from "../entities/Player.js";
import InputManager from "./InputManager.js";

export default class GameManager{
    constructor(assets, gameWidth, gameHeight){
        this.assets = assets;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.input = new InputManager();
        this.player = new Player(this.assets.getImage("player"));
        this.player.setUp();
    }

    update(deltaTime) {
        this.player.update();
    }
}