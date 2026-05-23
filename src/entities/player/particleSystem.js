class Particle {
    constructor(playerX, playerY) {
        this.x = playerX;
        this.y = playerY;

        // this.timer = 0;
        // this.threshold = 1;
        this.markedForDeletion = false;
    }

    update() {
        // this.timer += deltaTime;

        // if(this.timer >= this.threshold){
        //     this.timer -= this.threshold;
        //     this.size -= 0.5;
        // }

        this.size += 0.1;

        if(this.size >= 10)
            this.markedForDeletion = true;
    }

    getRenderables() {
        return {
            x : this.x,
            y : this.y,
            size : this.size,
        }
    }
}



export class Dust extends Particle {
    constructor(playerX, playerY) {
        super(playerX, playerY);

        this.size = Math.random() * 5;
    }

    update() {
        super.update();
        this.x -= Math.random() * 10;
        this.y -= Math.random() * 2;
    }
}


export class Blaze extends Particle {
    constructor(playerX, playerY) {
        super(playerX, playerY);

        this.size = Math.random() * 5;
    }

    update() {
        super.update();
        this.x -= 0.01;
        this.y -= 0.05;
    }
}