export default class AssetManager {
    constructor() {
        this.images = {};
    }

    loadImage(key, src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener("load", () => {
                this.images[key] = img;
                resolve();
            })
            img.onerror = () => reject(new Error(`Failed to load image - ${src}`));
            img.src = src;
        });
    }

    async loadAll() {
        await Promise.all([
            this.loadImage("player", "../../assets/images/player.png"),
            this.loadImage("layer1", "../../assets/images/layer-1.png"),
            this.loadImage("layer2", "../../assets/images/layer-2.png"),
            this.loadImage("layer3", "../../assets/images/layer-3.png"),
            this.loadImage("layer4", "../../assets/images/layer-4.png"),
            this.loadImage("layer5", "../../assets/images/layer-5.png"),
            this.loadImage("zombie", "../../assets/images/enemy_zombie.png"),
        ]);
    }

    getImage(key) {
        return this.images[key];
    }
}