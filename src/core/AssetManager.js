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
        ]);
    }

    getImage(key) {
        return this.images[key];
    }
}