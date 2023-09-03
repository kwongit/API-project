import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateSpot } from "../../store/spots";

// OVERALL FLOW: view > dispatch > thunk action creator > reducer > subscriber > react setters > view

export const CreateSpot = ({ user }) => {
  // create form input states
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat] = useState(37.7573797);
  const [lng] = useState(-122.2490953);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [imgOne, setImgOne] = useState("");
  const [imgTwo, setImgTwo] = useState("");
  const [imgThree, setImgThree] = useState("");
  const [imgFour, setImgFour] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // used to navigate to different routes
  const history = useHistory();

  // initialize to allow dispatch actions to redux store
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = {};

    if (!country) errors.country = "Country is required";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!description || description.length < 30)
      errors.description = "Description needs 30 or more characters";
    if (!name) errors.name = "Name is required";
    if (name.length > 49) errors.name = "Name must be less than 50 characters";
    if (!price || price < 1) errors.price = "Price is required";
    if (!previewImg) errors.previewImg = "Preview image is required";
    if (
      previewImg &&
      !previewImg.endsWith("jpg") &&
      !previewImg.endsWith("jpeg") &&
      !previewImg.endsWith("png")
    )
      errors.previewImg = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      imgOne &&
      !imgOne.endsWith("jpg") &&
      !imgOne.endsWith("jpeg") &&
      !imgOne.endsWith("png")
    )
      errors.imgOne = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      imgTwo &&
      !imgTwo.endsWith("jpg") &&
      !imgTwo.endsWith("jpeg") &&
      !imgTwo.endsWith("png")
    )
      errors.imgTwo = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      imgThree &&
      !imgThree.endsWith("jpg") &&
      !imgThree.endsWith("jpeg") &&
      !imgThree.endsWith("png")
    )
      errors.imgThree = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      imgFour &&
      !imgFour.endsWith("jpg") &&
      !imgFour.endsWith("jpeg") &&
      !imgFour.endsWith("png")
    )
      errors.imgFour = "Image URL must end in .png, .jpg, or .jpeg";

    setErrors(errors);
  }, [
    address,
    city,
    state,
    country,
    name,
    description,
    price,
    previewImg,
    imgOne,
    imgTwo,
    imgThree,
    imgFour,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitted(true);

    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    const imgUrl = [previewImg, imgOne, imgTwo, imgThree, imgFour];

    const imgUrlList = [];

    if (!Object.values(errors).length) {
      imgUrl.forEach((img, i) => {
        const preview = { url: img, preview: i === 0 };
        if (img) {
          imgUrlList.push(preview);
        }
      });

      const addSpot = await dispatch(
        thunkCreateSpot(newSpot, imgUrlList, user)
      );

      const combinedErrors = { ...errors, Errors: addSpot.errors };

      if (addSpot.errors) {
        setErrors(combinedErrors);
      } else {
        history.push(`/spots/${addSpot.id}`);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="create-spot-form-container">
      <h1>Create a New Spot</h1>
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

        <div className="images-container">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <div className="image-url-container">
            <input
              type="url"
              value={previewImg}
              onChange={(e) => setPreviewImg(e.target.value)}
              placeholder="Preview Image URL"
            />
            {errors.previewImg && submitted && (
              <p className="on-submit-errors">{errors.previewImg}</p>
            )}
            <input
              type="url"
              value={imgOne}
              onChange={(e) => setImgOne(e.target.value)}
              placeholder="Image URL"
            />
            {errors.imgOne && submitted && (
              <p className="on-submit-errors">{errors.imgOne}</p>
            )}
            <input
              type="url"
              value={imgTwo}
              onChange={(e) => setImgTwo(e.target.value)}
              placeholder="Image URL"
            />
            {errors.imgTwo && submitted && (
              <p className="on-submit-errors">{errors.imgTwo}</p>
            )}
            <input
              type="url"
              value={imgThree}
              onChange={(e) => setImgThree(e.target.value)}
              placeholder="Image URL"
            />
            {errors.imgThree && submitted && (
              <p className="on-submit-errors">{errors.imgThree}</p>
            )}
            <input
              type="url"
              value={imgFour}
              onChange={(e) => setImgFour(e.target.value)}
              placeholder="Image URL"
            />
            {errors.imgFour && submitted && (
              <p className="on-submit-errors">{errors.imgFour}</p>
            )}
          </div>
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
                price ||
                previewImg ||
                imgOne ||
                imgTwo ||
                imgThree ||
                imgFour
              )
            }
          >
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
};
