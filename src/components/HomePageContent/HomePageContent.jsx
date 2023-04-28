import React, { useEffect, useState } from "react";
import Column from "@components/shared/Column/Column.jsx";
import API from "@common/api.js";
import Search from "@components/shared/Search/Search.jsx";
import { DragDropContext } from "react-beautiful-dnd";
import Loader from "@components/shared/Loader/Loader.jsx";
import EmptyState from "@components/shared/EmptyState/EmptyState.jsx";
import BreadCrumbs from "@components/shared/BreadCrumbs/BreadCrumbs.jsx";
import LocalStorage from "@common/localStorage.js";
import { ISSUES_LS_KEY } from "@constants/constants.js";

import urlHelpers from "./urlHelpers.js"; // minutes

import "./HomePageContent.scss";

const ISSUES_EXP_TIME = 15;

const setExpirationTime = (minutes = ISSUES_EXP_TIME) => {
  const currentTime = new Date();
  return currentTime.getTime() + minutes * 60 * 1000;
};

function HomePageContent() {
  const [columns, setColumns] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [breadCrumbsData, setBreadCrumbsData] = useState(null);
  const [url, setUrl] = useState(null);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    if (source.droppableId === destination.droppableId && destination.index === source.index)
      return;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = start.list.filter((_, idx) => idx !== source.index);

      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList
      };

      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
    } else {
      const newStartList = start.list.filter((_, idx) => idx !== source.index);
      const newStartCol = {
        id: start.id,
        list: newStartList
      };

      const newEndList = end.list;

      newEndList.splice(destination.index, 0, start.list[source.index]);

      const newEndCol = {
        id: end.id,
        list: newEndList
      };

      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }));
    }
  };

  useEffect(() => {
    if (columns || breadCrumbsData) {
      const issues = LocalStorage.getItem(ISSUES_LS_KEY) || {};
      LocalStorage.setItem(ISSUES_LS_KEY, {
        ...issues,
        [url]: { columns, breadCrumbsData, expTime: setExpirationTime() }
      });
    }
  }, [columns, breadCrumbsData]);

  const getIssues = async (values, actions) => {
    try {
      setColumns(null);
      setIsLoading(true);
      setBreadCrumbsData(null);

      const url = values.search;
      setUrl(url);
      const urlArr = url.split("/").slice(3);
      const [owner, repo] = urlArr;

      const issuesFromLS = LocalStorage.getItem(ISSUES_LS_KEY) || {};
      const currentIssueFromLS = issuesFromLS[url] || null;

      if (currentIssueFromLS) {
        setBreadCrumbsData(currentIssueFromLS.breadCrumbsData);
        setColumns(currentIssueFromLS.columns);
        return;
      }

      const issuesResponse = await API.get(urlHelpers.generateGetIssuesUrl(owner, repo));
      const issues = issuesResponse.data;

      const starsResponse = await API.get(urlHelpers.generateGetStarsUrl(owner, repo));
      const stars = starsResponse.data?.length || 0;

      setBreadCrumbsData((state) => ({
        ...state,
        stars: stars,
        owner: {
          name: owner,
          url: urlHelpers.generateOwnerUrl(owner)
        },
        repo: {
          name: repo,
          url: urlHelpers.generateRepoUrl(owner, repo)
        }
      }));

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
        setUrl(null);
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
