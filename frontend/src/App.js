import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Spots } from "./components/Spots";
import { SingleSpotInfo } from "./components/SingleSpotInfo";
import { CreateSpot } from "./components/Spots/CreateSpot";
import { ManageSpots } from "./components/ManageSpots";
import { GetSpotToUpdate } from "./components/Spots/GetSpotToUpdate";

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
          <SingleSpotInfo />
        </Route>
      </Switch>
    </>
  );
}

export default App;
