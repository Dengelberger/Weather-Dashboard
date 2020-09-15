//WE ARE USING JQUERY.
$(document).ready(function () {

  //CREATE ARRAY TO CAPTURE THE CITY HISTORY FROM LOCAL STORAGE:

  function removeDuplicates(data) {
    return data.filter((value, index) => data.indexOf(value) === index);
  }
  var cityNameHistory = [];

  function renderSearchHistory() {
  if (JSON.parse(localStorage.getItem("cityNameList")) !== null) {
    cityNameHistory = JSON.parse(localStorage.getItem("cityNameList"));

    console.log(cityNameHistory);

    var citiesNoDupes = removeDuplicates(cityNameHistory);

   //SET THE CITIES FROM THE CITY NAME HISTORY ARRAY TO THE HISTORY BUTTONS
   $("#recentCities").empty();
    for (var i = 0; i < 8; i++) {

     
        // if (cityNameHistory.indexOf(cName) === i && cityNameHistory.indexOf(cName, i + 1) === -1) {
          // Another occurence does not occur, thus c must be the first non-repeat character

          var cityHist = $("<button>");  
          cityHist.addClass('cityHist col-sm-12')
          cityHist.text(citiesNoDupes[i]);

          $("#recentCities").append(cityHist);
        // }
    }
  }
  }
 renderSearchHistory();
  //BRINGS IN THE CURRENT DATE - THIS PART IS COMPLETE

  var date = $("#currDate");

  currDateEl = moment().format("MM/DD/YY");
  console.log(currDateEl);
  date.text("(" + currDateEl + ")");

  // MY API KEY - THIS PART IS COMPLETE

  var APIKey = "815cefae75b45f52456c8ed196bcea7f";

  // A VARIABLE TO CAPTURE THE CITY NAME THAT IS INPUT. 

  $(document).on('click', "#searchBtn", function (event) {
    event.preventDefault();
    var cityName = document.querySelector("#searchBox").value;
    cityNameHistory.unshift(cityName);
    localStorage.setItem("cityNameList", JSON.stringify(cityNameHistory));
    renderSearchHistory();
    console.log(cityName);
    searchCity(cityName);
  })
  // ON CLICK FOR THE CITY HISTORY BUTTONS:

  $(document).on('click', '.cityHist', function () {

    var savedCity = $(this).text();
    searchCity(savedCity);
  })
  // API QUERY FOR THE FIVE DAY FORECAST - WE NEED THIS FIRST TO GET LATITUDE AND LONGITUDE.  

  function searchCity(cityName) {

    var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    // AJAX CALL FOR THE FIVE DAY FORECAST - THIS PART IS COMPLETE
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function (locationData) {

      $("#currCityName").text(locationData.name);

      console.log(locationData);

      //CURRENT CITY LATITUDE AND LONGITUDE - THIS PART IS COMPLETE

      var currLat = locationData.coord.lat;
      var currLon = locationData.coord.lon;

      // QUERY API FOR THE CURRENT DAY WEATHER - THIS PART IS COMPLETE

      var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currLat + "&lon=" + currLon + "&exclude={part}&appid=" + APIKey;

      // AJAX CALL FOR THE CURRENT WEATHER - THIS PART IS COMPLETE

      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function (weatherData) {

        console.log(weatherData);

        //WEATHER LOGO FOR THE CURRENT WEATHER 

        var CurrLogo = weatherData.current.weather[0].icon;

        console.log("Current Weather Logo:" + CurrLogo);

        $("#currWeatherLogo").attr("src", "http://openweathermap.org/img/wn/" + CurrLogo + "@2x.png");

        //TEMPERATURE CONVERTED TO FARENHEIT 

        var KelvinTemp = weatherData.current.temp;

        var FarenTemp = ((KelvinTemp - 273.15) * 1.80 + 32).toFixed(0);

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

        var uVIndex = parseInt(weatherData.current.uvi);

        console.log("Current UV Index: " + uVIndex);

        $("#cityUVInd").text("UV Index: " + uVIndex);

        // UV Index Color Coding - how do I get it to be just a little box and not the whole line?

        if (uVIndex < 3) {
          $("#cityUVInd").css('background-color', 'green');
        } else if (uVIndex < 6) {
          $("#cityUVInd").css("background-color", 'yellow');
        } else if (uVIndex < 8) {
          $("#cityUVInd").css("background-color", 'orange');
        } else if (uVIndex < 11) {
          $("#cityUVInd").css("background-color", 'red');
        }
        else {
          $("#cityUVInd").css("background-color", 'purple');
        }


        //-------------------------------------------------------------------------
        //DAY ONE:

        var dayOneDate = moment().add(1, 'days').format('MM/DD/YY');

        console.log(dayOneDate);

        $("#dayOneDate").text(dayOneDate);

        //----------------------------------------------------------------------------

        var dayOneIcon = weatherData.daily[1].weather[0].icon;

        console.log("Day One Icon:" + dayOneIcon);

        $("#dayOneIcon").attr("src", "http://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png");

        //-------------------------------------------------------------------------------------

        var dayOneTempK = weatherData.daily[1].temp.day;

        var dayOneTemp = ((dayOneTempK - 273.15) * 1.80 + 32).toFixed(0);

        console.log("Day One Temp:" + dayOneTemp);

        $("#dayOneTemp").text("Temp (F): " + dayOneTemp);

        //----------------------------------------------------------------------------------

        var dayOneHumidity = weatherData.daily[1].humidity;

        console.log("Day One Humidity:" + dayOneHumidity);

        $("#dayOneHumidity").text("Humditiy: " + dayOneHumidity + "%");

        //-----------------------------------------------------------------------------------
        //DAY TWO:

        var dayTwoDate = moment().add(2, 'days').format('MM/DD/YY');

        console.log(dayTwoDate);

        $("#dayTwoDate").text(dayTwoDate);

        //----------------------------------------------------------------------------

        var dayTwoIcon = weatherData.daily[2].weather[0].icon;

        console.log("Day Two Icon:" + dayTwoIcon);

        $("#dayTwoIcon").attr("src", "http://openweathermap.org/img/wn/" + dayTwoIcon + "@2x.png");

        //-------------------------------------------------------------------------------------

        var dayTwoTempK = weatherData.daily[2].temp.day;

        var dayTwoTemp = ((dayTwoTempK - 273.15) * 1.80 + 32).toFixed(0);

        console.log("Day Two Temp:" + dayTwoTemp);

        $("#dayTwoTemp").text("Temp (F): " + dayTwoTemp);

        //----------------------------------------------------------------------------------

        var dayTwoHumidity = weatherData.daily[2].humidity;

        console.log("Day Two Humidity:" + dayTwoHumidity);

        $("#dayTwoHumidity").text("Humditiy: " + dayTwoHumidity + "%");

        // DAY THREE:

        var dayThreeDate = moment().add(3, 'days').format('MM/DD/YY');

        console.log(dayThreeDate);

        $("#dayThreeDate").text(dayThreeDate);

        //----------------------------------------------------------------------------

        var dayThreeIcon = weatherData.daily[3].weather[0].icon;

        console.log("Day Three Icon:" + dayThreeIcon);

        $("#dayThreeIcon").attr("src", "http://openweathermap.org/img/wn/" + dayThreeIcon + "@2x.png");

        //-------------------------------------------------------------------------------------

        var dayThreeTempK = weatherData.daily[3].temp.day;

        var dayThreeTemp = ((dayThreeTempK - 273.15) * 1.80 + 32).toFixed(0);

        console.log("Day Three Temp:" + dayThreeTemp);

        $("#dayThreeTemp").text("Temp (F): " + dayThreeTemp);

        //----------------------------------------------------------------------------------

        var dayThreeHumidity = weatherData.daily[3].humidity;

        console.log("Day Three Humidity:" + dayThreeHumidity);

        $("#dayThreeHumidity").text("Humditiy: " + dayThreeHumidity + "%");

        // DAY FOUR:  

        var dayFourDate = moment().add(4, 'days').format('MM/DD/YY');

        console.log(dayFourDate);

        $("#dayFourDate").text(dayFourDate);

        //----------------------------------------------------------------------------

        var dayFourIcon = weatherData.daily[4].weather[0].icon;

        console.log("Day Four Icon:" + dayFourIcon);

        $("#dayFourIcon").attr("src", "http://openweathermap.org/img/wn/" + dayFourIcon + "@2x.png");

        //-------------------------------------------------------------------------------------

        var dayFourTempK = weatherData.daily[4].temp.day;

        var dayFourTemp = ((dayFourTempK - 273.15) * 1.80 + 32).toFixed(0);

        console.log("Day Four Temp:" + dayFourTemp);

        $("#dayFourTemp").text("Temp (F): " + dayFourTemp);

        //----------------------------------------------------------------------------------

        var dayFourHumidity = weatherData.daily[4].humidity;

        console.log("Day Four Humidity:" + dayFourHumidity);

        $("#dayFourHumidity").text("Humditiy: " + dayFourHumidity + "%");

        //DAY FIVE:

        var dayFiveDate = moment().add(5, 'days').format('MM/DD/YY');

        console.log(dayFiveDate);

        $("#dayFiveDate").text(dayFiveDate);

        //----------------------------------------------------------------------------

        var dayFiveIcon = weatherData.daily[5].weather[0].icon;

        console.log("Day Five Icon:" + dayFiveIcon);

        $("#dayFiveIcon").attr("src", "http://openweathermap.org/img/wn/" + dayFiveIcon + "@2x.png");

        //-------------------------------------------------------------------------------------

        var dayFiveTempK = weatherData.daily[5].temp.day;

        var dayFiveTemp = ((dayFiveTempK - 273.15) * 1.80 + 32).toFixed(0);

        console.log("Day Five Temp:" + dayFiveTemp);

        $("#dayFiveTemp").text("Temp (F): " + dayFiveTemp);

        //----------------------------------------------------------------------------------

        var dayFiveHumidity = weatherData.daily[5].humidity;

        console.log("Day Five Humidity:" + dayFiveHumidity);

        $("#dayFiveHumidity").text("Humditiy: " + dayFiveHumidity + "%");

      })
    })
  }
});