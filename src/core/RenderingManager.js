export default class RenderingManager{
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0
    }

    render(game) {

        
        const renderables = game.getRenderables();

        this.ctx.clearRect(0, 0, renderables.gw, renderables.gh);


        renderables.backgroundLayers.forEach(layer => {
            this.ctx.drawImage(
                layer.image, 
                layer.x, 0, 
                renderables.gw, 
                renderables.gh
            );

            this.ctx.drawImage(
                layer.image, 
                layer.x + renderables.gw, 
                0, 
                renderables.gw, 
                renderables.gh
            );
        });

        this.ctx.drawImage(
            renderables.player.img, 
            renderables.player.fx * renderables.player.w, 
            renderables.player.fy * renderables.player.h, 
            renderables.player.w, 
            renderables.player.h, 
            renderables.player.x, 
            renderables.player.y, 
            renderables.player.w, 
            renderables.player.h
        );


        // this.ctx.drawImage(
        //     renderables.enemy.img, 
        //     renderables.enemy.fx * renderables.enemy.w, 
        //     renderables.enemy.fy * renderables.enemy.h, 
        //     renderables.enemy.w, 
        //     renderables.enemy.h, 
        //     renderables.enemy.x, 
        //     renderables.enemy.y, 
        //     renderables.enemy.w, 
        //     renderables.enemy.h
        // );


        renderables.enemy.forEach(en => {
            this.ctx.drawImage(
                en.img,
                en.fx * en.sw,
                en.fy * en.sh,
                en.sw,
                en.sh,
                en.x,
                en.y,
                en.w,
                en.h,
            );
        })



    }
}