import { memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/format-date";

const ActivityCard = memo(({ detail, onOpenModal, idx, setCardItemIndex }) => {
  const delBtnRef = useRef();
  const navigate = useNavigate();

  const navigateToDetail = (e) => {
    if (e.target !== delBtnRef.current) navigate("/detail/" + detail.id);
  };
  return (
    <div
      className="activity-card"
      data-cy="activity-item"
      onClick={(e) => navigateToDetail(e)}
    >
      <div className="activity-body">
        <h4 className="activity-title" data-cy="activity-item-title">
          {detail.title}
        </h4>
      </div>
      <div className="card-footer">
        <p data-cy="activity-item-date">{formatDate(detail.created_at)}</p>
        <span
          data-cy="activity-item-delete-button"
          className="trash-icon"
          onClick={() => {
            onOpenModal();
            setCardItemIndex(idx);
          }}
          ref={delBtnRef}
        ></span>
      </div>
    </div>
  );
});

export default ActivityCard;
