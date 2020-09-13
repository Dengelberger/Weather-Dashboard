//WE ARE USING JQUERY.
    $(document).ready(function () {

      //BRINGS IN THE CURRENT DATE - THIS PART IS COMPLETE

    var date = $("#currDate");

    currDateEl = moment().format("MM/DD/YY");
    console.log(currDateEl);
    date.text("(" + currDateEl + ")");
 
    // MY API KEY - THIS PART IS COMPLETE
 
    var APIKey = "815cefae75b45f52456c8ed196bcea7f";

    // A VARIABLE TO CAPTURE THE CITY NAME THAT IS INPUT.  I HAVE TO FIX THIS PART

  var cityName = document.querySelector("#searchBox").val;

// $(document).on('click', "#searchBox", function (event) {
//   event.preventDefault();
//   inputEl = $(this);
//   var cityName = $(this).text;
//   localStorage.setItem(cityName, inputEl.text);
// })

    console.log(cityName);

// RETURN THE CITY INPUT INTO THE CURRENT INFORMATION AREA.  I HAVE TO FIX THIS PART.
  
    $("#currCityName").text(cityName);

// API QUERY FOR THE FIVE DAY FORECAST - WE NEED THIS FIRST TO GET LATITUDE AND LONGITUDE.  FIX ONCE THE CITY NAME IS FIXED.

var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=Miami&appid=" + APIKey;

// AJAX CALL FOR THE FIVE DAY FORECAST - THIS PART IS COMPLETE
$.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function(forecastData) {
 
     console.log(forecastData);
  
//CURRENT CITY LATITUDE AND LONGITUDE - THIS PART IS COMPLETE

 var currLat = forecastData.city.coord.lat;  
 var currLon = forecastData.city.coord.lon;

 // QUERY API FOR THE CURRENT DAY WEATHER - THIS PART IS COMPLETE

 var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currLat + "&lon=" + currLon + "&exclude={part}&appid=" + APIKey;

// AJAX CALL FOR THE CURRENT WEATHER - THIS PART IS COMPLETE

 $.ajax({
   url: queryURL2,
   method: "GET"
 }).then(function(weatherData) {

console.log(weatherData);

    //ALL OF THESE VARIABLES NEED TO BE ATTACHED TO THEIR PLACES IN THE HTML.

    //WEATHER LOGO FOR THE CURRENT WEATHER 

    var CurrLogo = weatherData.current.weather[0].icon;

    console.log("Current Weather Logo:" + CurrLogo);

    $("#currWeatherLogo").text(CurrLogo);

    //TEMPERATURE CONVERTED TO FARENHEIT 

    var KelvinTemp = weatherData.current.temp;

    var FarenTemp = ((KelvinTemp - 273.15) * 1.80 +32).toFixed(2);

    console.log("Current Temperature:" + FarenTemp);

    $("#currCityTemp").text("Temperature: " + FarenTemp);

    //HUMIDITY 

    var Humidity = weatherData.current.humidity;
    
    console.log("Current Humidity:" + Humidity);

    $("#currCityHumidity").text("Humidity: " + Humidity + "%");

    //WIND SPEED 

    var windSpeed = weatherData.current.wind_speed;
    
    console.log("Current Wind Speed:" + windSpeed);

    $("#currCityWind").text("Wind Speed: " + windSpeed)

    //UV INDEX
    
    var uVIndex = weatherData.current.uvi;

    console.log("Current UV Index: " + uVIndex);

    $("#cityUVInd").text("UV Index: " + uVIndex);

    //TO CALL THE CORRECT FIVE DAY FORECAST WE MUST KNOW WHICH ARRAY TO USE. I HAVE CHOSEN THE ARRAYS MATCHING THE NOON FORECAST FOR EACH DAY.

    //THESE ALL NEED TO NOW BE ATTACHED TO THEIR PLACES IN THE HTML.

    //DAY ONE:
    var dayOneDate = currDateEl + 24;

    $("#dayOneDate").text(dayOneDate);

    var dayOneIcon = forecastData.list[3].weather[0].icon;
    
    console.log("Day One Icon:" + dayOneIcon);

    $("#dayOneIcon").text(dayOneIcon);

    var dayOneTempK = forecastData.list[3].main.temp;
    
    var dayOneTemp = ((dayOneTempK - 273.15) * 1.80 +32).toFixed(2);

    console.log("Day One Temp:" + dayOneTemp);

    $("#dayOneTemp").text("Temperature: " + dayOneTemp);

    var dayOneHumidity = forecastData.list[3].main.humidity;

    console.log("Day One Humidity:" + dayOneHumidity);

    $("#dayOneHumidity").text("Humditiy: " + dayOneHumidity + "%");

  //DAY TWP:
    
    var dayTwoIcon = forecastData.list[11].weather[0].icon;
    
    console.log("Day Two Icon:" + dayTwoIcon);

    var dayTwoTemp = forecastData.list[11].main.temp;  //THIS NEEDS TO BE CONVERTED TO FARENHEIT

    console.log("Day Two Temp:" + dayTwoTemp);

    var dayTwoHumidity = forecastData.list[11].main.humidity;

    console.log("Day Two Humidity:" + dayTwoHumidity);

    //DAY THREE:
    
    var dayThreeIcon = forecastData.list[19].weather[0].icon;
    
    console.log("Day Three Icon:" + dayThreeIcon);

    var dayThreeTemp = forecastData.list[19].main.temp;  //THIS NEEDS TO BE CONVERTED TO FARENHEIT

    console.log("Day Three Temp:" + dayThreeTemp);

    var dayThreeHumidity = forecastData.list[19].main.humidity;

    console.log("Day Three Humidity:" + dayThreeHumidity);

    //DAY FOUR:
    
    var dayFourIcon = forecastData.list[27].weather[0].icon;
    
    console.log("Day Four Icon:" + dayFourIcon);

    var dayFourTemp = forecastData.list[27].main.temp;  //THIS NEEDS TO BE CONVERTED TO FARENHEIT

    console.log("Day Four Temp:" + dayFourTemp);

    var dayFourHumidity = forecastData.list[27].main.humidity;

    console.log("Day Four Humidity:" + dayFourHumidity);

    //DAY FIVE:
    
    var dayFiveIcon = forecastData.list[35].weather[0].icon;
    
    console.log("Day Five Icon:" + dayFiveIcon);

    var dayFiveTemp = forecastData.list[35].main.temp;  //THIS NEEDS TO BE CONVERTED TO FARENHEIT

    console.log("Day Five Temp:" + dayFiveTemp);

    var dayFiveHumidity = forecastData.list[35].main.humidity;

    console.log("Day Five Humidity:" + dayFiveHumidity);




})
})

    });