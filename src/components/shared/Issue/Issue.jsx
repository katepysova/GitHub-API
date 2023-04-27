import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import "./Issue.scss";

const getDaysDiff = (value) => {
  const date = new Date(value);
  const currentDate = new Date();
  const diff = currentDate.getTime() - date.getTime();
  const days = Math.ceil(diff / (1000 * 3600 * 24));

  if (days > 0) {
    return `opened ${days} day(s) ago`;
  }
  return "opened today";
};

function Issue({ item, index }) {
  return (
    <Draggable draggableId={item.node_id} index={index}>
      {(provided) => (
        <div
          className="issue"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="issue__title">{item.title || "-"}</h3>
          <p className="issue__info">
            <span>{item.id}</span>
            <span>{getDaysDiff(item.created_at)}</span>
          </p>
          <p className="issue__info">
            <span>{item.user?.login}</span>
            <span className="separator"></span>
            <span> Comments: {item.comments} </span>
          </p>
        </div>
      )}
    </Draggable>
  );
}

Issue.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default Issue;
