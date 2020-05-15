import { Street } from "../interface/street";

const streets: Array<Street> = [
  {
    name: 'Street1',
    start: [1, 0],
    end: [4, 0]
  },
  {
    name: 'Street2',
    start: [0, 1],
    end: [1, 0]
  },
  {
    name: 'Street3',
    start: [1, 2],
    end: [2, 1]
  },
];

export const addStreet = async (street: Street) => {
  streets.push(street);
  return streets.findIndex((item) => item.name === street.name);
};

export const getAllStreets = async (): Promise<Array<Street>> => streets;

export const removeAllStreets = async () => streets.splice(0, streets.length);

export const findClosestStreet = async (x: number, y: number) => {
  const distanceList = streets.map((street) => calculatePointToStreetDistance(x, y, street));
  const minDistance = distanceList.reduce((previous, current) => previous.distance < current.distance ? previous : current);

  return distanceList.filter((item) => item.distance === minDistance.distance);
};

export const calculatePointToStreetDistance = (x0, y0, street) => {
  const x1 = street.start[0];
  const y1 = street.start[1];
  const x2 = street.end[0];
  const y2 = street.end[1];

  const pointDeltaX = x0 - x1;
  const pointDeltaY = y0 - y1;
  const lineDeltaX = x2 - x1;
  const lineDeltaY = y2 - y1;

  const numerator = pointDeltaX * lineDeltaX + pointDeltaY * lineDeltaY;
  const denominator = lineDeltaX * lineDeltaX + lineDeltaY * lineDeltaY;
  let uParam = -1;
  // if length of line is 0
  if (denominator !== 0) uParam = numerator / denominator;

  let x;
  let y;

  if (uParam < 0) {
    x = x1;
    y = y1;
  }
  else if (uParam > 1) {
    x = x2;
    y = y2;
  }
  else {
    x = x1 + uParam * lineDeltaX;
    y = y1 + uParam * lineDeltaY;
  }

  const deltaX = x0 - x;
  const deltaY = y0 - y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  return { streetName: street.name, distance};
};
