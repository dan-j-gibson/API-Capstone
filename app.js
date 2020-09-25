'use strict';
// declares both API keys that will be used
const fireApiKey ='0a9fe053b25841febdc85ad002225ad6'
const geoApiKey ='b0f870fa197b0d'

// builds base urls with API keys
const geoUrl ='https://us1.locationiq.com/v1/search.php?key=' + geoApiKey + '&format=json&q=';
const fireUrl ='https://api.breezometer.com/fires/v1/current-conditions?key=' + fireApiKey;




// function assignCoordinates(geoResponseJson) {
//     console.log(geoResponseJson)
//     const coordinates = [geoResponseJson[0].lon, geoResponseJson[0].lat]
//     // logs the first instance of lon and lat of location search
//        console.log(coordinates);
       
//     }

// converts users location search to lat/lon format (geocoding)
function convertAddress(addressInput) {

    const lonLatUrl = geoUrl + addressInput;
// display new URL to fetch from API
    console.log(lonLatUrl);
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
            console.log(coordinates);
            console.log(distance)
            const params = {
                    lat: coordinates[1],
                    lon: coordinates[0],
                    radius: distance
                }
            const queryString = fireFormatQueryParams(params)
            const finalFireUrl = fireUrl + '&' + queryString
                    console.log(finalFireUrl) 
                    fetch(finalFireUrl)
                    .then(responseJson => {
                        if (responseJson.ok) {
                            console.log(responseJson)
                        return response.json()
                        }
                        throw Error(`looks like there was an issue: ${response.statusText}`);
                    })
                    // .then(responseJson => displayResults(responseJson))
                    .catch(err => {
                        return alert(`${err.message}`);
                    });
                })
    .catch(err => {
      return alert(`${err.message}`);
    });   
}
        // function getFiresList(coordinates,distance) {
        //         const params = {
        //             lat: coordinates[1],
        //             lon: coordinates[1],
        //             radius: distance
        //         }
        //         const queryString = fireFormatQueryParams(params)
        //         const finalFireUrl = fireUrl + '&' + queryString

        //         console.log(finalFireUrl)
        // }

        //         fetch(finalFireUrl)
        //         .then(response => {
        //           if (response.ok) {
        //             return response.json();
        //           }
        //           throw Error(`looks like there was an issue: ${response.statusText}`);
        //         })
        //         // .then(responseJson => displayResults(responseJson))
        //         .catch(err => {
        //           return alert(`${err.message}`);
        //         });
        // }




// displays list of fire locations ordered by distance
// function displayResults(responseJson) {}

// builds parameters for fire API
function fireFormatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function createParams(coordinates,) {
    const params = {
                    lat: coordinates[0],
                    lon: coordinates[1],
                    radius: distance
                }
}

// takes converted location input and radius and returns list of fires and their information
// function getFiresList(location,radius) {
// console.log(location);
// const params = {
//     lon: jsonResponse.lon,
//     lat: jsonRespone.lat
// }

//     fetch()
//     .then(response => {
//       if (response.ok) {
//         displayResults(responseJson)    
//         return response.json();
//       }
//       throw Error(`looks like there was an issue: ${response.statusText}`);
//     })
//     .then(responseJson => displayResults(responseJson)
//     )
//     .catch(err => {
//       return alert(`${err.message}`);
//     });   
// }


// pulls user's inputs and sends them to API functions
function watchForm() {
    $('.location-form').submit(event => {
      event.preventDefault();
      const searchLocation = $('#js-search-location').val();
    //   const searchRadius  = $('#js-search-radius').val();
    //   const searchCoordinates = convertAddress(searchLocation)

    //   console.log(searchLocation);
    //   console.log(searchRadius);
      convertAddress(searchLocation);

    //   getFiresList(searchCoordinates,searchRadius)
    //   getFiresList(searchLocation, searchRadius);
    });
  }

// sets app to be ready to listen for form inputs
$(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm()
  })