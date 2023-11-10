import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { thunkGetUserReviews } from "../../store/reviews";

export const ManageReviews = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review.spot);

  const reviewsList = Object.values(reviews);

  useEffect(() => {
    dispatch(thunkGetUserReviews());
  }, [dispatch]);

  if (!user) return null;

  return (
    <div>
      <div className="manage-container">
        <h1>Manage Reviews</h1>
      </div>
      <div className="spot-details-container">
        {reviewsList}
        {reviewsList.map((review) => (
          <div key={review.id}>{review.review}</div>
        ))}
      </div>
    </div>
  );
};
