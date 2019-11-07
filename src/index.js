import $ from 'jquery';

import './css/base.scss';
import './css/manager-deck.scss';
import './css/user-deck.scss';
import './css/variables.scss';
import './css/mixins.scss';

import Hotel from './Hotel';
import Manager from './Manager';
import User from './User';


let hotel;
let manager;
let user;
let selectedUser;

function getData(type) {
	const root = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/';
	const url = `${root}${type}`;
	const promise = fetch(url)
	                .then(data => data.json());
	return promise;
}

let bookings = getData('bookings/bookings');
let rooms = getData('rooms/rooms');
let users = getData('users/users');


Promise.all([bookings, rooms, users]).then(promises => {
  bookings = promises[0];
  rooms = promises[1];
  users = promises[2];
}).then(() => {
  hotel = new Hotel(bookings.bookings, rooms.rooms);
});


$('.user-login-btn').on('click', loginHandler);

$('.log-off').on('click', () => {
  removeError();
  resetPage();
  $('#user-id').val('');
  $('#user-password').val('');
  $('#user-search').val('');
  $('.upcoming-empty').empty();
  $('.past-empty').empty();
  $('.login-page').removeClass('hidden');
  $('.manager-body').addClass('hidden');
  $('.customer-body').addClass('hidden');
});

$('.book-btn').click(bookHandler)

$('.search-user').click(userSearch)

$('body').on('click', (event) => {
  if (event.target.classList.contains('rooms-list')) {
    let bookDate = $('#book-date').val().split('-').join('/');
    user.bookRoom(bookDate, Number(event.target.dataset.id));
  }
  if (event.target.classList.contains('manager-rooms-list')) {
    let bookDate = $('#manager-book-date').val().split('-').join('/');
    selectedUser.bookRoom(bookDate, Number(event.target.dataset.id));
  }
});

$('.manager-room-search-btn').click(managerBookHandler);

$('body').on('click', '.book-delete', function(event) {
  deleteHandler();
  event.target.closest('li').remove();
})

function loginHandler() {
 checkInputs();
}

function checkInputs() {
  let $user = $('#user-id').val();
  let $password = $('#user-password').val();
  if ($user === 'manager' && $password === 'overlook2019') {
    managerHandler();
  } 
  if ($user.includes('customer') && $password === 'overlook2019') {
    let $userID = Number($user.split('r')[1]);
    customerHandler($userID);
  } else {
    createError();
    setTimeout(removeError, 1300)
  }
}


function createError() {
  $('.user-login-btn').after('<p class="error">Incorrect User ID and/or Password</p>');
    $('input').css('border', '1px solid red');
    setTimeout(() => {
      $('.error').css('display', 'none');
    }, 1300)
}

function removeError() {
  $('input').css('border', '1px solid grey');
}

function resetPage() {
  $('.dashboard-tile-number').remove();
  $('.book-list').remove();
}

function managerHandler() {
  $('#user-search').css('border', '1px solid grey');
  manager = new Manager(bookings.bookings, rooms.rooms, users.users);
  $('.login-page').addClass('hidden');
  $('.manager-body').removeClass('hidden');
  $('#occupancy-title').after(`<p class="dashboard-tile-number">${hotel.calculatePercentOccupancy(date)}%</p>`);
  $('#revenue-title').after(`<p class="dashboard-tile-number"> $${hotel.calculateRevenue(date).toFixed(2)}</p>`);
  $('#rooms-available').after(`<p class="dashboard-tile-number"> ${hotel.returnAvailableRooms(date).length}`);
}

function customerHandler(userID) {
  let userName = users.users.find(user => user.id === userID);
  user = new User(userName.id, userName.name);
  $('.login-page').addClass('hidden');
  $('.customer-body').removeClass('hidden');
  $('.user-welcome').html(`Welcome,<br> ${user.name.split(' ')[0]}!`);
  $('#upcoming-title').after(`<ul class="book-list">${makeUpcomingList(user.id)}</ul>`);
  $('#past-title').after(`<ul class="book-list">${makePastList(user.id)}</ul>`);
  $('#total-available').after(`<p class="dashboard-tile-number"> $${hotel.calculateTotalSpent(user.id)}</p>`);
}


function makePastList(userID) {
  return hotel.returnPastBookings(userID, date).reduce((acc,booking) => {
    acc += `<li class="list-items">Room: #${booking.roomNumber}<br> Date: ${booking.date}</li>`
    return acc;
  }, '')
}

function bookHandler() {
  let bookDate = $('#book-date').val().split('-').join('/');
  $('.search-empty').empty();
  $('.search-empty').append(`<ul class="book-list">${makeAvailableList(bookDate)}</ul>`)
}

function makeUpcomingList(userID) {
  return hotel.returnUpcomingBookings(userID, date).reduce((acc,booking) => {
    acc += `<li data-conf="${booking.id}"class="list-items">Room: #${booking.roomNumber}<br> Date: ${booking.date}<br>Conf. #: ${booking.id}</li>`
    return acc;
  }, '')
}

function managerMakeUpcomingList(userID) {
  return hotel.returnUpcomingBookings(userID, date).reduce((acc,booking) => {
    acc += `<li class="list-items upcoming-list">Room: #${booking.roomNumber}<br> Date: ${booking.date}<br>Conf. #: ${booking.id}<button data-conf="${booking.id}" class="book-delete" type="button">Delete</button></li>`
    return acc;
  }, '')
}

function makeAvailableList(date) {
  return hotel.returnAvailableRooms(date).reduce((acc, room) => {
    acc += `<li class="list-items rooms-list" data-id="${room.number}">Room #: ${room.number}<br><br>Room Type: ${room.roomType}<br><br>Bed Size: ${room.bedSize}<br><br>Beds: ${room.numBeds}<br><br>Cost/Night: $${room.costPerNight}</li>`
    return acc;
  }, '');
}

function makeManagerAvailableList(date) {
  return hotel.returnAvailableRooms(date).reduce((acc, room) => {
    acc += `<li class="list-items manager-rooms-list" data-id="${room.number}">Room #: ${room.number}<br><br>Room Type: ${room.roomType}<br><br>Bed Size: ${room.bedSize}<br><br>Beds: ${room.numBeds}<br><br>Cost/Night: $${room.costPerNight}</li>`
    return acc;
  }, '');
}

function userSearch() {
  let userNames = users.users.map(user => user.name);
  if ($('#user-search').val().length === 0) {
    createError();
  } else { 
    if (!userNames.includes($('#user-search').val())) {
      $('.search-user').after('<p class="error-msg">User not found</p>')
      setTimeout(clearErrorMessage, 1000)
    } else {
      $('#user-search').css('border', '1px solid grey');
      let userName = $('#user-search').val();
      let currentUser = manager.findUser(userName);
      selectedUser = new User(currentUser.id, currentUser.name);
      console.log(selectedUser);
      $('.upcoming-empty').empty();
      $('.past-empty').empty();
      $('.upcoming-empty').append(`<ul class="book-list">${managerMakeUpcomingList(currentUser.id)}</ul>`);
      $('.past-empty').append(`<ul class="book-list">${makePastList(currentUser.id)}</ul>`);
      }
    }
  }

  function deleteHandler() {
    manager.deleteBooking(Number(event.target.dataset.conf));

  }

  function managerBookHandler() {
    let bookDate = $('#manager-book-date').val().split('-').join('/');
    $('.search-empty').empty();
    $('.search-empty').append(`<ul class="book-list">${makeManagerAvailableList(bookDate)}</ul>`)
  }

  function clearErrorMessage() {
    $('.error-msg').remove();
  }


function formatDate(date) {
  var monthNames = [
    "1", "2", "3",
    "4", "5", "6", "7",
    "8", "9", "10",
    "11", "12"
  ];
  var day = ("0" + date.getDate()).slice(-2);
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return year + '/' + monthNames[monthIndex] + '/' + day;
}

  const date = formatDate(new Date());
	const dateObject = new Date(date);
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}

	const formattedDate = dateObject.toLocaleString('en', options);

	$('.date').text(`${formattedDate}`);


