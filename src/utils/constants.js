
const ALL_EVENT_CODES = {
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

const PLAYER_STATES = {
    IDLE : 0,
    JUMP : 1,
    FALL : 2,
    RUN : 3,
}

export const GAME_BASE_SETUP = {
    GROUND_OFFSET : -200,
    PLAYER_STARTING_X : 200,
    PLAYER_STARTING_STATE : PLAYER_STATES.IDLE,
    PLAYER_SPRITESHEET : {
        WIDTH : 1204,
        HEIGHT : 913,
        MAX_X_FRAMES : 12,
        MAX_Y_FRAMES : 10,
        FPS : 20,
    }
}