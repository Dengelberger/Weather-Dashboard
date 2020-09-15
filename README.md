# Weather-Dashboard

For this project we had to create an interactive weather dashboard that showed specific information for a city entered into search.  It captured and displayed current data as well as a five-day forecast for that location using API's and AJAX on the back-end development.  It also saved the last 8 cities that have been searched, not counting duplicates.

I used a local storage array to record and save all the search history, then included code that removed duplicate searches and returned an array that had unique city names to add to the buttons.  The array stores in reverse order (using "unshift") so that the most recent search is in position 0 in the array.  Then, when the list of buttons on the left gets refreshed, the last searched new city is at the top of the list.

Clicking on any of those buttons in the search history recalls all the information at the right.  Here are screenshots of the page in various states:


I tried to utilize many of the techniques we learned in class this week as part of my coding, as well as drawing from the CSS coding we learned earlier. I hope you enjoy my weather dashboard!

