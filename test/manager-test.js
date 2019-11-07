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
  let fetchSpy;

  beforeEach(() => {
    hotel = new Hotel(bookings, rooms);
    manager = new Manager(bookings, rooms, users);
    fetchSpy = chai.spy.on(global, 'fetch', () => {
      return new Promise((resolve, reject) => {
        resolve({message: 'Data has been fetched.'});
      })
    });
  });

  afterEach(() => {
    chai.spy.restore(fetchSpy);
  });

  it('should be able to find a specific user', () => {
    expect(manager.findUser('Leatha Ullrich')).to.eql({
      id: 1,
      name: 'Leatha Ullrich'
    })
  });

  it('should be able to find a specific booking id by date and room number', () => {
    chai.spy.on(manager, "returnUpcomingBookings", () => [{
      id: 1572293130161,
      userID: 48,
      date: '2019/11/14',
      roomNumber: 18,
      roomServiceCharges: [] 
    }]);
    expect(manager.findBooking(48,'2019/11/14', 18)).to.equal(1572293130161);
  })

  it('should be able to delete an upcoming booking for user', () => {
    manager.deleteBooking(1573080561901);
    expect(fetchSpy).to.have.been.called(1);
  });
})
