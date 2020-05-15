import * as chai from 'chai';
import * as mocha from 'mocha';
const expect = chai.expect;
import { Street } from '../../src/interface/street';
import { addStreet, calculatePointToStreetDistance, findClosestStreet, getAllStreets, removeAllStreets } from "../../src/service/street";

const sampleStreet1: Street = {
  name: 'TestStreet2',
  start: [0, 1],
  end: [1, 2]
};

const sampleStreet2: Street = {
  name: 'TestStreet3',
  start: [1, -1],
  end: [4, -1]
};

before(async () => {
  await removeAllStreets();
});
after(async () => {
  await removeAllStreets();
});
describe('street service', () => {
  it(`addStreet() should add a new street`, async () => {
    const streetListBefore = await getAllStreets();
    const streetListLengthBefore = streetListBefore.length;
    await addStreet(sampleStreet1);
    await addStreet(sampleStreet2);
    const streetListAfter = await getAllStreets();
    const streetListLengthAfter= streetListAfter.length;

    expect(streetListLengthAfter).to.equal(streetListLengthBefore + 2);
  });
  it(`calculatePointToStreetDistance() for 'SampleStreet1' and point (1, 1) should be equal sqrt(2)/2`, async () => {
    const distance = calculatePointToStreetDistance(1,1, sampleStreet1);

    expect(distance.distance).to.equal(Math.sqrt(2)/2);
  });
  it(`calculatePointToStreetDistance() for 'SampleStreet2' and point (1, 1) should be equal 2`, async () => {
    const distance = calculatePointToStreetDistance(1,1, sampleStreet2);

    expect(distance.distance).to.equal(2);
  });
  it(`findClosestStreet() for point (1, 1) should return two streets: 'TestStreet1' and 'TestStreet2'  
    with distance equal: 0.7071067811865476`, async () => {
    const closestStreet = await findClosestStreet(1,1);
    expect(closestStreet.length).to.equal(2);
    expect(closestStreet).to.deep.include({streetName: 'TestStreet1', distance: 0.7071067811865476});
    expect(closestStreet).to.deep.include({streetName: 'TestStreet2', distance: 0.7071067811865476});

  });
  it(`findClosestStreet() for point (2, -3) should return 'TestStreet3' one street 
    with distance equal: 2`, async () => {
    const closestStreet = await findClosestStreet(2,-3);
    expect(closestStreet.length).to.equal(1);
    expect(closestStreet).to.deep.include({streetName: 'TestStreet3', distance: 2});
  });
});
