import User from "./User";

class Manager extends User {
  constructor(bookings, rooms, users) {
    super(bookings, rooms);
    this.users = users;
  }

  

  deleteBooking() {

  }
}

export default Manager;
