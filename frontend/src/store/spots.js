import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
// used to define action types. ensures consistent action types throughout redux application

const GET_SPOTS = "spots/getSpots";
const GET_SPOT = "spots/getSpot";
const CREATE_SPOT = "spots/createSpot";
const UPDATE_SPOT = "spots/updateSpot";
const DELETE_SPOT = "spots/deleteSpot";

// ACTION CREATORS
// functions that return action objects. objects describe action types

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

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

// THUNK ACTION CREATORS
// makes API request and dispatches async actions

// retrieves a list of spots from API
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

// retrieves info about a specific spot by its ID
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

// creates a new spot and associated spot images
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

// helper function used by thunkCreateSpot to create spot images
export const thunkSpotImage = (spot, spotImages, user) => async (dispatch) => {
  for (const image of spotImages) {
    await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: "POST",
      body: JSON.stringify(image),
    });
  }
};

// retrieves spots associated with the currently logged-in user
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

// updates a spot by its ID
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

// deletes a spot by its ID
export const thunkDeleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  dispatch(deleteSpot(spotId));
  return res;
};

// REDUCERS
// handles actions and updates application state

// defines initial state for the spots section of redux store
const initialState = { allSpots: {}, singleSpot: {} };

// takes current state and action and returns new state based on action type
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

    case DELETE_SPOT:
      newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: {},
      };
      delete newState.allSpots[action.spotId];
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
