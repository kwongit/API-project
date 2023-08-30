import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot } from "../../store/spots";
import "./ManageSpots.css";

export const DeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteSpot(spotId)).then(closeModal);
  };

  return (
    <div className="delete-modal-content">
      <div className="delete-spot-container">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to remove this spot from the listings?</p>
        <div className="yes-no-container">
          <button className="yes-button" type="button" onClick={handleClick}>
            Yes (Delete Spot)
          </button>
          <button className="no-button" type="button" onClick={closeModal}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </div>
  );
};
