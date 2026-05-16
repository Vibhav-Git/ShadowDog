class Background {
    constructor(backgroundImage, speedfactor) {
        this.image = backgroundImage;
        this.speedfactor = speedfactor;
        this.x = 0;
        this.speed = 0;
    }

    moveLayer(gameWidth, gameSpeed) {
        this.speed = gameSpeed;

        this.x -= this.speed * this.speedfactor;

        if(this.x < -gameWidth) {
            this.x += gameWidth;
        }
    }
}





export default class BackgroundManager{
    constructor(layer1, layer2, layer3, layer4, layer5) {
        this.layers = [
            new Background(layer1, 0.2),
            new Background(layer2, 0.4),
            new Background(layer3, 0.6),
            new Background(layer4, 0.8),
            new Background(layer5, 1),
        ]
    }

    update(gameWidth, gameSpeed) {
        this.layers.forEach(layer => {
            layer.moveLayer(gameWidth, gameSpeed);
        })
    }
}

