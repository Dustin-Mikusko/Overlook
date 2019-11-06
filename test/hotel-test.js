import chai from 'chai';
const expect = chai.expect;
import spies from "chai-spies";

import Hotel from '../src/Hotel';
import bookings from '../data/bookings-data';
import rooms from '../data/rooms-data';

chai.use(spies);

describe('Hotel', () => {
  let hotel;
  let fetchSpy

  beforeEach(() => {
    hotel = new Hotel(bookings, rooms);
    fetchSpy = chai.spy.on(global, 'fetch', () => {
      return new Promise((resolve, reject) => {
        resolve({message: 'Data has been fetched.'});
      })
    });
  });

  afterEach(() => {
    chai.spy.restore(fetchSpy);
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

  it('should calculate the percentage of rooms occupied for a given date', () => {
    expect(hotel.calculatePercentOccupancy("2019/11/06")).to.equal(12)
  });

  it('should return all bookings for a given custoemr', () => {
    expect(hotel.returnAllBookings(15)).to.eql([{ 
      id: 1572293130161,
      userID: 15,
      date: '2019/12/06',
      roomNumber: 5,
      roomServiceCharges: [] 
    }])
  });

  it('should return all the previous bookings for a given customer and date', () => {
    expect(hotel.returnPastBookings(12, '2019/11/05')).to.eql([{     
      id: 1572293130159,
      userID: 12,
      date: '2019/10/29',
      roomNumber: 10,
      roomServiceCharges: [] 
    }])
  });

  it('should return all the upcoming bookings for a given customer and date, including today', () => {
    expect(hotel.returnUpcomingBookings(48, '2019/11/05')).to.eql([{
      id: 1572293130161,
      userID: 48,
      date: '2019/11/14',
      roomNumber: 18,
      roomServiceCharges: [] 
    }])
  });

  it('should calculate the total amount spent for a given customer', () => {
    expect(hotel.calculateTotalSpent(12)).to.equal(497)
  });

  it('should gather booking data from API', () => {
    hotel.getData('bookings/bookings', 'message')
    expect(fetchSpy).to.have.been.called(1);
  })

});
