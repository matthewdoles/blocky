import { IUser } from './User.model';

export interface ILobby {
  lobbyId: string;
  users: IUser[];
}
