import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { thunkGetBookings } from "../../store/bookings";

export const ManageBookings = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.booking.bookings);

  const bookingsList = Object.values(bookings);

  useEffect(() => {
    dispatch(thunkGetBookings());
  }, [dispatch]);

  if (!user) return null;

  console.log("BOOKINGS LIST:", bookingsList);
  console.log("BOOKINGS LIST spotId:", bookingsList[0][0].spotId);
  console.log("BOOKINGS LIST startDate:", bookingsList[0][0].startDate);
  console.log("BOOKINGS LIST endDate:", bookingsList[0][0].endDate);

  return (
    <div>
      <div className="manage-container">
        <h1>Manage Bookings</h1>
      </div>
      <div className="spot-details-container">TEST</div>
      <div>{bookingsList}</div>
    </div>
  );
};
