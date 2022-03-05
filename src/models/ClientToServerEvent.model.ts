import { IGameBoardPiece } from './GameBoardPiece.model';
import { ILobby } from './Lobby.model';
import { IUser } from './User.model';

export interface IServerToClientEvents {
  userLeft: () => void;
  updateLobby: (lobby: ILobby) => void;
}

export interface IClientToServerEvents {
  joinLobby: (user: IUser, callback: (error: string) => void) => void;
  updateUserGameState: (
    data: {
      lobbyId: string;
      gameBoard: IGameBoardPiece[];
      addedPoints: number;
    },
    callback: (error: string) => void
  ) => void;
}
