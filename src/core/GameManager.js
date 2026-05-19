import Player from "../entities/Player.js";
import InputManager from "./InputManager.js";
import { GAME_BASE_SETUP } from "../utils/constants.js";
import BackgroundManager from "../entities/Background.js";
import EnemyManager from "../entities/Enemy.js";

export default class GameManager{
    constructor(assets, canvasDimensionsObject){
        this.assets = assets;
        this.canvasDimensionsObject = canvasDimensionsObject;
        this.gameSpeed = 0;

        this.groundLevel = this.canvasDimensionsObject.scalingFactor * GAME_BASE_SETUP.GROUND_OFFSET_MULTIPLIER;

        this.input = new InputManager();
        this.player = new Player(this.assets.getImage("player"));

        this.background = new BackgroundManager(        
            [this.assets.getImage("layer1"),
            this.assets.getImage("layer2"),
            this.assets.getImage("layer3"),
            this.assets.getImage("layer4"),
            this.assets.getImage("layer5")]
        );

        this.enemyManager = new EnemyManager([
            this.assets.getImage("zombie"), 
            this.assets.getImage("plant"),
            this.assets.getImage("spider"),
        ]);
    }

    setUp() {
        this.player.setUp(this.groundLevel, this.canvasDimensionsObject.scalingFactor);
    }

    update(deltaTime) {
        this.groundLevel = this.canvasDimensionsObject.scalingFactor * GAME_BASE_SETUP.GROUND_OFFSET_MULTIPLIER;
        this.gameSpeed = this.player.getSpeed();
        
        this.player.update(deltaTime, this.input, this.groundLevel, this.canvasDimensionsObject.scalingFactor);
        this.background.update(this.canvasDimensionsObject.width, this.gameSpeed, deltaTime);
        this.enemyManager.update(deltaTime, this.groundLevel, this.canvasDimensionsObject.scalingFactor, this.gameSpeed, this.canvasDimensionsObject.width);
        
    }

    getRenderables() {
        return {
            gw : this.canvasDimensionsObject.width,
            gh : this.canvasDimensionsObject.height,
            backgroundLayers : this.background.getRenderables(),
            player : this.player.getRenderables(),
            enemy : this.enemyManager.getRenderables(),
        }
        // console.log(this.enemyManager.getRenderables());
    }
}