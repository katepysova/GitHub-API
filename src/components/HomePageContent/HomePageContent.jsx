import React, { useState } from "react";
import Column from "@components/shared/Column/Column.jsx";
import Search from "@components/shared/Search/Search.jsx";
import { DragDropContext } from "react-beautiful-dnd";

function HomePageContent() {
  const [columns, setColumns] = useState(null);

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination

    if (!destination) return;

    // Make sure we're actually moving the item
    if (source.droppableId === destination.droppableId && destination.index === source.index)
      return;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }));
      return null;
    }
  };

  const getIssues = async (event) => {
    event.preventDefault();

    /*
    const response = await API.get(`https://api.github.com/repos/facebook/react/issues?&state=all`);
    const issues = response.data;

    const closedIssues = issues.filter((i) => i.state === "closed");
    const openIssues = issues.filter((i) => i.state === "open" && !i.assignee);
    const progressIssues = openIssues.filter((i) => i.assignee);

    //console.log({ closedIssues }, { openIssues }, { progressIssues });

    setColumns(() => ({
      todo: { id: "todo", list: openIssues },
      done: { id: "done", list: closedIssues },
      progress: { id: "progress", list: progressIssues }
    }));

    setIssues(issues);
    */
  };

  //console.log(issues);

  return (
    <main className="main">
      <section className="home-page">
        <div className="container">
          <Search handleSubmit={getIssues} />
          <div className="grid">
            {columns && (
              <DragDropContext onDragEnd={onDragEnd}>
                <Column col={columns.todo} key={columns.todo.id} />
                <Column col={columns.progress} key={columns.progress.id} />
                <Column col={columns.done} key={columns.done.id} />
              </DragDropContext>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePageContent;
