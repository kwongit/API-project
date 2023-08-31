import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
const GET_SPOT_REVIEWS = "spots/spot/getSpotReviews";
// const CREATE_REVIEW = "spots/spot/createReview";
const DELETE_REVIEW = "spots/spot/deleteReview";

// ACTION CREATORS
const getSpotReviews = (reviews, spotId) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews,
    spotId,
  };
};

// const createReview = (review) => {
//   return {
//     type: CREATE_REVIEW,
//     review,
//   };
// };

// const deleteReview = (reviewId) => {
//   return {
//     type: DELETE_REVIEW,
//     reviewId,
//   };
// };

// THUNK ACTION CREATORS
export const thunkGetSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getSpotReviews(reviews.Reviews, spotId));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkCreateReview = (review, spotId, user) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
    });

    const newReview = await res.json();
    newReview.User = {
      id: user.id,
      firstName: user.firsName,
      lastName: user.lastName,
    };
    newReview.ReviewImages = [];
    dispatch(thunkGetSpotReviews(spotId));
    return newReview;
  } catch (e) {
    const errors = await e.json();
    return errors;
  }
};

export const thunkDeleteReview = (reviewId, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  dispatch(thunkGetSpotReviews(spotId));
  return data;
};

// REDUCERS
const initialState = { spot: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_SPOT_REVIEWS:
      newState = { ...state, spot: { ...state.spot } };
      newState.spot[action.spotId] = {};
      action.reviews.forEach((review) => {
        newState.spot[action.spotId][review.id] = review;
      });
      return newState;

    case DELETE_REVIEW:
      newState = {
        ...state,
        spot: { ...state.spot },
      };
      delete newState.spot[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
