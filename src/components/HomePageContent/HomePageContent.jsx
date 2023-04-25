import React, { useState } from "react";
import Column from "@components/shared/Column/Column.jsx";
import { DragDropContext } from "react-beautiful-dnd";

function HomePageContent() {
  const [list, setList] = useState(["Item 1", "Item 2", "Item 3"]);

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (!destination) return;

    // Make sure we're actually moving the item
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Move the item within the list
    // Start by making a new list without the dragged item
    const newList = list.filter((_, idx) => idx !== source.index);

    // Then insert the item at the right location
    newList.splice(destination.index, 0, list[source.index]);

    // Update the list
    setList(newList);
  };

  return (
    <main className="main">
      <section className="home-page">
        <div className="container">
          <DragDropContext onDragEnd={onDragEnd}>
            <Column list={list} />
          </DragDropContext>
        </div>
      </section>
    </main>
  );
}

export default HomePageContent;
