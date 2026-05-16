import AssetManager from "./core/AssetManager.js";
import GameManager from "./core/GameManager.js";
import RenderingManager from "./core/RenderingManager.js";
import TimingManager from "./core/TimingManager.js";
import { GAME_BASE_SETUP } from "./utils/constants.js";


window.addEventListener("load", async () => {
    const canvas = document.querySelector("#gameCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const assets = new AssetManager();
    await assets.loadAll();

    const game = new GameManager(assets, canvas.width, canvas.height);
    const renderer = new RenderingManager(ctx);
    const timer = new TimingManager(game, renderer);
    timer.start();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game.gameWidth = window.innerWidth;
        game.gameHeight = window.innerHeight;
        game.groundLevel = game.gameHeight + GAME_BASE_SETUP.GROUND_OFFSET;
    })
});