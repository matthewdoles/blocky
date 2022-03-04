import { ISelectableGamePiece } from './GamePiece.model';

export interface IActiveGamePiece {
  x: number;
  y: number;
  gamePiece: ISelectableGamePiece;
}
