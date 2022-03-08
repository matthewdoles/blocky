import React, { useState } from 'react';

type Props = {
  error: string;
  joinLobby: (username: string, profilePicture: string) => void;
};

const MultiplayerForm = ({ error, joinLobby }: Props) => {
  const [username, setUsername] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');

  return (
    <>
      <input type="checkbox" id="multiplayer-modal" className="modal-toggle" />
      <label htmlFor="multiplayer-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-col mx-auto items-center">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              className="w-11/12 py-2 my-4 bg-zinc-800 outline-0 border-b-2 border-secondary font-bold text-white"
            />
            <input
              type="text"
              placeholder="Profile Picture (optional)"
              value={profilePicture}
              onChange={(event) => setProfilePicture(event.currentTarget.value)}
              className="w-11/12 py-2 my-4 bg-zinc-800 outline-0 border-b-2 border-secondary font-bold text-white"
            />
            <div className="w-full pl-4">
              <p className="text-left font-bold text-sm">
                &bull; this action will end your current game.
              </p>
            </div>
          </div>
          {error.length > 0 && (
            <p className="my-2 text-center text-rose-500 font-bold text-lg">{error}</p>
          )}
          <div className="modal-action">
            <label
              htmlFor="multiplayer-modal"
              className="btn bg-rose-500 border-0 text-white font-bold">
              Cancel
            </label>
            <label
              className="btn btn-secondary border-0 text-white font-bold"
              onClick={() => joinLobby(username, profilePicture)}>
              Search
            </label>
          </div>
        </label>
      </label>
    </>
  );
};

export default MultiplayerForm;
