export default class ScreenManager {
    constructor(canvasDimensionsObject) {
        this.canvasDimensionsObject = canvasDimensionsObject;
        this.baseUnit = 100;


        window.addEventListener("resize", () => {
            this.canvasDimensionsObject.width = window.innerWidth;
            this.canvasDimensionsObject.height = window.innerHeight;
            this.canvasDimensionsObject.scalingFactor = window.innerHeight / this.baseUnit;

        });
    }

    initialize() {
        this.canvasDimensionsObject.width = window.innerWidth;
        this.canvasDimensionsObject.height = window.innerHeight;
        this.canvasDimensionsObject.scalingFactor = window.innerHeight / this.baseUnit;
    }

}