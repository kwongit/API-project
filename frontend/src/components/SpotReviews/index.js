import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetSpotReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import { CreateReviewModal } from "./CreateReviewModal";
import { DeleteReviewModal } from "./DeleteReviewModal";
import "./SpotReviews.css";

export const SpotReviews = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spot.singleSpot);
  const reviews = useSelector((state) => state.review.spot);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetSpotReviews(spotId));
  }, [dispatch, spotId]);

  if (!reviews[spotId]) return null;

  const reviewsList = Object.values(reviews[spotId]).reverse();

  const previousReview =
    user && reviewsList.find((review) => review.userId === user.id);

  const { avgStarRating, numReviews } = spot;

  const createDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const year = newDate.toLocaleString("default", { year: "numeric" });
    return `${month} ${year}`;
  };

  return (
    <div>
      <div>
        {reviewsList.length ? (
          <div>
            <div>
              <i className="fa-solid fa-star"></i>
              {Number(avgStarRating).toFixed(1)} · {numReviews}{" "}
              {numReviews > 1 ? "Reviews" : "Review"}
            </div>

            {user && !previousReview && spot.ownerId !== user?.id && (
              <OpenModalButton
                buttonText="Post Your Review"
                modalComponent={<CreateReviewModal spot={spot} user={user} />}
              />
            )}

            {reviewsList.map((review) => (
              <div key={review.id}>
                <h3 className="user-first-name">{review.User.firstName}</h3>
                <h4>{createDate(review.createdAt)}</h4>
                <p>{review.review}</p>

                {review.userId === user?.id && (
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={
                      <DeleteReviewModal
                        reviewId={review.id}
                        spotId={spot.id}
                      />
                    }
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div>
              <i className="fa-solid fa-star"></i>
              New
            </div>

            {user && !previousReview && spot.ownerId !== user?.id && (
              <OpenModalButton
                buttonText="Post Your Review"
                modalComponent={<CreateReviewModal spot={spot} user={user} />}
              />
            )}

            {user && !previousReview && spot.ownerId !== user?.id && (
              <h3>Be the first to post a review!</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
