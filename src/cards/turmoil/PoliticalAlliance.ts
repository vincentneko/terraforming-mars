import { IProjectCard } from "../IProjectCard";
import { CardName } from "../../CardName";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { PartyHooks } from "../../turmoil/parties/PartyHooks";
import { PartyName } from "../../turmoil/parties/PartyName";
import { REDS_RULING_POLICY_COST } from "../../constants";

export class PoliticalAlliance implements IProjectCard {
    public cost = 4;
    public tags = [];
    public name = CardName.POLITICAL_ALLIANCE;
    public cardType = CardType.EVENT;

    public canPlay(player: Player, game: Game): boolean {
        if (game.turmoil !== undefined) {
            const parties = game.turmoil.parties.filter(party => party.partyLeader === player.id);
            const meetsPartyLeaderRequirements = parties.length > 1;

            if (PartyHooks.shouldApplyPolicy(game, PartyName.REDS)) {
                return player.canAfford(player.getCardCost(game, this) + REDS_RULING_POLICY_COST) && meetsPartyLeaderRequirements;
            }
            return meetsPartyLeaderRequirements;
        }
        return false;
    }

    public play(player: Player, game: Game) {
        player.increaseTerraformRating(game);
        return undefined;
    }
}
