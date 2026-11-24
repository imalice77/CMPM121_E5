import type { Direction, Position } from "../core/mod.ts";
import type { Session } from "../core/mod.ts";
import type { BoardInput } from "./tileClicks.ts";
import type { Controller } from "./controllers.ts";

function directionBetween(
  player: Position,
  clicked: Position,
): Direction | undefined {
  const dx = clicked.x - player.x;
  const dy = clicked.y - player.y;

  if (dx === 0 && dy === -1) return "up";
  if (dx === 0 && dy === 1) return "down";
  if (dx === -1 && dy === 0) return "left";
  if (dx === 1 && dy === 0) return "right";

  return undefined;
}

export const clickToMove: Controller = {
  label: "Click a neighboring tile",

  attach(session: Session, board: BoardInput) {
    const stop = board.onTileClick((at) => {
      const player = session.getState().puzzle.player;
      const direction = directionBetween(player, at);

      if (direction) {
        session.dispatch({ kind: "move", direction });
      }
    });

    return stop;
  },
};
