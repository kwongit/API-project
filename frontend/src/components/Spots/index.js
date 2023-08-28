import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpots } from "../../store/spots";
import SingleSpotDetails from "../SingleSpotDetails";
import "./Spots.css";

export const Spots = () => {
  const dispatch = useDispatch();
  const getSpots = useSelector((state) => state.spot.allSpots);
  const spots = Object.values(getSpots);

  useEffect(() => {
    dispatch(thunkGetSpots());
  }, [dispatch]);

  if (!spots.length) return null;

  return (
    <div className="spot-details-container">
      {spots.map((spot) => (
        <SingleSpotDetails key={spot.id} spot={spot} />
      ))}
    </div>
  );
};
