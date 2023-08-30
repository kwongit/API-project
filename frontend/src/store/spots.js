import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
const GET_SPOTS = "spots/getSpots";
const GET_SPOT = "spots/getSpot";
const CREATE_SPOT = "spot/createSpot";
const UPDATE_SPOT = "spot/updateSpot";

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

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
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

export const thunkCreateSpot = (spot, spotImages, user) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(thunkSpotImage(data, spotImages, user));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkSpotImage = (spot, spotImages, user) => async (dispatch) => {
  for (const image of spotImages) {
    await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: "POST",
      body: JSON.stringify(image),
    });
  }
};

export const thunkGetUserSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

  if (res.ok) {
    const spots = await res.json();
    dispatch(getSpots(spots));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkUpdateSpot = (spot, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateSpot(data));
    return data;
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

    case CREATE_SPOT:
      newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: { ...action.spot },
      };
      newState.allSpots[action.spot.id] = action.spot;
      return newState;

    case UPDATE_SPOT:
      newState = {
        ...state,
        allSpots: {},
        singleSpot: { ...state.singleSpot },
      };
      newState.singleSpot = { ...newState.singleSpot, ...action.spot };
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
