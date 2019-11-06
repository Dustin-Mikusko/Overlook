import Hotel from "./Hotel";

class Manager extends Hotel {
  constructor(bookings, rooms, users) {
    super(bookings, rooms);
    this.users = users;
  }

  findUser(name) {
    return this.users.find(user => user.name === name);
  }

  findBooking(userID, date, room ) {
    return this.returnUpcomingBookings(userID, date, room).find(booking => booking.roomNumber === room && booking.date === date).id
  }


  deleteBooking(id) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id
        })
      }).then(() => {
        console.log('Booking Deleted!');
      }).catch(() => 'Delete failed to happen');
  }

}

export default Manager;
