# Food Truck Finder

Eric Johnson

Levvel Front-end Project

7/2/2019

## Overview

The purpose of Food Truck Finder is to create an application that will allow users to view the many food trucks that are available in the city of charlotte. This was accomplished using the Angular front-end framework along with the NGRX state management library. This application also uses the Mapbox library to create dynamic maps that allow the user to view the locations of these trucks within charlotte. The Yelp fusion api was used to gather the data that is used to populate the site with all the local food truck's information. Bootstrap was used in the design of this site to ensure that all the aspects of the application were neat and organized.
 
## Pages

This application consists of three main pages. 

  - Map page ("/map" or "/")
  - Favorites page ("/favorites")
  - Truck page ("truck/:id")

Angular routing was used to create the navigation between the pages and to determine which page component is displayed.

### Map Page

The map page acts as the home page of the application. From here the user may view the results of the yelp API search in the results section, as well as the map. The user may also use the search bar and filter form to gather and display more relevant data to what they are searching for. 

#### Search Bar

The search bar will initially look for an exact match to what was searched using the yelp api. If it finds an exact match then only that is displayed in the results and map section. However, if there is no exact match a yelp api query will be made looking for any relevant food trucks to that search.

#### Filter Form

Once the application has gathered the food truck data, it will look through the collected data and gather the rating, price and categories of the trucks whose information have been gathered. Using this information the application will dynamically create the options for the form so that it will only display filters that are contained within that group of food trucks. Once the filter form is submitted, the trucks that are displayed on both the map and results sections will be changed to that of the trucks that match the filter that was submitted. The filter is stored as a state on the site so until the user either makes a new search or resets the filter then no matter what pages are navigated to the filter will continue to display only the trucks that match the filter when the user returns to the map page.

#### Map Section

This section contains the map that is generated using the Mapbox library. This map will display markers for all of the current food trucks that have been searched for or filtered by the user. This map is draggable and scrollable. The map will display all the food trucks that are within its bounds and will refresh to display whatever food trucks are within its bounds when the it is dragged to a new area. The markers are clickable and upon clicking one of them the user will be redirected to that trucks individual page.

#### Results Section

The results section consists of a scrollable section that contains links to each of the pages of the trucks that have been gathered through. This was created to provide a quicker way for users to navigate to a specific trucks page without the need of having to find the marker of that truck on the map.

### Truck Page

The truck page is viewed when a user selects a marker or a truck on the map or favorites page. From this page the user may view relevant information about the truck as well as favorite the truck if they wish. If the trucks has already been favorited the page will include a favorite icon to indicate that the user has already favorited this truck, as well as a button to unfavorite the truck if they wish. A link to the yelp page regarding this truck is also included in case the user wishes to view additional information regarding it.

### Favorites Page

This page displays all of the trucks that the user has favorited. These favorited trucks are displayed in a favorites list section and a map section that displays the favorited trucks as markers on a map similar to the one found on the map page.

#### Favorites List

This contains a list of all the trucks that the user has favorited. The user may also unfavorite a truck from this page by clicking the "unfavorite" button listed next to the corresponding truck within the favorites list section. When a user unfavorites a truck, the page will then automatically update the map and list so that the unfavorited truck is no longer displayed as a marker or a list item. Also the user will be navigated to the individual trucks page if they select the list item of that truck.

#### Favorites Map

This map acts similar to that of the map found on the map page, however it only displays the trucks that are favorited by the user. Like the map on the map page it is draggable and clicking a marker will bring the user to that markers truck page

## Components

By creating this application using the angular framework, re-usable components are able to be created providing more consistency and allowing the programmer to not have to repeat himself. The components used in this application consist of a navigation bar, footer, results list, truck info and map

#### Navigation Bar

The navigation bar provides the user with several links so that they may navigate the site without having to hit the back button. This component is used on each page and depending on the current page it will change the active link so the user will have further confirmation to tell exactly where they are on the site.

#### Footer

This component provides further navigation options for the user as it contains links to both the map and favorites page. It is used on every page.

#### Results List

The results list is used on both the map and favorites page to display either a list of the user's favorites or the search/filter results. An object array of trucks or favorites are passed in as a prop which are then used to populate the list. Also another prop "search" is used to determine which variation of the results list is displayed based on the page. The list on the results page included an unfavorite button so that the user may remove that item from their favorites. The list on the map page is scrollable as there are typlically a multitude of results that the user may be able to view that would extend far down the web page if it were not scrollable.

#### Truck Info

The Truck info component is the content that is found on the truck page. This component consists of a bootstrap card that displays an image of the food truck, the food trucks infomation and a map that consists of a marker where that food truck is located. A truck object is passed into this component as a prop and is used to populate this card with the appropriate information. This page also is dynamic in that it will check if that food truck is a favorite of the user, if it is it will include a heart icon next to the truck name. This component also has a favorite/unfavorite button that will provide the user the option to favorite or unfavorite the truck. Similar to the heart icon, depending on the favorite status of the truck the appropriate button will be displayed. 

#### Map

The map component is created using the mapbox library. This component is used on both the favorites and map pages. This component takes in an object array of markers that are generated using either the trucks or favorites state on the page it is generated on. These markers are then displayed throughout the map to indicate where food trucks are located throughout charlotte. The map is draggable and users can navigate to a specific trucks page when the user clicks on that trucks marker.

## Store

The NGRX library was used for state management of this application. Many states were used throughout this application so that when any of these states are changed the components that use them will automatically update. 

#### Favorites

The favorites state consists of an object array of "favorite" objects. The favorite object consists of relevant information about a food truck that has been favorited. This state is used to moniter all of the trucks that have been favorited by the user.

#### Trucks

The trucks state consists of an object array of "truck" objects which are very similar to that of the "favorite" object. This state is populated by the results of the yelp api query. This state keeps track of the original group of trucks that are pulled from the api so that the user may reset the filter back to their search if they wish to re-evaluate their original search results.

#### Filter

The filter state is used to determine what trucks are displayed on the map and results list sections. This state is an object that has price, category and rating properties that correspond with the filter forms sections.

#### FilterArray

The filterArray state provides a sort of back up to the filters that the user has used. This allows the user to view other parts of the site such as their favorites or an individual trucks page without losing the filter they had been previously using on the map page.

#### isFiltered

This state is a boolean value that is used to determine whether the original trucks state or the filteredTrucks object array is used to populate the markers and list items found on the map and results list section.

#### Markers

The markers state is used to store all the markers that are generated from the trucks or filtered trucks list. This state is passed into the map component on the map page so that any time the trucks or filtered trucks are altered the map will be updated to reflect those changes. 

#### FavMarkers

Similar to the markers state the favMarkers is used to dynamically update the markers found on the map within the favorites page. As the favorites state is updated so will this state be ensuring that the map will be updated to reflect any changes.
