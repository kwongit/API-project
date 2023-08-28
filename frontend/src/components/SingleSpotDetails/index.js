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
      <div className="city-state">
        {city}, {state}
      </div>
      <div className="star-rating">
        <span>Star Rating: </span>
        <span>{avgRating ? `${Number(avgRating).toFixed(1)}` : "New"}</span>
      </div>
      <div className="price-night">
        <span>${Number(price).toFixed(2)}</span>
        <span> night</span>
      </div>
    </div>
  );
};

export default SingleSpotDetails;
