export default class TimingManager {
    constructor(game, renderer) {
        this.game = game;
        this.renderer = renderer;
        this.lastTime = 0;
        this.running = false;
    }

    start() {
        if(this.running)    return;
        this.running = true;
        requestAnimationFrame(this.run);
    }

    run = (timestamp) => {
        if(!this.running)   return;

        if(!this.lastTime)  this.lastTime = timestamp;

        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.game.update(deltaTime);
        this.renderer.render(this.game);

        requestAnimationFrame(this.run);
    }


    stop() {
        this.running = false;
        this.lastTime = 0;
    }
}