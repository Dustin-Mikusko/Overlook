class Hotel {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms;
  }

  returnBookedRooms(date) {
    return this.bookings.filter(booking => booking.date === date).map(book => book.roomNumber);
  }
  
  returnAvailableRooms(date) {
    let roomNumbers = this.rooms.map(room => room.number)
    let openRooms = [];
    let bookedRooms = this.bookings.filter(booking => booking.date === date).map(book => book.roomNumber)
    roomNumbers.forEach(room => {
      if (!bookedRooms.includes(room)) {
        openRooms.push(room)
      }
    })
    return openRooms;
  }

  calculateRevenue(date) {
    let bookedRooms = this.returnBookedRooms(date);
    return bookedRooms.reduce((acc, booking) => {
    this.rooms.forEach(room => {
      if (room.number === booking) {
        acc += room.costPerNight
        }
      })  
    return acc;
    }, 0)
  }

  calculatePercentOccupancy(date) {
    return (100 - (this.returnAvailableRooms(date).length/this.rooms.length) * 100);
  }

  returnAllBookings(userID) {
    return this.bookings.filter(booking => booking.userID === userID);
  }

  returnPastBookings(userID, date) {
    return this.bookings.filter(booking => booking.userID === userID && booking.date < date);
  }

  returnUpcomingBookings(userID, date) {
    return this.bookings.filter(booking => booking.userID === userID && booking.date >= date)
  }

  calculateTotalSpent(userID) {
    return this.returnAllBookings(userID).reduce((acc, booking) => {
      let cost = Math.floor(this.rooms.find(room => room.number === booking.roomNumber).costPerNight);
      acc += cost;
      return acc;
    }, 0)
  }

  getData(type) {
    const root = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/';
    const url = `${root}${type}`;
    const promise = fetch(url)
                    .then(data => data.json());
    return promise;
  }

}

export default Hotel;
