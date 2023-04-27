import React, { useState } from "react";
import Column from "@components/shared/Column/Column.jsx";
import API from "@common/api.js";
import Search from "@components/shared/Search/Search.jsx";
import { DragDropContext } from "react-beautiful-dnd";
import Loader from "@components/shared/Loader/Loader.jsx";
import EmptyState from "@components/shared/EmptyState/EmptyState.jsx";
import BreadCrumbs from "@components/shared/BreadCrumbs/BreadCrumbs.jsx";

import "./HomePageContent.scss";

const generateGetIssuesUrl = (owner, repo) =>
  `https://api.github.com/repos/${owner}/${repo}/issues?&state=all`;

const generateGetStarsUrl = (owner, repo) =>
  `https://api.github.com/repos/${owner}/${repo}/stargazers`;

const generateOwnerUrl = (owner) => `https://github.com/${owner}`;

const generateRepoUrl = (owner, repo) => {
  return `${generateOwnerUrl(owner)}/${repo}`;
};

function HomePageContent() {
  const [columns, setColumns] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [breadCrumbsData, setBreadCrumbsData] = useState(null);

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

  const getIssues = async (values, actions) => {
    try {
      setColumns(null);
      setIsLoading(true);
      setBreadCrumbsData(null);

      const urlArr = values.search.split("/").slice(3);
      const [owner, repo] = urlArr;

      const starsResponse = await API.get(generateGetStarsUrl(owner, repo));
      const stars = starsResponse.data?.length || 0;

      setBreadCrumbsData((state) => ({
        ...state,
        stars: stars,
        owner: {
          name: owner,
          url: generateOwnerUrl(owner)
        },
        repo: {
          name: repo,
          url: generateRepoUrl(owner, repo)
        }
      }));

      const issuesResponse = await API.get(generateGetIssuesUrl(owner, repo));
      const issues = issuesResponse.data;

      if (issues && issues.length > 0) {
        const closedIssues = issues.filter((i) => i.state === "closed");
        const openIssues = issues.filter((i) => i.state === "open" && !i.assignee);
        const progressIssues = issues.filter((i) => i.state === "open" && i.assignee);

        setColumns(() => ({
          todo: { id: "todo", list: openIssues },
          done: { id: "done", list: closedIssues },
          progress: { id: "progress", list: progressIssues }
        }));
      }
    } catch (error) {
      if (error.response) {
        setBreadCrumbsData(null);
        actions.setErrors({ search: error.response.data.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main">
      <section className="home-page">
        <div className="home-page__container container">
          <div className="home-page__header">
            <h1 className="heading-primary">GitHub API</h1>
            <p className="paragraph">
              <span className="hint">Hint:</span> enter a repo URL in the search field below and
              press the button. Search example:&nbsp;
              <code className="code">https://github.com/facebook/react</code>.
            </p>
            <div className="home-page__actions">
              <Search handleSubmit={getIssues} placeholder="Enter repo URL..." />
              {breadCrumbsData && <BreadCrumbs items={breadCrumbsData} />}
            </div>
          </div>

          {!columns && isLoading && (
            <div className="home-page__loader">
              <Loader />
            </div>
          )}
          {!columns && !isLoading && <EmptyState />}
          {columns && (
            <div className="home-page__grid">
              <DragDropContext onDragEnd={onDragEnd}>
                <Column col={columns.todo} key={columns.todo.id} />
                <Column col={columns.progress} key={columns.progress.id} />
                <Column col={columns.done} key={columns.done.id} />
              </DragDropContext>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default HomePageContent;
