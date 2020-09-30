'use strict';
// declares both API keys that will be used
const fireApiKey ='0a9fe053b25841febdc85ad002225ad6'
const geoApiKey ='b0f870fa197b0d'

// builds base urls with API keys
const geoUrl ='https://us1.locationiq.com/v1/search.php?key=' + geoApiKey + '&format=json&q=';
const fireUrl ='https://api.breezometer.com/fires/v1/current-conditions?key=' + fireApiKey;

function displayResults (fireResponseJson){
    console.log(fireResponseJson)
    $('#results').removeClass('hidden');
      $('#results-list').empty();
          if (fireResponseJson.data.fires.length !== 1  )
          { $('#results-list').append(
              `<h2>There is a total of ${fireResponseJson.data.fires.length} fires within ${$('#js-search-radius').val()}
            kilometers of ${$('#js-search-location').val().toUpperCase()}</h2>`)}
       else { $('#results-list').append(
           `<h2>There is only ${fireResponseJson.data.fires.length} fire within ${$('#js-search-radius').val()}
            kilometers of ${$('#js-search-location').val().toUpperCase()}</h2>`)}
      for(let i = 0; i < fireResponseJson.data.fires.length; i++){
        $('#results-list').append(
                `<li class="item-double">
                    <h3>${fireResponseJson.data.fires[i].details.fire_name}</h3>
                    <h4>Type: ${fireResponseJson.data.fires[i].details.fire_type}</h4>
                    <p>Cause of fire: ${fireResponseJson.data.fires[i].details.fire_cause}</p>
                    <p>Distance: ${fireResponseJson.data.fires[i].position.distance.value} km</p>
                    <p>Size: ${fireResponseJson.data.fires[i].details.size.value} m2</p>
                </li>`
                );
            }
}

// converts users location search to lat/lon format (geocoding)
function convertAddress(addressInput) {

    const lonLatUrl = geoUrl + addressInput;
// display new URL to fetch from API
    // console.log(lonLatUrl);
    fetch(lonLatUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error(`looks like there was an issue:`);
    })
    .then(
        function assignCoordinates(geoResponseJson) {
            console.log(geoResponseJson)
            const coordinates = [geoResponseJson[0].lon, geoResponseJson[0].lat]
            const distance = $('#js-search-radius').val();
            // console.log(coordinates);
            // console.log(distance)
            const params = {
                lat: coordinates[1],
                lon: coordinates[0],
                radius: distance
            }
            const queryString = fireFormatQueryParams(params)
            const finalFireUrl = fireUrl + '&' + queryString
                    // console.log(finalFireUrl) 
                    fetch(finalFireUrl)
                    .then(fireResponseJson => {
                        if (fireResponseJson.ok) {
                            // console.log(fireResponseJson)
                        return fireResponseJson.json()
                        }
                        throw Error(`looks like there was an issue: ${response.statusText}`);
                    })
                    .then(fireResponseJson => displayResults(fireResponseJson))
                    .catch(err => {
                        return alert(`${err.message}`);
                    });
                })
    .catch(err => {
      return alert(`${err.message}`);
    });   
}

// builds parameters for fire API
function fireFormatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

// takes converted location input and radius and returns list of fires and their information

// pulls user's inputs and sends them to API functions
function watchForm() {
    $('.location-form').submit(event => {
      event.preventDefault();
      const searchLocation = $('#js-search-location').val();
      convertAddress(searchLocation);
    });
  }

// sets app to be ready to listen for form inputs
$(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm()
  })