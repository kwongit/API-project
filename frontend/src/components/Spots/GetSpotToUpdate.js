import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetSpotInfo } from "../../store/spots";
import { UpdateSpot } from "./UpdateSpot";

export const GetSpotToUpdate = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spot.singleSpot);

  useEffect(() => {
    dispatch(thunkGetSpotInfo(spotId));
  }, [spotId, dispatch]);

  if (!spot.SpotImages) return null;

  return (
    <>
      <UpdateSpot formType="UpdateSpot" spot={spot} />
    </>
  );
};
