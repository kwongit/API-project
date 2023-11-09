import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
const GET_REVIEWS = "reviews/getReviews";
const GET_SPOT_REVIEWS = "reviews/getSpotReviews";
const DELETE_REVIEW = "reviews/deleteReview";

// ACTION CREATORS
const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const getSpotReviews = (reviews, spotId) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews,
    spotId,
  };
};

// THUNK ACTION CREATORS
export const thunkGetUserReviews = () => async (dispatch) => {
  const res = await csrfFetch("/api/reviews/current");

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getReviews(reviews));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

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
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(thunkGetSpotReviews(spotId));
    return newReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkDeleteReview = (reviewId, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(thunkGetSpotReviews(spotId));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
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
      delete newState.spot[action.spotId][action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
