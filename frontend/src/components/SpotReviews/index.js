import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SingleSpotInfo } from "../SingleSpotInfo";
import { thunkGetSpotReviews } from "../../store/reviews";
import "./SpotReviews.css";

export const SpotReviews = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const singleSpot = useSelector((state) => state.spot.singleSpot);
  const reviews = useSelector((state) => state.review.spot);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetSpotReviews(spotId));
  }, [dispatch, spotId]);

  if (!reviews[spotId]) return null;

  const reviewsList = Object.values(reviews[spotId]).reverse();

  // const createDate = (date) => {
  //   const newDate = new Date(date);
  //   const month = newDate.toLocaleString("default", { month: "long" });
  //   const year = newDate.toLocaleString("default", { year: "numeric" });
  //   return `${month} ${year}`;
  // };

  const { avgStarRating, numReviews } = singleSpot;

  return (
    <div>
      {/* <SingleSpotInfo /> */}
      <div>
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
    </div>
  );
};
