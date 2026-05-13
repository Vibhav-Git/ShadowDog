export default class GameManager{
    constructor(assets, gameWidth, gameHeight){
        this.assets = assets;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    update(deltaTime) {
        console.log(deltaTime);
    }
}