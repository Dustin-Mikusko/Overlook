class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  bookRoom(date, roomNumber) {
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "userID": this.id,
          "date": date,
          "roomNumber": roomNumber
        })
      }).then(() => {
        console.log('Room Booked!');
      }).catch(() => 'Booking failed to happen');
  }
   
}

export default User;
