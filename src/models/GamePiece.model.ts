export interface ISelectableGamePiece extends IGamePiece {
  id: number;
  isValid: boolean;
}

export interface IGamePiece {
  name: string;
  cols: number;
  rows: number;
  structure: SquareDetails[];
}

interface SquareDetails {
  isFilled: boolean;
  row: number;
  col: number;
}
