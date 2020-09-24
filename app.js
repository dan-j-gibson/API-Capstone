'use strict'

const fireApiKey ='0a9fe053b25841febdc85ad002225ad6'
const geoApiKey ='b0f870fa197b0d'


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function getCoordinates(address) {
    
}


$(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm()
  })