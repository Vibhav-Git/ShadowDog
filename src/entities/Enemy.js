// import { collisionManager } from "../core/CollisionManager.js";
import { ENEMY_SETUP } from "../utils/constants.js";

export default class EnemyManager {
    constructor(enemyImages) {
        this.enemyList =[Zombie, Plant, Spider, Fly];
        this.activeEnemies = [];
        this.enemyImages = enemyImages;

        this.enemySpawnCounter = 0;
        this.enemySpawnThreshold = 2;       // 1 sec

        // this.enemiesKilled = 0;
        
    }

    update(deltaTime, groundLevel, scalingFactor, gameSpeed, gameWidth) {
        this.enemySpawnCounter += deltaTime;

        if(this.enemySpawnCounter >= this.enemySpawnThreshold) {
            this.enemySpawnCounter -= this.enemySpawnThreshold;
            this.spawnNewEnemy(groundLevel, scalingFactor, gameWidth);
        }

        this.activeEnemies.forEach(en => {
            en.update(deltaTime, groundLevel, scalingFactor, gameSpeed);
            
            // if(collisionManager(player, en)) {
            //     en.markedForDeletion = true;
            //     this.enemiesKilled ++;
            // }
        })

        this.activeEnemies = this.activeEnemies.filter(en => !en.markedForDeletion);
    }

    spawnNewEnemy(groundLevel, scalingFactor, gameWidth) {

        const randomSelector = Math.floor(Math.random() * this.enemyList.length);
        // const randomSelector = 3;
        const newEnemy = this.enemyList[randomSelector];
        const nextEnemy = new newEnemy(this.enemyImages[randomSelector])
        nextEnemy.setUp(groundLevel, scalingFactor, gameWidth);
        this.activeEnemies.push(nextEnemy);
        
    }

    getRenderables() {
        const enemiesRenderData = [];

        this.activeEnemies.forEach(en => {
            enemiesRenderData.push(en.getRenderables());
        })
        return enemiesRenderData;
    }

    getScore() {
        return this.enemiesKilled;
    }
}


class Enemy{
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xv = 0;
        this.yv = 0;
        this.type = "base";

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

        this.markedForDeletion = false;
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
            type : this.type,
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

        this.xv = -ENEMY_SETUP.ZOMBIE.BASE_SPEED;
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
        
        if(this.x < - this.width)
            this.markedForDeletion = true;
    }
}



class Plant extends Enemy {
    constructor(image) {
        super();
        this.image = image;
    }

    setUp(groundLevel, scalingFactor, gameWidth) {
        this.scaleMultiplier = ENEMY_SETUP.PLANT.SCALE_MULTIPLIER;
        this.scaleLastValue = scalingFactor;

        
        this.lastFrame = ENEMY_SETUP.PLANT.SPRITESHEET.MAX_X_FRAMES - 1;
        this.spriteWidth = (ENEMY_SETUP.PLANT.SPRITESHEET.WIDTH / ENEMY_SETUP.PLANT.SPRITESHEET.MAX_X_FRAMES);
        this.spriteHeight = (ENEMY_SETUP.PLANT.SPRITESHEET.HEIGHT / ENEMY_SETUP.PLANT.SPRITESHEET.MAX_Y_FRAMES);

        this.ratio = this.spriteWidth / this.spriteHeight;

        this.height = scalingFactor * this.scaleMultiplier;
        this.width = this.ratio * this.height;
        
        this.fps = ENEMY_SETUP.PLANT.SPRITESHEET.FPS;
        this.FrameThreshold = 1 / this.fps;

        this.xv = ENEMY_SETUP.PLANT.BASE_SPEED;
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
        
        if(this.x < - this.width)
            this.markedForDeletion = true;
    }
}



class Spider extends Enemy {
    constructor(image) {
        super();
        this.image = image;
    }

    setUp(groundLevel, scalingFactor, gameWidth) {
        this.scaleMultiplier = ENEMY_SETUP.SPIDER.SCALE_MULTIPLIER;
        this.scaleLastValue = scalingFactor;
        this.type = "spider";
        
        this.lastFrame = ENEMY_SETUP.SPIDER.SPRITESHEET.MAX_X_FRAMES - 1;
        this.spriteWidth = (ENEMY_SETUP.SPIDER.SPRITESHEET.WIDTH / ENEMY_SETUP.SPIDER.SPRITESHEET.MAX_X_FRAMES);
        this.spriteHeight = (ENEMY_SETUP.SPIDER.SPRITESHEET.HEIGHT / ENEMY_SETUP.SPIDER.SPRITESHEET.MAX_Y_FRAMES);

        this.ratio = this.spriteWidth / this.spriteHeight;

        this.height = scalingFactor * this.scaleMultiplier;
        this.width = this.ratio * this.height;
        
        this.fps = ENEMY_SETUP.SPIDER.SPRITESHEET.FPS;
        this.FrameThreshold = 1 / this.fps;

        this.xv = ENEMY_SETUP.SPIDER.BASE_SPEED;
        this.yv = ENEMY_SETUP.SPIDER.BASE_Y_SPEED;
        this.x = gameWidth;
        this.y = 200;
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
        this.y += this.yv * deltaTime;

        if(this.y > groundLevel - this.height) {
            this.yv *= -1;
        }
        if(this.y <= -this.height)
            this.markedForDeletion = true;
        
        if(this.x < - this.width)
            this.markedForDeletion = true;
    }
}



class Fly extends Enemy {
    constructor(image) {
        super();
        this.image = image;
    }

    setUp(groundLevel, scalingFactor, gameWidth) {
        this.scaleMultiplier = ENEMY_SETUP.FLY.SCALE_MULTIPLIER;
        this.scaleLastValue = scalingFactor;
        
        this.lastFrame = ENEMY_SETUP.FLY.SPRITESHEET.MAX_X_FRAMES - 1;
        this.spriteWidth = (ENEMY_SETUP.FLY.SPRITESHEET.WIDTH / ENEMY_SETUP.FLY.SPRITESHEET.MAX_X_FRAMES);
        this.spriteHeight = (ENEMY_SETUP.FLY.SPRITESHEET.HEIGHT / ENEMY_SETUP.FLY.SPRITESHEET.MAX_Y_FRAMES);

        this.ratio = this.spriteWidth / this.spriteHeight;

        this.height = scalingFactor * this.scaleMultiplier;
        this.width = this.ratio * this.height;
        
        this.fps = ENEMY_SETUP.FLY.SPRITESHEET.FPS;
        this.FrameThreshold = 1 / this.fps;

        this.xv = - ENEMY_SETUP.FLY.BASE_SPEED;
        this.yv = Math.floor(Math.random() * 3 - 1) * ENEMY_SETUP.FLY.BASE_Y_SPEED;
        this.x = gameWidth;
        this.y = 200;
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
        this.y += this.yv * deltaTime;

        if(this.y <= 0 )
            this.yv *= -1;
        else if(this.y > groundLevel - this.height)
            this.yv *= -1;
        
        if(this.x < - this.width)
            this.markedForDeletion = true;
    }
}