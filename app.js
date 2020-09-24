'use strict'
// declares both API keys that will be used
const fireApiKey ='0a9fe053b25841febdc85ad002225ad6'
const geoApiKey ='b0f870fa197b0d'

// builds base urls with API keys
const geoUrl ='https://us1.locationiq.com/v1/search.php?key=' + geoApiKey;
const fireUrl ='https://api.breezometer.com/fires/v1/current-conditions?key=' + fireApiKey;

// converts users location search to lat/lon format (geocoding)
function convertAddress(addressInput) {}


// displays list of fire locations ordered by distance
function displayResults(responseJson) {}

// builds parameters for fire API
function fireFormatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

// builds parameters for geocoding API
function geoFormatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

// takes converted location input and radius and returns list of fires and their information
function getFiresList(location,radius) {


    fetch()
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error(`looks like there was an issue: ${response.statusText}`);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      return alert(`${err.message}`);
    });   
}


// pulls user's inputs and sends them to API functions
function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchLocation = convertAddress($('#js-search-location').val());
      const searchRadius  = $('#js-search-radius').val();
      getFiresList(searchLocation, searchRadius);
    });
  }

// sets app to be ready to listen for form inputs
$(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm()
  })