import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Spots } from "./components/Spots";
import { CreateSpot } from "./components/Spots/CreateSpot";
import { ManageSpots } from "./components/ManageSpots";
import { GetSpotToUpdate } from "./components/Spots/GetSpotToUpdate";
// import { SpotReviews } from "./components/SpotReviews";
import { SpotDetails } from "./components/SpotDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch></Switch>}
      <Switch>
        <Route exact path="/">
          <Spots />
        </Route>
        <Route exact path="/spots/new">
          <CreateSpot />
        </Route>
        <Route exact path="/spots/current">
          <ManageSpots />
        </Route>
        <Route exact path="/spots/:spotId/edit">
          <GetSpotToUpdate />
        </Route>
        <Route exact path="/spots/:spotId">
          {/* <SpotReviews /> */}
          <SpotDetails />
        </Route>
      </Switch>
    </>
  );
}

export default App;
