import ActivityCard from "./ActivityCard";

const ActivityItem = ({ activities, onOpenModal, setCardItemIndex }) => {
  return (
    <div className="activity-wrapper container">
      {activities.map((activity, idx) => {
        return (
          <ActivityCard
            key={activity.id}
            detail={activity}
            onOpenModal={onOpenModal}
            setCardItemIndex={setCardItemIndex}
            idx={idx}
          />
        );
      })}
    </div>
  );
};

export default ActivityItem;
