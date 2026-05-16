import { GAME_BASE_SETUP } from "../utils/constants.js";
import { Idle, Jump, Fall, Run, Dizzy, Sit, Roll, Bite, KO, GetHit } from "./player/PlayerStateMachine.js";

export default class Player {
    constructor(playerImage) {
        this.playerImage = playerImage;

        this.x = 0;
        this.y = 0;
        this.groundLevel = 0;
        this.xv = 0;
        this.xDirection = 0;
        this.yv = 0;
        this.width = 0;
        this.height = 0;
        this.gravity = 2000;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrames = 0
        this.frameCounter = 0;
        this.fps = 0;
        this.frameChangeThreshold = 0;

        this.states = [
            new Idle(this), 
            new Jump(this), 
            new Fall(this),
            new Run(this),
            new Dizzy(this),
            new Sit(this),
            new Roll(this),
            new Bite(this),
            new KO(this),
            new GetHit(this),
        ];
        this.currentState = 0;


        this.playerSpeed = 0;
    }

    setUp(groundLevel) {
        this.x = GAME_BASE_SETUP.PLAYER_STARTING_X;
        this.y = groundLevel;
        this.groundLevel = groundLevel;
        this.width = GAME_BASE_SETUP.PLAYER_SPRITESHEET.WIDTH / GAME_BASE_SETUP.PLAYER_SPRITESHEET.MAX_X_FRAMES;
        this.height = GAME_BASE_SETUP.PLAYER_SPRITESHEET.HEIGHT / GAME_BASE_SETUP.PLAYER_SPRITESHEET.MAX_Y_FRAMES;
        this.fps = GAME_BASE_SETUP.PLAYER_SPRITESHEET.FPS;
        this.frameChangeThreshold = 1 / this.fps;
        this.changeState(GAME_BASE_SETUP.PLAYER_STARTING_STATE);
    }

    update(deltaTime, input) {
        this.x += this.xv * deltaTime;
        this.yv += this.gravity * deltaTime;
        this.y += this.yv * deltaTime;

        this.playerSpeed = this.xv * deltaTime;

        if(this.y >= this.groundLevel) {
            this.y = this.groundLevel;
            this.yv = 0;
        }

        if(this.x <= 0) {
            this.x = 0
        } else if(this.x + this.width >= GAME_BASE_SETUP.GAMEWIDTH) {
            this.x = GAME_BASE_SETUP.GAMEWIDTH - this.width;
        }

        this.frameCounter += deltaTime;
        if(this.frameCounter >= this.frameChangeThreshold){
            this.frameCounter -= this.frameChangeThreshold;
            this.frameX < this.maxFrames ? this.frameX++ : this.frameX = 0;
        }  
        this.currentState.handleInputs(input);
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


    changeState(newState) {
        this.currentState = this.states[newState];
        this.currentState.setState();
        this.frameX = 0;
    }


    getSpeed() {
        return this.playerSpeed;
    }
}

