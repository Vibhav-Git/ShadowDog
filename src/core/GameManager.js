import Player from "../entities/Player.js";
import InputManager from "./InputManager.js";
import { GAME_BASE_SETUP } from "../utils/constants.js";

export default class GameManager{
    constructor(assets, gameWidth, gameHeight){
        this.assets = assets;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.groundLevel = gameHeight + GAME_BASE_SETUP.GROUND_OFFSET;

        this.input = new InputManager();
        this.player = new Player(this.assets.getImage("player"));
    }

    setUp() {
        this.player.setUp(this.groundLevel);
    }

    update(deltaTime) {
        this.player.update(deltaTime, this.input);
    }
}