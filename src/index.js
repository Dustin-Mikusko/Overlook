import $ from 'jquery';

import './css/base.scss';
import './css/manager-deck.scss';
import './css/user-deck.scss';
import './css/variables.scss';
import './css/mixins.scss';

import Hotel from './Hotel';
import Manager from './Manager';
import User from './User';

var hotel;
var manager;
var user;

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
  console.log(hotel);
});


$('.user-login-btn').on('click', loginHandler);

function loginHandler() {
 checkInputs()
}

function checkInputs() {
  let $user = $('#user-id').val();
  let $password = $('#user-password').val();
  let $userID = $user.split('r')[1];
  if ($user === 'manager' && $password === 'overlook2019') {
    managerHandler();
    console.log('hello')
  } 
  if ($user.includes('customer') && $password === 'overlook2019') {
    customerHandler();
  } else {
    createError();
  }
}


function createError() {
  $('.user-login-btn').after('<p class="error">Incorrect User ID and/or Password</p>');
    $('input').css('border', '1px solid red');
    setTimeout(() => {
      $('.error').css('display', 'none');
    }, 1500)
}

function managerHandler() {
  $('.login-page').addClass('hidden');
  $('.manager-body').removeClass('hidden');
  $('#occupancy-title').after(`<p class="manager-tile-number">${hotel.calculatePercentOccupancy(date)}%</p>`);
  $('#revenue-title').after(`<p class="manager-tile-number"> $${hotel.calculateRevenue(date).toFixed(2)}</p>`);
  $('#rooms-available').after(`<p class="manager-tile-number"> ${hotel.returnAvailableRooms(date).length}`);
  console.log(date);
}

function customerHandler() {
  $('.login-page').addClass('hidden');
  $('.customer-body').removeClass('hidden');
  console.log('hello');
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

function dropYear(dates) {
  const reformattedDates = dates.map(date => {
    const splitDate = date.split('/');
    return [splitDate[1], splitDate[2]].join('/');
  })
  return reformattedDates
}


