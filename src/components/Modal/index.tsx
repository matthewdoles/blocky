import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const Modal = ({ children }: Props) => {
  return (
    <>
      <input type="checkbox" id="modal" className="modal-toggle" />
      <label htmlFor="modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-col mx-auto items-center">{children}</div>
          <div className="modal-action">
            <label htmlFor="modal" className="btn bg-rose-500 border-0 text-white font-bold">
              Close
            </label>
          </div>
        </label>
      </label>
    </>
  );
};

export default Modal;
