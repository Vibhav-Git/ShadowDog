import Player from "../entities/Player.js";
import InputManager from "./InputManager.js";
import { GAME_BASE_SETUP } from "../utils/constants.js";
import BackgroundManager from "../entities/Background.js";
import EnemyManager from "../entities/Enemy.js";

export default class GameManager{
    constructor(assets, gameWidth, gameHeight){
        this.assets = assets;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.groundLevel = gameHeight + GAME_BASE_SETUP.GROUND_OFFSET;

        this.input = new InputManager();
        this.player = new Player(this.assets.getImage("player"));

        this.background = new BackgroundManager(        
            [this.assets.getImage("layer1"),
            this.assets.getImage("layer2"),
            this.assets.getImage("layer3"),
            this.assets.getImage("layer4"),
            this.assets.getImage("layer5")],
            this.groundLevel
        );

        this.enemyManager = new EnemyManager([this.assets.getImage("zombie")]);
    }

    setUp() {
        this.player.setUp(this.groundLevel);
        console.log(this.groundLevel);
    }

    update(deltaTime) {
        this.enemyManager.update(deltaTime);
        this.player.update(deltaTime, this.input);
        this.background.update(this.gameWidth,this.player.getSpeed(), deltaTime);
        
    }

    getRenderables() {
        return {
            gw : this.gameWidth,
            gh : this.gameHeight,
            backgroundLayers : this.background.getRenderables(),
            player : this.player.getRenderables(),
            enemy : this.enemyManager.getRenderables(),
        }
        console.log(this.enemyManager.getRenderables());
    }
}