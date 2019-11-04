// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import './css/manager-deck.scss';
import './css/user-deck.scss'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


$('.user-login-btn').on('click', function() {
  let $user = $('#user-id').val();
  let $password = $('#user-password').val()
  if ($user === 'manager' && $password === 'overlook2019') {
    window.location = '/manager-deck.html';
  } 
  if ($user.includes('customer') && $password === 'overlook2019') {
  window.location = "/user-deck.html";
  } else {
    $('.user-login-btn').after('<p class="error">Incorrect User ID and/or Password</p>');
    $('input').css('border', '1px solid red');
    setTimeout(() => {
      $('.error').css('display', 'none');
    }, 1500)
  }
});

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
