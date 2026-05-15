export default class RenderingManager{
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0
    }

    render(game) {
        const player = game.player.getRenderingValues();

        this.ctx.clearRect(0, 0, game.gameWidth, game.gameHeight);
        this.ctx.drawImage(player.img, player.fx * player.w, player.fy * player.h, player.w, player.h, player.x, player.y, player.w, player.h);
    }
}