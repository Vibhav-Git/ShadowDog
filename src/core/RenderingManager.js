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
            renderables.player.fx * renderables.player.sw, 
            renderables.player.fy * renderables.player.sh, 
            renderables.player.sw, 
            renderables.player.sh, 
            renderables.player.x, 
            renderables.player.y, 
            renderables.player.w, 
            renderables.player.h
        );


        renderables.enemy.forEach(en => {

            if(en.type == "spider") {
                this.ctx.beginPath();
                this.ctx.moveTo(en.x + en.w / 2, 0);
                this.ctx.lineTo(en.x + en.w / 2, en.y + en.h/2);
                this.ctx.stroke();

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

            } else {
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
            }
            
        })



    }
}