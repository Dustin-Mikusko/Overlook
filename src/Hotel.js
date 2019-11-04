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
    return openRooms.length;
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
    return 100 - (this.returnAvailableRooms(date)/this.rooms.length) * 100;
  }

  bookRoom() {

  }

}

export default Hotel;
