import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetSpotInfo } from "../../store/spots";
import { thunkGetSpotReviews } from "../../store/reviews";
import { SpotReviews } from "../SpotReviews";
import "./SpotDetails.css";

export const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const oneSpot = useSelector((state) => state.spot.singleSpot);
  const reviews = useSelector((state) => state.review.spot);

  useEffect(() => {
    dispatch(thunkGetSpotInfo(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(thunkGetSpotReviews(spotId));
  }, [dispatch, spotId]);

  if (!oneSpot.id) return null;
  if (!reviews[spotId]) return null;

  const reviewsList = Object.values(reviews[spotId]).reverse();

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
  } = oneSpot;

  const mainImage = SpotImages.find((image) => image.preview) || SpotImages[0];
  const additionalImages = SpotImages.filter((image) => !image.preview);

  return (
    <div className="view-spot-details">
      <h1>{name}</h1>
      <h3>
        {city}, {state}, {country}
      </h3>

      <div className="spot-images">
        <img className="main-image" src={mainImage.url} alt="main" />
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

            {reviewsList.length ? (
              <span>
                <i className="fa-solid fa-star"></i>
                {Number(avgStarRating).toFixed(1)} · {numReviews}{" "}
                {numReviews > 1 ? "Reviews" : "Review"}
              </span>
            ) : (
              <span>
                <i className="fa-solid fa-star"></i>
                New
              </span>
            )}
          </div>

          <div className="reserve-button">
            <button onClick={() => alert("Feature Coming Soon...")}>
              Reserve
            </button>
          </div>
        </div>
      </div>

      <SpotReviews />
    </div>
  );
};
