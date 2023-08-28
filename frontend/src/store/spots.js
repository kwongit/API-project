import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
const GET_SPOTS = "/spots/getSpots";

// ACTION CREATORS
const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

// THUNK ACTION CREATORS
export const thunkGetSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  if (res.ok) {
    const spots = await res.json();
    dispatch(getSpots(spots));
    return spots;
  }
};

// REDUCERS
const initialState = { allSpots: {}, singleSpot: { spotImages: [] } };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      const newState = { ...state, allSpots: {}, singleSpot: {} };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
