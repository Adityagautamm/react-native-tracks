import React, { useContext, useEffect } from "react";

import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);
  // you can show spinner if you like as the screen
  //when Auth token is getting resolved to show Tracklist screen or Signup screen
  return null;
};

export default ResolveAuthScreen;
