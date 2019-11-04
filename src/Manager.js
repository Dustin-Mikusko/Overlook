import Hotel from "./Hotel";

class Manager extends Hotel {
  constructor(bookings, rooms, users) {
    super(bookings, rooms);
    this.users = users;
  }

  findUser(user) {
    
  }

  deleteBooking() {

  }
}

export default Manager;
