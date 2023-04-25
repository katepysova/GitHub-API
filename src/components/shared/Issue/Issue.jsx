import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

function Issue({ text, index }) {
  return (
    <Draggable draggableId={text} index={index} key={text}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {text}
        </div>
      )}
    </Draggable>
  );
}

Issue.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default Issue;
