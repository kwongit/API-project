import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
const GET_SPOTS = "spots/getSpots";
const GET_SPOT = "spots/getSpot";

// ACTION CREATORS
const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

// THUNK ACTION CREATORS
export const thunkGetSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  if (res.ok) {
    const spots = await res.json();
    dispatch(getSpots(spots));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetSpotInfo = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(getSpot(spot));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// REDUCERS
const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_SPOTS:
      newState = { ...state, allSpots: {}, singleSpot: {} };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;

    case GET_SPOT:
      newState = { ...state, singleSpot: {} };
      newState.singleSpot = action.spot;
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
