import Joi from "joi";
import { ROOM_ID_LENGTH } from "../util";

export const roomIdSchema = Joi.string()
  .label("Room code")
  .pattern(/^[A-Z1-9]{4}$/)
  .length(ROOM_ID_LENGTH)
  .required();

export const playerIdSchema = Joi.string()
  .label("Player ID")
  .length(20)
  .required();

export const nameSchema = Joi.string()
  .label("Player name")
  .min(1)
  .max(20)
  .required();

export const voteSchema = Joi.number()
  .label("Vote")
  .integer()
  .min(0)
  .max(2)
  .required();

export const configurationSchema = Joi.object({
  maxPlayers: Joi.number()
    .label("Configuration > Max players")
    .integer()
    .min(2)
    .max(10)
    .required(),
  maxRounds: Joi.number()
    .label("Configuration > Max rounds")
    .integer()
    .min(1)
    .max(20)
    .required(),
  pointsVoteWinner: Joi.number()
    .label("Configuration > Points vote winner")
    .integer()
    .min(0)
    .max(20)
    .required(),
  pointsVoteLoser: Joi.number()
    .label("Configuration > Points vote loser")
    .integer()
    .min(0)
    .max(20)
    .required(),
  pointsLoser: Joi.number()
    .label("Configuration > Points loser")
    .integer()
    .min(0)
    .max(20)
    .required(),
  pointsWinner: Joi.number()
    .label("Configuration > Points winner")
    .integer()
    .min(0)
    .max(20)
    .required(),
  pointsAbstained: Joi.number()
    .label("Configuration > Points vote abstained")
    .integer()
    .min(0)
    .max(20)
    .required(),
  pointsVoteDraw: Joi.number()
    .label("Configuration > Points vote draw")
    .integer()
    .min(0)
    .max(20)
    .required(),
  pointsDraw: Joi.number()
    .label("Configuration > Points draw")
    .integer()
    .min(0)
    .max(20)
    .required(),
  pointsAbstainedDraw: Joi.number()
    .label("Configuration > Points abstained draw")
    .integer()
    .min(0)
    .max(20)
    .required(),
  pointsVoteAllAbstained: Joi.number()
    .label("Configuration > Points all vote abstained")
    .integer()
    .min(0)
    .max(20)
    .required(),
  pointsAllAbstained: Joi.number()
    .label("Configuration > Points abstained")
    .integer()
    .min(0)
    .max(20)
    .required(),
}).label("Room configuration");
