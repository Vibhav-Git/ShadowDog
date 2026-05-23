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
            
            if(renderables.debug) {
                this.ctx.strokeRect(en.x, en.y, en.w, en.h);
            }
        })



        if(renderables.debug) {
            this.ctx.strokeRect(renderables.player.x, renderables.player.y, renderables.player.w, renderables.player.h);
        }


        this.ctx.font = renderables.hud.ft; 
        this.ctx.fillText(renderables.hud.sbMsg + renderables.score, renderables.hud.sbPos.x, renderables.hud.sbPos.y)

        for(let i =0; i <  renderables.player.plv; i ++){
            this.ctx.drawImage(renderables.hud.lvImg, renderables.hud.lvPos.x - (35* i), renderables.hud.lvPos.y,  30, 30);
        }


        if(!renderables.player.alive) {
            this.ctx.save();
            const gameOverMessage = "Game Over!";
            const scoreMessage = `Your score is ${renderables.score}`;
            const restartMessage = `Refresh page to restart`;
            this.ctx.textAlign = "center";
            this.ctx.fillText(gameOverMessage, renderables.gw / 2, renderables.gh / 2 - 100);
            this.ctx.fillText(scoreMessage, renderables.gw / 2, renderables.gh / 2 - 50);
            this.ctx.fillText(restartMessage, renderables.gw / 2, renderables.gh / 2);  
            this.ctx.restore();
        }



        renderables.player.particles.forEach(part => {
            this.ctx.beginPath();
            this.ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
            this.ctx.stroke();
        })
    }
}