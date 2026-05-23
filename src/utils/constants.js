
export const ALL_EVENT_CODES = {
    // PLAYER EVENTS
    MOVE_UP :  101, 
    MOVE_DOWN : 201,
    MOVE_LEFT : 301,
    MOVE_RIGHT : 401,

    // GAME EVENTS
    PAUSE : 555,
    DEBUG : 666,
}


export const KEYBOARD_INPUTS = {
    ArrowUp :  ALL_EVENT_CODES.MOVE_UP, 
    ArrowDown : ALL_EVENT_CODES.MOVE_DOWN,
    ArrowLeft : ALL_EVENT_CODES.MOVE_LEFT,
    ArrowRight : ALL_EVENT_CODES.MOVE_RIGHT,
    Escape : ALL_EVENT_CODES.PAUSE,
    d : ALL_EVENT_CODES.DEBUG,
}

export const PLAYER_STATES = {
    IDLE : 0,
    JUMP : 1,
    FALL : 2,
    RUN : 3,
    DIZZY : 4,
    SIT : 5,
    ROLL : 6,
    BITE : 7,
    KO : 8,
    GET_HIT : 9,
}


export const GAME_BASE_SETUP = {
    GROUND_OFFSET_MULTIPLIER : 84,
}


export const PLAYER_SETUP = {
    BASE_X : 0,
    BASE_STATE : PLAYER_STATES.IDLE,
    SCALE_MULTIPLIER : 15,
    SPRITESHEET : {
        WIDTH : 1204,
        HEIGHT : 913,
        MAX_X_FRAMES : 12,
        MAX_Y_FRAMES : 10,
        FPS : 20,
    },
    MOVEMENT_BOUNDS_MULTIPLIER : 40,
    MAX_SPEED : 300,
    SPEED_UP_FACTOR : 2.5,    
}



export const ENEMY_SETUP = {
    ZOMBIE : {
        SCALE_MULTIPLIER : 22,
        BASE_SPEED : 35,
        SPRITESHEET : {
            WIDTH : 2336,
            HEIGHT : 410,
            MAX_X_FRAMES : 8,
            MAX_Y_FRAMES : 1,
            FPS : 5,
        },
    },

    PLANT : {
        SCALE_MULTIPLIER : 9,
        BASE_SPEED : 0,
        SPRITESHEET : {
            WIDTH : 120,
            HEIGHT : 87,
            MAX_X_FRAMES : 2,
            MAX_Y_FRAMES : 1,
            FPS : 8,
        },
    },

    SPIDER : {
        SCALE_MULTIPLIER : 25,
        BASE_SPEED : 0,
        BASE_Y_SPEED : 100,
        SPRITESHEET : {
            WIDTH : 720,
            HEIGHT : 144,
            MAX_X_FRAMES : 6,
            MAX_Y_FRAMES : 1,
            FPS : 8,
        },
    },


    FLY : {
        SCALE_MULTIPLIER : 10,
        BASE_SPEED : 150,
        BASE_Y_SPEED : 100,
        SPRITESHEET : {
            WIDTH : 360,
            HEIGHT : 44,
            MAX_X_FRAMES : 6,
            MAX_Y_FRAMES : 1,
            FPS : 20,
        },
    },
}