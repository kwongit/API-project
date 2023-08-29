import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetSpotInfo } from "../../store/spots";
import "./SingleSpotInfo.css";

export const SingleSpotInfo = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const singleSpot = useSelector((state) => state.spot.singleSpot);

  useEffect(() => {
    dispatch(thunkGetSpotInfo(spotId));
  }, [dispatch, spotId]);

  if (!singleSpot.id) return null;

  const {
    Owner,
    SpotImages,
    avgStarRating,
    city,
    country,
    description,
    name,
    numReviews,
    price,
    state,
  } = singleSpot;

  const mainImage = SpotImages.find((image) => image.preview) || SpotImages[0];
  const additionalImages = SpotImages.filter((image) => !image.preview);

  return (
    <div className="view-spot-details">
      <h1>{name}</h1>
      <h3>
        {city}, {state}, {country}
      </h3>
      <div className="spot-images">
        {/* <div className="main-image-conatiner"> */}
        <img className="main-image" src={mainImage.url} alt="main" />
        {/* </div> */}
        <div className="additional-images-container">
          {additionalImages.map((spot) => (
            <img
              className="additional-images"
              src={spot.url}
              key={spot.id}
              alt="additional"
            />
          ))}
        </div>
      </div>
      <div className="host-description-reserve-container">
        <div className="host-description">
          <h3>
            Hosted by {Owner.firstName} {Owner.lastName}
          </h3>
          <p>{description}</p>
        </div>
        <div className="reserve-container">
          <div className="price-stars-reviews-container">
            <h4>${Number(price).toFixed(2)} night</h4>
            <span>
              <i className="fa-solid fa-star"></i>
              {Number(avgStarRating).toFixed(1)} · {numReviews}{" "}
              {numReviews > 1 ? "reviews" : "review"}
            </span>
          </div>
          <div className="reserve-button">
            <button onClick={() => alert("Feature Coming Soon...")}>
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
