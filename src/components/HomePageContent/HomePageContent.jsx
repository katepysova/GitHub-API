import React from "react";
import Column from "@components/shared/Column/Column.jsx";
import { DragDropContext } from "react-beautiful-dnd";

function HomePageContent() {
  const list = ["Item 1", "Item 2", "Item 3"];

  const onDragEnd = () => null;

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
