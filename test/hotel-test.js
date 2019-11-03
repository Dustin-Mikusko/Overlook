import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';
import bookings from '../data/bookings-data';
import rooms from '../data/rooms-data';

describe('Hotel', () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel(bookings, rooms);
  });

  it('should house all the bookings', () => {
    expect(hotel.bookings[0]).to.eql({
      id: 1572293130156,
      userID: 19,
      date: "2019/11/06",
      roomNumber: 18,
      roomServiceCharges: [ ]
      })
  });

  it('should house all the rooms', () => {
    expect(hotel.rooms[0]).to.eql({
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
      })
  });

  it('should return all the booked room numbers for a given date', () => {
    expect(hotel.returnBookedRooms("2019/11/06")).to.eql([18, 7, 11])
  })

  it('should return all the available room numbers for a given date', () => {
   expect(hotel.returnAvailableRooms("2019/11/06")).to.eql([1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25])
  });

  it('should calculate the total revenue for a given date', () => {
    expect(hotel.calculateRevenue("2019/11/06")).to.equal(935.11);
  });

  it('should calculate the percentage of rooms available for a given date', () => {
    expect(hotel.calculatePercentAvailable("2019/11/06")).to.equal(88)
  })

});
