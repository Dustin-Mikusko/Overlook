import $ from 'jquery';

import './css/base.scss';
import './css/manager-deck.scss';
import './css/user-deck.scss';
import './css/variables.scss';

import Hotel from './Hotel';
import Manager from './Manager';
import User from './User';

var hotel;
var manager;

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
  manager = new Manager(bookings.bookings, rooms.rooms, users.users);
  JSON.stringify(localStorage.setItem('hotel', JSON.stringify(hotel)));
  JSON.stringify(localStorage.setItem('manager', JSON.stringify(manager))); 
  console.log(hotel);
});


$('.user-login-btn').on('click', loginHandler);

function loginHandler() {
  
  checkInputs();

}

function checkInputs() {
  let $user = $('#user-id').val();
  let $password = $('#user-password').val()
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

function pageLoad() {
  JSON.parse(localStorage.getItem('hotel'));
    JSON.parse(localStorage.getItem('manager'));
    console.log('hello')
    $('.occupancy-title').after(`${hotel.calculatePercentAvailable()}%`);
    console.log('hello');
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
  $('.occupancy-title').after(`${hotel.calculatePercentAvailable()}%`);
}

function customerHandler() {
  return window.location = '/user-deck.html';
}



function formatDate(date) {
  var monthNames = [
    "1", "2", "3",
    "4", "5", "6", "7",
    "8", "9", "10",
    "11", "12"
  ];
  var day = date.getDate();
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


