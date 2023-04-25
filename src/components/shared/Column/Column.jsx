import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import Issue from "@components/shared/Issue/Issue.jsx";

function Column({ list }) {
  return (
    <Droppable droppableId="col-1">
      {(provided) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {list.map((item, index) => (
            <Issue key={item} text={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

Column.propTypes = {
  list: PropTypes.array.isRequired
};

export default Column;
