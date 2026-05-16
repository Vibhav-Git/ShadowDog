import Player from "../entities/Player.js";
import InputManager from "./InputManager.js";
import { GAME_BASE_SETUP } from "../utils/constants.js";
import BackgroundManager from "../entities/Background.js";

export default class GameManager{
    constructor(assets, gameWidth, gameHeight){
        this.assets = assets;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.groundLevel = gameHeight + GAME_BASE_SETUP.GROUND_OFFSET;

        this.input = new InputManager();
        this.player = new Player(this.assets.getImage("player"));

        this.background = new BackgroundManager(        
            this.assets.getImage("layer1"),
            this.assets.getImage("layer2"),
            this.assets.getImage("layer3"),
            this.assets.getImage("layer4"),
            this.assets.getImage("layer5"),
        );
    }

    setUp() {
        this.player.setUp(this.groundLevel);
    }

    update(deltaTime) {
        

        this.player.update(deltaTime, this.input);
        this.background.update(this.gameWidth,this.player.getSpeed());
    }
}