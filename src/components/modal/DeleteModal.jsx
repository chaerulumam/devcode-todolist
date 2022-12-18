import React from "react";
import Backdrop from "../button/Backdrop";
import Button from "../button/Button";

const DeleteModal = ({ onCloseModal, item, onDeleteItem, todo, show }) => {
  return (
    <>
      <div
        className={`modal modal-medium ${!show && "hide"}`}
        data-cy={`modal-delete`}
      >
        <div className="modal-body modal-center">
          <span className="danger-icon" data-cy="modal-delete-icon"></span>
          <h4 data-cy="modal-delete-title">
            Apakah anda yakin menghapus activity{" "}
            <span className="text-bold">“{item?.title}”?</span>
          </h4>
          <div className="btn-group">
            <Button
              color="secondary"
              onClick={onCloseModal}
              data-cy="modal-delete-cancel-button"
            >
              Batal
            </Button>
            <Button
              color="danger"
              onClick={() => onDeleteItem(item.id)}
              data-cy="modal-delete-confirm-button"
            >
              Hapus
            </Button>
          </div>
        </div>
      </div>
      {show && <Backdrop onClick={onCloseModal} />}
    </>
  );
};

export default DeleteModal;
