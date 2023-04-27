import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import cn from "classnames";
import Issue from "@components/shared/Issue/Issue.jsx";

import "./Column.scss";

function Column({ col }) {
  return (
    <Droppable droppableId={col.id}>
      {(provided) => (
        <div className="column">
          <h2 className="column__title">{col.id}</h2>
          <div
            className={cn("column__list", `column__list--${col.id}`)}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {col.list.map((item, index) => (
              <Issue key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

Column.propTypes = {
  col: PropTypes.object.isRequired
};

export default Column;
