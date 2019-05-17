
import { expect } from "chai";
import { Sabotage } from "../../src/cards/Sabotage";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { OrOptions } from "../../src/inputs/OrOptions";

describe("Sabotage", function () {
    it("Should play", function () {
        const card = new Sabotage();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        const action = card.play(player, game);
        player.titanium = 3;
        player.steel = 4;
        player.megaCredits = 7;
        action.options[0].cb(player);
        (action.options[1] as OrOptions).options[0].cb(3);
        expect(player.titanium).to.eq(0);
        (action.options[1] as OrOptions).options[1].cb(4);
        expect(player.steel).to.eq(0);
        (action.options[1] as OrOptions).options[2].cb(7);
        expect(player.megaCredits).to.eq(0);
    });
});