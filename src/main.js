import AssetManager from "./core/AssetManager.js";
import GameManager from "./core/GameManager.js";
import RenderingManager from "./core/RenderingManager.js";
import TimingManager from "./core/TimingManager.js";
import { GAME_BASE_SETUP } from "./utils/constants.js";


window.addEventListener("load", async () => {
    const canvas = document.querySelector("#gameCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = GAME_BASE_SETUP.GAMEWIDTH;
    canvas.height = GAME_BASE_SETUP.GAMEHEIGHT;


    const assets = new AssetManager();
    await assets.loadAll();

    const game = new GameManager(assets, GAME_BASE_SETUP.GAMEWIDTH, GAME_BASE_SETUP.GAMEHEIGHT);
    const renderer = new RenderingManager(ctx);
    const timer = new TimingManager(game, renderer);
    timer.start();
});