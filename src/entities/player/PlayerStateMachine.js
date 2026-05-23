import { ALL_EVENT_CODES, PLAYER_SETUP, PLAYER_STATES } from "../../utils/constants.js";

class PlayerState {
    constructor(state, player) {
        this.state = state;
        this.player = player;
    }

    currentState() {
        console.log(this.state);
    }

    setDirection(newDirection) {
        this.player.xDirection = newDirection;
    }

    setSpeed(speedMultiplier = 1) {
        this.player.xv = this.player.xDirection * this.player.xMaxSpeed * speedMultiplier;
    }

}


export class Idle extends PlayerState {
    constructor(player) {
        super("IDLE", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.IDLE;
        this.player.lastFrame = 6;
        this.player.xv = 0;
        this.player.yv = 0;
        this.currentState();
    }

    // sustain() {

    // }

    handleInputs(input) {
        
        if(input.hasCode(ALL_EVENT_CODES.MOVE_RIGHT)) {
            super.setDirection(1);
            this.player.changeState(PLAYER_STATES.RUN);
        } else if(input.hasCode(ALL_EVENT_CODES.MOVE_LEFT)) {
            super.setDirection(-1);
            this.player.changeState(PLAYER_STATES.RUN);
        } else if(input.hasCode(ALL_EVENT_CODES.MOVE_UP))
            this.player.changeState(PLAYER_STATES.JUMP);
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_DOWN))
            this.player.changeState(PLAYER_STATES.SIT);

    }
}

export class Jump extends PlayerState {
    constructor(player) {
        super("JUMP", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.JUMP;
        this.player.lastFrame = 6;
        this.player.yv = -1400;
        this.currentState();
    }

    handleInputs(input) {

        if(this.player.yv >= 0)
            this.player.changeState(PLAYER_STATES.FALL);
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_DOWN)) 
            this.player.changeState(PLAYER_STATES.ROLL);
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_LEFT)) {
            super.setDirection(-1);
            super.setSpeed();
        }
             
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_RIGHT)){
            super.setDirection(1);
            super.setSpeed();
        }
            
    }
}

export class Fall extends PlayerState {
    constructor(player) {
        super("FALL", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.FALL;
        this.player.lastFrame = 6;
        this.currentState();
    }

    handleInputs(input) {
        if(this.player.y >= this.player.groundLevel - this.player.height)
            this.player.changeState(PLAYER_STATES.IDLE);
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_DOWN)) 
            this.player.changeState(PLAYER_STATES.ROLL);
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_LEFT)){
            super.setDirection(-1);
            super.setSpeed();
        }
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_RIGHT)){
            super.setDirection(1);
            super.setSpeed();
        }
    }
}

export class Run extends PlayerState {
    constructor(player) {
        super("RUN", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.RUN;
        this.player.lastFrame = 8;
        super.setSpeed();   // may later change to gamespeed
        this.currentState();
    }

    handleInputs(input) {
    
        if(input.hasCode(ALL_EVENT_CODES.MOVE_RIGHT)) {
            super.setDirection(1);
            super.setSpeed();

        } else if(input.hasCode(ALL_EVENT_CODES.MOVE_LEFT)) {
            super.setDirection(-1);
            super.setSpeed();
        } else {
            this.player.changeState(PLAYER_STATES.IDLE);
        }
        if(input.hasCode(ALL_EVENT_CODES.MOVE_UP))
            this.player.changeState(PLAYER_STATES.JUMP);

    }
}


export class Dizzy extends PlayerState {
    constructor(player) {
        super("DIZZY", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.DIZZY;
        this.player.lastFrame = 10;
        this.player.xv = 0;
        this.player.yv = 0;
        this.currentState();
    }

    handleInputs(input) {
        if(this.player.frameX >= this.player.lastFrame) {
            this.player.changeState(PLAYER_STATES.IDLE)
        }
    }
}

export class Sit extends PlayerState {
    constructor(player) {
        super("SIT", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.SIT;
        this.player.lastFrame = 4;
        this.player.xv = 0;
        this.player.yv = 0;
        this.currentState();
    }

    handleInputs(input) {
        if(!input.hasCode(ALL_EVENT_CODES.MOVE_DOWN))
            this.player.changeState(PLAYER_STATES.IDLE);
            
    }
}

export class Roll extends PlayerState {
    constructor(player) {
        super("ROLL", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.ROLL;
        this.player.lastFrame = 6;
        // this.player.xv = 0;
        // this.player.yv = 1200;
        this.currentState();
    }


    handleInputs(input) {
        if(this.player.y >= this.player.groundLevel - this.player.height)
            this.player.changeState(PLAYER_STATES.IDLE);
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_LEFT)){
            super.setDirection(-1);
            super.setSpeed(this.player.speedUpFactor);
        }
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_RIGHT)){
            super.setDirection(1);
            super.setSpeed(this.player.speedUpFactor);
        }

    }
}

export class Bite extends PlayerState {
    constructor(player) {
        super("BITE", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.BITE;
        this.player.lastFrame = 6;
        this.currentState();
    }

    handleInputs(input) {
        // will implement later
    }
}

export class KO extends PlayerState {
    constructor(player) {
        super("KO", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.KO;
        this.player.lastFrame = 11;
        this.player.xv = 200;
        this.yv = 0;
        this.currentState();
    }

    handleInputs(input) {
        if(this.player.frameX >= this.player.lastFrame){
            this.player.xv = 0;
            this.player.alive = false;
        }
    }
}


export class GetHit extends PlayerState {
    constructor(player) {
        super("GET_HIT", player);
    }

    setState() {
        this.player.frameY = PLAYER_STATES.GET_HIT;
        this.player.lastFrame = 3;
        this.player.xv = 0;
        this.player.yv = 0;
        this.currentState();
    }

    handleInputs(input) {
        if(this.player.frameX >= this.player.lastFrame) {
            if(this.player.playerLives >= 1)
                this.player.changeState(PLAYER_STATES.DIZZY);
            else
                this.player.changeState(PLAYER_STATES.KO);
        }
            
    }
}