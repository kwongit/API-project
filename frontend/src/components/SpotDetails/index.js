import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetSpotInfo } from "../../store/spots";
import { thunkGetSpotReviews } from "../../store/reviews";
import { SpotReviews } from "../SpotReviews";
import "./SpotDetails.css";

// OVERALL FLOW: view > dispatch > thunk action creator > reducer > subscriber > react setters > view

export const SpotDetails = () => {
  // initialize to allow dispatch actions to redux store
  const dispatch = useDispatch();

  // extract `spotId` param from URL
  const { spotId } = useParams();

  // extract data from store,
  // oneSpot retrieved by`thunkGetSpotInfo`
  // reviews retrieved by`thunkGetSpotReviews`
  const oneSpot = useSelector((state) => state.spot.singleSpot);
  const reviews = useSelector((state) => state.review.spot);

  // runs after component mounts
  useEffect(() => {
    // dispatch thunk action creator to fetch spot details
    dispatch(thunkGetSpotInfo(spotId));
    // effect runs whenever either dispatch or spotId changes
  }, [dispatch, spotId]);

  // runs after component mounts
  useEffect(() => {
    // dispatch thunk action creator to fetch spot reviews
    dispatch(thunkGetSpotReviews(spotId));
    // effect runs whenever either dispatch or spotId changes
  }, [dispatch, spotId]);

  // prevent rendering empty content if `oneSpot` data hasn't loaded yet
  if (!oneSpot.id) return null;
  if (!reviews[spotId]) return null;

  // convert obj to arr and reverse order to show most recent first
  const reviewsList = Object.values(reviews[spotId]).reverse();

  // destructure props of `oneSpot` obj
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

  // extract main img and additonal imgs from `SpotImages` arr
  // main is preview === true, additional are preview === false
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
          {additionalImages.map((img) => (
            <img
              className="additional-images"
              src={img.url}
              key={img.id}
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
            <div className="price-night">
              <h4>${Number(price).toFixed(2)}</h4>
              <div>/night</div>
            </div>

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

      {/* Also render `SpotReview` component */}
      <SpotReviews />
    </div>
  );
};
