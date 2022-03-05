import { IGameState } from './GameState.model';

export interface IUser {
  id: string;
  profileImage?: string;
  username: string;
  gameState: IGameState;
}
