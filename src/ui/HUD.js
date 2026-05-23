export class HUD {
    constructor() {
        this.scoreBoardPosition = {
            x : 0,
            y : 0,
        };

        this.scoreMessage = "";
        this.font = "";


        this.livesImage = null;
        this.livesPosition = {
            x : 0,
            y : 0,
        };
    }

    setUp(gameWidth, image) {
        this.scoreBoardPosition = {
            x : 30,
            y : 60,
        };

        this.scoreMessage = "Score : ";
        this.font = "30px Helvetica";


        this.livesImage = image;
        this.livesPosition = {
            x : gameWidth - 100,
            y : 30,
        }
    }

    getRenderables() {
        return {
            sbPos : this.scoreBoardPosition,
            sbMsg : this.scoreMessage,
            ft : this.font,
            lvImg : this.livesImage,
            lvPos : this.livesPosition,
        }
    }
}