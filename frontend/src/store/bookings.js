// import axios from "axios";
import { csrfFetch } from "./csrf";

// Define action types
export const GET_BOOKINGS = "bookings/getBookings";
export const CREATE_BOOKING = "bookings/createBooking";
export const UPDATE_BOOKING = "bookings/updateBooking";
export const DELETE_BOOKING = "bookings/deleteBooking";

// Action creators
const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings,
});

const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

const updateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  booking,
});

const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId,
});

// Fetch all bookings for the currently logged-in user
export const thunkGetBookings = () => async (dispatch) => {
  const res = await csrfFetch("/api/bookings/current");

  if (res.ok) {
    const bookings = await res.json();
    dispatch(getBookings(bookings));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// Create a new booking
export const thunkCreateBooking =
  (spotId, startDate, endDate) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spotId, startDate, endDate }),
    });

    if (res.ok) {
      const booking = await res.json();
      dispatch(createBooking(booking));
      return booking;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

// Update a booking by bookingId
export const thunkUpdateBooking =
  (bookingId, startDate, endDate) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startDate, endDate }),
    });

    if (res.ok) {
      const booking = await res.json();
      dispatch(updateBooking(booking));
      return booking;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

// Delete a booking by bookingId
export const thunkDeleteBooking = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteBooking(bookingId));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = {
  bookings: {},
};

const bookingsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_BOOKINGS:
      newState = {
        ...state,
        bookings: { ...action.bookings },
      };
      return newState;

    case CREATE_BOOKING:
      newState = {
        ...state,
        bookings: { ...state.bookings },
      };
      newState.bookings[action.booking.id] = action.booking;
      return newState;

    case UPDATE_BOOKING:
      newState = {
        ...state,
        bookings: { ...state.bookings },
      };
      newState.bookings[action.booking.id] = action.booking;
      return newState;

    case DELETE_BOOKING:
      newState = {
        ...state,
        bookings: { ...state.bookings },
      };
      delete newState.bookings[action.bookingId];
      return newState;

    default:
      return state;
  }
};

export default bookingsReducer;
