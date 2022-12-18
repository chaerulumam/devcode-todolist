import React from "react";
import Backdrop from "../button/Backdrop";

const SuccessModal = ({ setShowAlert, show }) => {
  return (
    <>
      <div className={`modal modal-medium ${!show && "hide"}`} data-cy="modal-information">
        <div className="modal-span">
          <span className="info-icon" data-cy="modal-information-icon"></span>
          <p data-cy="modal-information-title">Activity Berhasil dihapus!</p>
        </div>
      </div>
      {show && <Backdrop onClick={() => setShowAlert(false)} />}
    </>
  );
};

export default SuccessModal;
