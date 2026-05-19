
export const ALL_EVENT_CODES = {
    // PLAYER EVENTS
    MOVE_UP :  101, 
    MOVE_DOWN : 201,
    MOVE_LEFT : 301,
    MOVE_RIGHT : 401,

    // GAME EVENTS
    PAUSE : 555,
}


export const KEYBOARD_INPUTS = {
    ArrowUp :  ALL_EVENT_CODES.MOVE_UP, 
    ArrowDown : ALL_EVENT_CODES.MOVE_DOWN,
    ArrowLeft : ALL_EVENT_CODES.MOVE_LEFT,
    ArrowRight : ALL_EVENT_CODES.MOVE_RIGHT,
    Escape : ALL_EVENT_CODES.PAUSE,
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

export const ENEMY_SETUP = {
    ZOMBIE : {
        SCALE_MULTIPLIER : 22,
        SPRITESHEET : {
            WIDTH : 2336,
            HEIGHT : 410,
            MAX_X_FRAMES : 8,
            MAX_Y_FRAMES : 1,
            FPS : 20,
            SCALE : 0.35,
        },
    },
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
    SPEED_UP_FACTOR : 3,
}