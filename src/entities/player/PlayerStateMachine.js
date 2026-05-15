import { ALL_EVENT_CODES, PLAYER_STATES } from "../../utils/constants.js";

class PlayerState {
    constructor(state) {
        this.state = state;
    }

    currentState() {
        console.log(this.state);
    }
}

// Working on the following state

export class Idle extends PlayerState {
    constructor(player) {
        super("IDLE");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.IDLE;
        this.player.maxFrames = 6;
        this.player.xv = 0;
        this.player.yv = 0;
        this.currentState();
    }

    handleInputs(input) {
        if(input.hasCode(ALL_EVENT_CODES.MOVE_RIGHT)) {
            this.player.xDirection = 1;
            this.player.changeState(PLAYER_STATES.RUN);
        } else if(input.hasCode(ALL_EVENT_CODES.MOVE_LEFT)) {
            this.player.xDirection = -1;
            this.player.changeState(PLAYER_STATES.RUN);
        } else if(input.hasCode(ALL_EVENT_CODES.MOVE_UP))
            this.player.changeState(PLAYER_STATES.JUMP);
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_DOWN))
            this.player.changeState(PLAYER_STATES.SIT);

    }
}

export class Jump extends PlayerState {
    constructor(player) {
        super("JUMP");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.JUMP;
        this.player.maxFrames = 6;
        this.player.yv = -1200;
        this.currentState();
    }

    handleInputs(input) {
        if(this.player.yv> 0)
            this.player.changeState(PLAYER_STATES.FALL);
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_DOWN)) 
            this.player.changeState(PLAYER_STATES.ROLL);
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_LEFT))
            this.player.xv = -300; 
        else if(input.hasCode(ALL_EVENT_CODES.MOVE_RIGHT))
            this.player.xv = 300;
            
    }
}

export class Fall extends PlayerState {
    constructor(player) {
        super("FALL");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.FALL;
        this.player.maxFrames = 6;
        this.currentState();
    }

    handleInputs(input) {
        if(this.player.y >= this.player.groundLevel)
            this.player.changeState(PLAYER_STATES.IDLE);
        if(input.hasCode(ALL_EVENT_CODES.MOVE_DOWN)) 
            this.player.changeState(PLAYER_STATES.ROLL);
        if(input.hasCode(ALL_EVENT_CODES.MOVE_LEFT))
            this.player.xv = -300; 
        if(input.hasCode(ALL_EVENT_CODES.MOVE_RIGHT))
            this.player.xv = 300;
    }
}

export class Run extends PlayerState {
    constructor(player) {
        super("RUN");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.RUN;
        this.player.maxFrames = 8;
        this.player.xv = 300 * this.player.xDirection;   // may later change to gamespeed
        // this.player.yv = 0;
        this.currentState();
    }

    handleInputs(input) {
    
        if(input.hasCode(ALL_EVENT_CODES.MOVE_RIGHT)) {
            this.player.xDirection = 1;
            this.player.xv = 300 * this.player.xDirection;

        } else if(input.hasCode(ALL_EVENT_CODES.MOVE_LEFT)) {
            this.player.xDirection = -1;
            this.player.xv = 300 * this.player.xDirection;
        } else {
            this.player.changeState(PLAYER_STATES.IDLE);
        }
        if(input.hasCode(ALL_EVENT_CODES.MOVE_UP))
            this.player.changeState(PLAYER_STATES.JUMP);

    }
}


export class Dizzy extends PlayerState {
    constructor(player) {
        super("DIZZY");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.DIZZY;
        this.player.maxFrames = 10;
        this.currentState();
    }

    handleInputs(input) {
        // will implement later
    }
}

export class Sit extends PlayerState {
    constructor(player) {
        super("SIT");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.SIT;
        this.player.maxFrames = 4;
        this.currentState();
    }

    handleInputs(input) {
        if(!input.hasCode(ALL_EVENT_CODES.MOVE_DOWN))
            this.player.changeState(PLAYER_STATES.IDLE);
        
    }
}

export class Roll extends PlayerState {
    constructor(player) {
        super("ROLL");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.ROLL;
        this.player.maxFrames = 6;
        this.currentState();
    }

    handleInputs(input) {
        if(this.player.y >= this.player.groundLevel)
            this.player.changeState(PLAYER_STATES.IDLE);
    }
}

export class Bite extends PlayerState {
    constructor(player) {
        super("Bite");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.BITE;
        this.player.maxFrames = 6;
        this.currentState();
    }

    handleInputs(input) {
        // will implement later
    }
}

export class KO extends PlayerState {
    constructor(player) {
        super("KO");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.KO;
        this.player.maxFrames = 11;
        this.currentState();
    }

    handleInputs(input) {
        // will implement later
    }
}


export class GetHit extends PlayerState {
    constructor(player) {
        super("GET_HIT");
        this.player = player;
    }

    setState() {
        this.player.frameY = PLAYER_STATES.GET_HIT;
        this.player.maxFrames = 3;
        this.currentState();
    }

    handleInputs(input) {
        // will implement later
    }
}