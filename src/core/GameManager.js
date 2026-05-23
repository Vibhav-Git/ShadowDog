import Player from "../entities/Player.js";
import InputManager from "./InputManager.js";
import { GAME_BASE_SETUP, ALL_EVENT_CODES } from "../utils/constants.js";
import BackgroundManager from "../entities/Background.js";
import EnemyManager from "../entities/Enemy.js";
import {collisionManager} from "./CollisionManager.js";
import { HUD } from "../ui/HUD.js";

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
            this.assets.getImage("fly"),
        ]);

        this.hud = new HUD();

        this.debugMode = false;
        this.debugKeyPressed = false;

        this.score = 0;
        this.collided = false;
    }

    setUp() {
        this.player.setUp(this.groundLevel, this.canvasDimensionsObject.scalingFactor);
        this.hud.setUp(this.canvasDimensionsObject.width, this.assets.getImage("lives"));
    }

    update(deltaTime) {
        if(!this.player.alive) {
            return false;
        }
            

        this.groundLevel = this.canvasDimensionsObject.scalingFactor * GAME_BASE_SETUP.GROUND_OFFSET_MULTIPLIER;
        this.gameSpeed = this.player.getSpeed();
        
        this.player.update(deltaTime, this.input, this.groundLevel, this.canvasDimensionsObject.scalingFactor);
        this.background.update(this.canvasDimensionsObject.width, this.gameSpeed, deltaTime);
        this.enemyManager.update(deltaTime, this.groundLevel, this.canvasDimensionsObject.scalingFactor, this.gameSpeed, this.canvasDimensionsObject.width);
        
        if(this.input.hasCode(ALL_EVENT_CODES.DEBUG)) {
            if(!this.debugKeyPressed) {
                this.debugMode = !this.debugMode;
                this.debugKeyPressed = true;
            }
        } else {
            this.debugKeyPressed = false;
        }

        this.checkCollisions();

        
        return true;
    }

    checkCollisions () {
        this.collided = false;
        this.enemyManager.activeEnemies.forEach(en => {
             this.collided = collisionManager(this.player,en);
             if(this.collided) {
                en.markedForDeletion = true;
                this.score += this.player.legalHit();
             }
        });
    }

    getRenderables() {
        return {
            gw : this.canvasDimensionsObject.width,
            gh : this.canvasDimensionsObject.height,
            backgroundLayers : this.background.getRenderables(),
            player : this.player.getRenderables(),
            enemy : this.enemyManager.getRenderables(),
            debug : this.debugMode,
            hud : this.hud.getRenderables(),
            score : this.score,
        }
    }

}