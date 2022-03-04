import { IGameBoardPiece } from './GameBoardPiece.model';

export interface IGameState {
  addedPoints: number;
  gameBoard: IGameBoardPiece[];
  isOver: boolean;
  score: number;
}
