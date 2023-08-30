import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
const GET_SPOT_REVIEWS = "spots/spot/getSpotReviews";

// ACTION CREATORS
const getSpotReviews = (reviews, spotId) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews,
    spotId,
  };
};

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

    default:
      return state;
  }
};

export default reviewsReducer;
