import AssetManager from "./core/AssetManager.js";
import GameManager from "./core/GameManager.js";
import RenderingManager from "./core/RenderingManager.js";
import ScreenManager from "./core/ScreenManager.js";
import TimingManager from "./core/TimingManager.js";
import { GAME_BASE_SETUP } from "./utils/constants.js";


window.addEventListener("load", async () => {
    const canvas = document.querySelector("#gameCanvas");
    const ctx = canvas.getContext("2d");



    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const canvasDimensionsObject = {
        width : canvas.width,
        height : canvas.height,
        scalingFactor : 1,
    }

    const screen = new ScreenManager(canvasDimensionsObject);
    screen.initialize();



    const assets = new AssetManager();
    await assets.loadAll();

    const game = new GameManager(assets, canvasDimensionsObject);
    const renderer = new RenderingManager(ctx);
    const timer = new TimingManager(game, renderer);
    timer.start();
});