import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel'
import bookings from '../data/bookings-data';
import rooms from '../data/rooms-data';
import users from '../data/users-data';

describe('Manager', () => {
  let manager;

  beforeEach(() => {
    manager = new Manager(bookings, rooms, users);
  });

  it('should be able to find a specific user', () => {
    expect(manager.findUser("Leatha Ullrich"))
  })
  


})
