import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetUserSpots } from "../../store/spots";
import SpotTile from "../SpotTile";
import { DeleteSpotModal } from "./DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";
import "./ManageSpots.css";

export const ManageSpots = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spot.allSpots);

  const spotsList = Object.values(spots);

  useEffect(() => {
    dispatch(thunkGetUserSpots());
  }, [dispatch]);

  if (!user) return null;

  const handleClick = () => {
    history.push("/spots/new");
  };

  const handleUpdateClick = (spotId) => {
    history.push(`/spots/${spotId}/edit`);
  };

  return (
    <div>
      <div className="manage-container">
        <h1>Manage Spots</h1>
        {spotsList && spotsList.length <= 0 ? (
          <button onClick={handleClick}>Create a New Spot</button>
        ) : (
          ""
        )}
      </div>
      <div className="spot-details-container">
        {spotsList.map((spot) => (
          <div key={spot.id}>
            <SpotTile manage={true} spot={spot} />
            <div className="buttons-container">
              <button
                className="update-button"
                onClick={() => handleUpdateClick(spot.id)}
              >
                Update
              </button>

              <OpenModalButton
                className="delete-button"
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spotId={spot.id} />}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
