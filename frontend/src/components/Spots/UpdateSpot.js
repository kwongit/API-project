import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkUpdateSpot } from "../../store/spots";

export const UpdateSpot = ({ spot }) => {
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  if (!spot) {
    history.push("/");
  }

  useEffect(() => {
    const errors = {};

    if (!country) errors.country = "Country is required";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!description || description.length < 30)
      errors.description = "Description needs 30 or more characters";
    if (!name) errors.name = "Name is required";
    if (!price || price < 1) errors.price = "Price is required";

    setErrors(errors);
  }, [address, city, state, country, name, description, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const updatedSpot = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
    };

    if (!Object.values(errors).length) {
      const updateSpot = await dispatch(thunkUpdateSpot(updatedSpot, spot.id));

      const combinedErrors = { ...errors, Errors: updateSpot.errors };

      if (updateSpot.errors) {
        setErrors(combinedErrors);
      } else {
        history.push("/");
      }
    }
  };

  return (
    <div className="create-spot-form-container">
      <h1>Update your Spot</h1>
      <form onSubmit={handleSubmit}>
        <div className="location-container">
          <h3>Where's your place located?</h3>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>

          <div className="country-address-container">
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            {errors.country && submitted && (
              <p className="on-submit-errors">{errors.country}</p>
            )}
            <div className="address-container">
              <label>Street Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
              {errors.address && submitted && (
                <p className="on-submit-errors">{errors.address}</p>
              )}
            </div>
          </div>

          <div className="city-and-state-container">
            <div className="city-container">
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
              {errors.city && submitted && (
                <p className="on-submit-errors">{errors.city}</p>
              )}
            </div>
            <div className="state-container">
              <label>State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
              />
              {errors.state && submitted && (
                <p className="on-submit-errors">{errors.state}</p>
              )}
            </div>
          </div>
        </div>

        <div className="description-container">
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best feature of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
          {errors.description && submitted && (
            <p className="on-submit-errors">{errors.description}</p>
          )}
        </div>

        <div className="title-container">
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
          />
          {errors.name && submitted && (
            <p className="on-submit-errors">{errors.name}</p>
          )}
        </div>

        <div className="price-container">
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <span className="dollar-sign">$</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
          />
          {errors.price && submitted && (
            <p className="on-submit-errors">{errors.price}</p>
          )}
        </div>

        <div className="button-container">
          <button
            className="create-spot-button"
            type="submit"
            disabled={
              !(
                address ||
                city ||
                state ||
                country ||
                name ||
                description ||
                price
              )
            }
          >
            Update Spot
          </button>
        </div>
      </form>
    </div>
  );
};
