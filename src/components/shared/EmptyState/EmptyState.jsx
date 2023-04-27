import PropTypes from "prop-types";
import icons from "@components/shared/Icon/icons.js";
import Icon from "@components/shared/Icon/Icon.jsx";
import "./EmptyState.scss";

function EmptyState({ message = "No issues found!" }) {
  return (
    <div className="empty-state">
      <p className="empty-state__message">
        <Icon symbol={icons.notFound} />
        <span>{message}</span>
      </p>
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string
};

export default EmptyState;
