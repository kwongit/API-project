import { useHistory } from "react-router";
import "./SingleSpotDetails.css";

const SingleSpotDetails = ({ spot }) => {
  // destructure attributes from spot
  const { id, name, previewImage, city, state, avgRating, price } = spot;

  const displayImage = previewImage ? previewImage : null;

  const history = useHistory();

  const handleClick = () => {
    history.push(`/spots/${spot.id}`);
  };

  return (
    <div className="all-spots-container" key={id} onClick={handleClick}>
      <div id="spot-detail">
        <div className="name-container">
          <span className="spot-name-tooltip">{name}</span>
          <img
            className="preview-image"
            src={displayImage}
            alt={name}
            title={name}
          ></img>
        </div>
      </div>
      <div className="location-rating">
        <div className="city-state">
          {city}, {state}
        </div>
        <div className="star-rating">
          <i className="fa-solid fa-star"></i>
          <span className="rating">
            {avgRating ? `${Number(avgRating).toFixed(1)}` : "New"}
          </span>
        </div>
      </div>
      <div className="price-night">
        <span className="spot-price">${Number(price).toFixed(2)}</span>
        <span> night</span>
      </div>
    </div>
  );
};

export default SingleSpotDetails;
