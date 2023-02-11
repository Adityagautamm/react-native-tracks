import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001;

const getLocation = (increment) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      accuracy: 5,
      altitude: 5,
      altitudeAccuracy: 5,
      heading: 0,
      latitude: -27.436832734300463 + increment * tenMetersWithDegrees,
      longitude: 153.00937209880172 + increment * tenMetersWithDegrees,
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
