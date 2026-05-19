import { PLAYER_SETUP, PLAYER_STATES } from "../utils/constants.js";
import { Idle, Jump, Fall, Run, Dizzy, Sit, Roll, Bite, KO, GetHit } from "./player/PlayerStateMachine.js";

export default class Player {
    constructor(playerImage) {
        this.playerImage = playerImage;

        // position
        this.x = 0;
        this.y = 0;
        this.groundLevel = 0;
        this.xv = 0;
        this.xMaxSpeed = 0
        this.speedUpFactor = 0
        this.xDirection = 0;
        this.yv = 0;
        this.gravity = 2000;
        this.playerSpeed = 0;

        // movement Bounds
        this.xMovementBounds = {
            start : 0,
            end : 1,
        }

        //dimensions
        this.width = 0;
        this.height = 0;
        this.ratio = 1;
        this.scaleLastValue = 1;
        this.scaleMultiplier = 1;
        this.spriteWidth = 1;
        this.spriteHeight = 1;

        // animation
        this.frameX = 0;
        this.frameY = 0;
        this.lastFrame = 0
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
    }

    setUp(groundLevel, scalingFactor) {

        //spritesheet dimensions
        this.spriteWidth = PLAYER_SETUP.SPRITESHEET.WIDTH / PLAYER_SETUP.SPRITESHEET.MAX_X_FRAMES;
        this.spriteHeight = PLAYER_SETUP.SPRITESHEET.HEIGHT / PLAYER_SETUP.SPRITESHEET.MAX_Y_FRAMES;

        

        // movement Bounds
        this.xMovementBounds = {
            start : 0,
            end : scalingFactor * PLAYER_SETUP.MOVEMENT_BOUNDS_MULTIPLIER,
        }

        // to get initial ratio
        this.ratio = this.spriteWidth / this.spriteHeight;

        this.scaleMultiplier = PLAYER_SETUP.SCALE_MULTIPLIER;

        // setting height and width as per scalingFactor and ratio
        this.height = scalingFactor * this.scaleMultiplier;
        this.width = this.ratio * this.height;

        


        // position
        this.x = PLAYER_SETUP.BASE_X;
        this.groundLevel = groundLevel;
        this.y = groundLevel - this.height;
        this.xMaxSpeed = PLAYER_SETUP.MAX_SPEED;
        this.speedUpFactor = PLAYER_SETUP.SPEED_UP_FACTOR;
        

        this.fps = PLAYER_SETUP.SPRITESHEET.FPS;
        this.frameChangeThreshold = 1 / this.fps;
        this.changeState(PLAYER_SETUP.BASE_STATE);
    }

    recalculateDimensions(scalingFactor) {
        this.height = scalingFactor * this.scaleMultiplier;
        this.width = this.ratio * this.height;
        this.xMovementBounds = {
            start : 0,
            end : scalingFactor * PLAYER_SETUP.MOVEMENT_BOUNDS_MULTIPLIER,
        };
        this.scaleLastValue = scalingFactor;
    }

    update(deltaTime, input, groundLevel, scalingFactor) {
        // rescale
        if(this.scaleLastValue !== scalingFactor) {
            this.groundLevel = groundLevel;
            this.recalculateDimensions(scalingFactor);
            this.y = groundLevel - this.height;
        }

        // calculate position
        this.x += this.xv * deltaTime;
        this.yv += this.gravity * deltaTime;
        this.y += this.yv * deltaTime;

        // y reset
        if(this.y >= this.groundLevel - this.height) {
            this.y = this.groundLevel - this.height;
            this.yv = 0;
        }

        // x reset
        if(this.x > this.xMovementBounds.end) {
            this.x = this.xMovementBounds.end;
            
            if(this.xv > 0)
                this.playerSpeed = this.xv;
            else 
                this.playerSpeed = 0;
        } else if(this.x < this.xMovementBounds.start) {
            this.x = this.xMovementBounds.start;
            this.playerSpeed = 0;
        } else {
            this.playerSpeed = 0;
        }


        // frame changer
        this.frameCounter += deltaTime;
        if(this.frameCounter >= this.frameChangeThreshold){
            this.frameCounter -= this.frameChangeThreshold;
            this.frameX < this.lastFrame ? this.frameX++ : this.frameX = 0;
        } 
        
        // update state
        this.currentState.handleInputs(input);
    }

    getRenderables() {
        return {
            img : this.playerImage,
            x : this.x,
            y : this.y,
            w : this.width,
            h : this.height,
            fx : this.frameX,
            fy : this.frameY,
            sw : this.spriteWidth,
            sh : this.spriteHeight,
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

