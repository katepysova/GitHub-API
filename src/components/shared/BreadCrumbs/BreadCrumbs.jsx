import PropTypes from "prop-types";
import icons from "@components/shared/Icon/icons.js";
import Icon from "@components/shared/Icon/Icon.jsx";
import "./BreadCrumbs.scss";

function BreadCrumbs({ items }) {
  return (
    <nav className="bread-crumbs">
      <ul className="bread-crumbs__list">
        <li className="bread-crumbs__item">
          <a className="bread-crumbs__link" href={items.owner.url} target="_blank" rel="noreferrer">
            {items.owner.name}
          </a>
        </li>
        <div className="bread-crumbs__arrow">
          <Icon symbol={icons.arrowRight} size={18} />
        </div>

        <li className="bread-crumbs__item">
          <a className="bread-crumbs__link" href={items.repo.url} target="_blank" rel="noreferrer">
            {items.repo.name}
          </a>
        </li>
      </ul>
      <div className="bread-crumbs__rating">
        <Icon symbol={icons.star} />
        <span className="bread-crumbs__rating-count">{items.stars} star(s)</span>
      </div>
    </nav>
  );
}

BreadCrumbs.propTypes = {
  items: PropTypes.object.isRequired
};

export default BreadCrumbs;
