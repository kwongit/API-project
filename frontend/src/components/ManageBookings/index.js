import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetBookings } from "../../store/bookings";
import "./ManageBookings.css";

export const ManageBookings = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.booking.bookings);

  const bookingsList = Object.values(bookings);

  console.log("BOOKINGS LIST:", bookingsList);

  useEffect(() => {
    dispatch(thunkGetBookings());
  }, [dispatch]);

  if (!user) return null;

  // const handleClick = () => {
  //   history.push("/spots/new");
  // };

  // const handleUpdateClick = (spotId) => {
  //   history.push(`/spots/${spotId}/edit`);
  // };

  return (
    <div>
      <div className="manage-container">
        <h1>Manage Bookings</h1>
      </div>
      <div className="spot-details-container">
        {/* {bookingsList.map((booking) => (
          <div key={booking.id}>{booking.values}</div>
        ))} */}
      </div>
    </div>
  );
};
