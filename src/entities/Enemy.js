import { ENEMY_SETUP } from "../utils/constants.js";

export default class EnemyManager {
    constructor(enemyImages) {
        this.enemyList =[];
        this.activeEnemies = [];
        this.enemyImages = enemyImages;

        this.enemySpawnCounter = 0;
        this.enemySpawnThreshold = 2;       // 1 sec
        
    }

    update(deltaTime, groundLevel, scalingFactor, gameSpeed, gameWidth) {
        this.enemySpawnCounter += deltaTime;

        if(this.enemySpawnCounter >= this.enemySpawnThreshold) {
            this.enemySpawnCounter -= this.enemySpawnThreshold;
            this.spawnNewEnemy(groundLevel, scalingFactor, gameWidth);
        }

        this.enemyList.forEach(en => {
            en.update(deltaTime, groundLevel, scalingFactor, gameSpeed);
        })
    }

    spawnNewEnemy(groundLevel, scalingFactor, gameWidth) {
        const newEnemy = new Zombie(this.enemyImages[0]);
        
        newEnemy.setUp(groundLevel, scalingFactor, gameWidth);
        this.enemyList.push(newEnemy);
    }

    getRenderables() {
        const enemieRenderData = [];

        this.enemyList.forEach(en => {
            enemieRenderData.push(en.getRenderables());
        })
        return enemieRenderData;
    }
}


class Enemy{
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xv = 0;
        this.yv = 0;

        this.width = 0;
        this.height = 0;
        this.spriteWidth = 0;
        this.spriteHeight = 0;

        this.frameX = 0;
        this.frameY = 0;
        this.lastFrame = 0;

        this.frameTimer = 0;
        this.fps = 0;
        this.FrameThreshold = 1;        // 1 sec

        this.scaleMultiplier = 1;
        this.ratio = 1;
        this.scaleLastValue = 1;
    }

    getRenderables() {
         return {
            img : this.image,
            x : this.x,
            y : this.y,
            w : this.width,
            h : this.height,
            sw : this.spriteWidth,
            sh : this.spriteHeight,
            fx : this.frameX,
            fy : this.frameY,
        }
    }
}




// have to work on entire enemiesfile. refactor = groundlevel, scaling

class Zombie extends Enemy {
    constructor(image) {
        super();
        this.image = image;
    }

    setUp(groundLevel, scalingFactor, gameWidth) {
        this.scaleMultiplier = ENEMY_SETUP.ZOMBIE.SCALE_MULTIPLIER;
        this.scaleLastValue = scalingFactor;

        
        this.lastFrame = ENEMY_SETUP.ZOMBIE.SPRITESHEET.MAX_X_FRAMES - 1;
        this.spriteWidth = (ENEMY_SETUP.ZOMBIE.SPRITESHEET.WIDTH / ENEMY_SETUP.ZOMBIE.SPRITESHEET.MAX_X_FRAMES);
        this.spriteHeight = (ENEMY_SETUP.ZOMBIE.SPRITESHEET.HEIGHT / ENEMY_SETUP.ZOMBIE.SPRITESHEET.MAX_Y_FRAMES);

        this.ratio = this.spriteWidth / this.spriteHeight;

        this.height = scalingFactor * this.scaleMultiplier;
        this.width = this.ratio * this.height;
        
        this.fps = ENEMY_SETUP.ZOMBIE.SPRITESHEET.FPS;
        this.FrameThreshold = 1 / this.fps;

        this.xv = -300;
        this.x = gameWidth;
        this.y = groundLevel - this.height;
    }

     recalculateDimensions(scalingFactor) {
            this.height = scalingFactor * this.scaleMultiplier;
            this.width = this.ratio * this.height;
            this.scaleLastValue = scalingFactor;
        }

    update(deltaTime, groundLevel, scalingFactor, gameSpeed) {

        if(this.scaleLastValue !== scalingFactor) {
            this.groundLevel = groundLevel;
            this.recalculateDimensions(scalingFactor);
            this.y = groundLevel - this.height;
        }
        this.frameTimer += deltaTime;

        if(this.frameTimer >= this.FrameThreshold) {
            this.frameTimer -= this.FrameThreshold;
            this.frameX < this.lastFrame ? this.frameX++ : this.frameX = 0;
        }
    
        this.x += (this.xv - gameSpeed ) *  deltaTime;
            
    }
}