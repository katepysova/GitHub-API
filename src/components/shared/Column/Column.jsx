import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import Issue from "@components/shared/Issue/Issue.jsx";

function Column({ col }) {
  return (
    <Droppable droppableId={col.id}>
      {(provided) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div>
            <h2>{col.id}</h2>
            {col.list.map((item, index) => (
              <Issue key={item} text={item} index={index} />
            ))}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

Column.propTypes = {
  col: PropTypes.object.isRequired
};

export default Column;
