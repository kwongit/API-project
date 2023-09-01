import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpots } from "../../store/spots";
import SpotTile from "../SpotTile";
import "./Spots.css";

// OVERALL FLOW: view > dispatch > thunk action creator > reducer > subscriber > react setters > view

export const Spots = () => {
  // initialize to allow dispatch actions to redux store
  const dispatch = useDispatch();

  // extract data from store, select `allSpots` property from `spot` SOS
  const getSpots = useSelector((state) => state.spot.allSpots);

  // convert obj to arr
  const spots = Object.values(getSpots);

  // runs after component mounts
  useEffect(() => {
    // dispatch thunk action creator to fetch all spots
    dispatch(thunkGetSpots());
  }, [dispatch]);

  // prevent rendering empty content if `getSpots` data hasn't loaded yet
  if (!spots.length) return null;

  return (
    <div className="spot-details-container">
      {/* map over spots arr, render `SpotTile` component for each spot */}
      {spots.map((spot) => (
        // `key` prop uniquely ids each `SpotTile` in the list
        // `spot` prop passed to each `SpotTile` to provide data for rendering
        <SpotTile key={spot.id} spot={spot} />
      ))}
    </div>
  );
};
