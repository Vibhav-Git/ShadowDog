export default class RenderingManager{
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0
    }

    render(game) {
        this.ctx.drawImage(game.assets.getImage("player"), 0, 0);
    }
}