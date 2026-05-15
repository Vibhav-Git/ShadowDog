import { GAME_BASE_SETUP } from "../utils/constants.js";

export default class Player {
    constructor(playerImage) {
        this.playerImage = playerImage;

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0

        this.frameCounter = 0;
        this.fps = 0;
        this.frameChangeThreshold = 0;


        this.states = [];
        this.currentState = this.states[0];
    }

    setUp(groundLevel) {
        this.x = GAME_BASE_SETUP.PLAYER_STARTING_X;
        this.y = groundLevel;
        this.width = GAME_BASE_SETUP.PLAYER_SPRITESHEET.WIDTH / GAME_BASE_SETUP.PLAYER_SPRITESHEET.MAX_X_FRAMES;
        this.height = GAME_BASE_SETUP.PLAYER_SPRITESHEET.HEIGHT / GAME_BASE_SETUP.PLAYER_SPRITESHEET.MAX_Y_FRAMES;
        this.fps = GAME_BASE_SETUP.PLAYER_SPRITESHEET.FPS;
        this.frameChangeThreshold = 1 / this.fps;

        // this.currentState.setState();
        this.maxFrames = 6       // remove later after implementing gamestates
    }

    update(deltaTime) {
        this.frameCounter += deltaTime;
        if(this.frameCounter >= this.frameChangeThreshold){
            this.frameCounter -= this.frameChangeThreshold;
            this.frameX < this.maxFrames ? this.frameX++ : this.frameX = 0;
        }  
    }

    getRenderingValues() {
        return {
            img : this.playerImage,
            x : this.x,
            y : this.y,
            w : this.width,
            h : this.height,
            fx : this.frameX,
            fy : this.frameY,
        }
    }
}