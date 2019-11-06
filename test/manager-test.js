import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';
import Manager from '../src/Manager';
import bookings from '../data/bookings-data';
import rooms from '../data/rooms-data';
import users from '../data/users-data';

describe('Manager', () => {
  let hotel;
  let manager;

  beforeEach(() => {
    hotel = new Hotel(bookings, rooms)
    manager = new Manager(bookings, rooms, users);
  });

  it('should be able to find a specific user', () => {
    expect(manager.findUser('Leatha Ullrich')).to.eql({
      id: 1,
      name: 'Leatha Ullrich'
    })
  });

  it('should be able to find a specific booking id by date and room number', () => {
    expect(manager.findBooking(48,'2019/11/14', 18)).to.equal(1572293130161)
  })

  it('should be able to delete an upcoming booking for user', () => {
    
  })
  


})
