# Bites - Web App

> F&B web app created with React.js

A react-based web application project that provides users with a seamless and intuitive experience for discovering food places in Singapore. Leveraging the Singapore Tourism Board API, we've crafted a user-friendly interface that allows users to explore a diverse array of dining options across the city-state.

## Purpose

### ⭐️ Main Page:

- Random restaurant recommendations are provided.
  Users can search for restaurants using keywords.

### ⭐️ Post-Search Page:

- Displays 20 search results at a time.
  Users can load more results by clicking the "Load More" button.
  Filtering options are available to refine search results.

### ⭐️ Detail Page:

- Provides detailed information about a selected restaurant.
  Includes features such as location map for easy navigation.

### ⭐️ User Page:

- Allows users to log in and they can view their saved restaurants list in the "My List" section.

## Dependencies

The project utilizes the following libraries and dependencies:

- react: ^18.2.0
- react-dom: ^18.2.0
- react-redux: ^9.1.0
- react-router-dom: ^6.21.1
- @mui/material: ^5.15.3
- @reduxjs/toolkit: ^2.2.1
- leaflet: ^1.9.4
- axios: ^1.6.5

<!--
##
## Screenshots

|         Main Page         |        Search Page        |
| :-----------------------: | :-----------------------: |
| <img width="329" src=""/> | <img width="329" src=""/> |
|        Detail Page        |         User Page         |
| <img width="329" src=""/> | <img width="329" src=""/> |

---
-->

## Getting Started

### Requirements

For building and running the application you need:

- Node.js 20.9.0
- Npm 10.1.0

You need to create your own `.env` file and include your key from https://tih-dev.stb.gov.sg/getting-started:

```
REACT_APP_STB_API_KEY=YOURKEY
```

### Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm start
```

## Authors

This project was originally developed as a group project by a team of four members. Following the completion of the group project, I continued to enhance and upgrade the application independently. I designed and implemented additional features to improve functionality and user experience.

Original Repo: [@SCTP5-Project-4](https://github.com/xinyli-zzz/SCTP5-Project-4.git)

## Version History

- 0.1
  - Initial Release

<!--
## Directory Structure

```bash
└── src
    ├── App.css
    ├── App.js
    ├── api
    │   ├── fnb-api.js
    │   └── media-api.js
    ├── assets
    ├── components
    │   ├── Card.js
    │   ├── Card.module.css
    │   ├── ErrorElement.js
    │   ├── Filter.js
    │   ├── Filter.module.css
    │   ├── Filter.old.md
    │   ├── FilterChip.js
    │   ├── FormText.js
    │   ├── Header.js
    │   ├── Header.module.css
    │   ├── Hero.js
    │   ├── Map.js
    │   ├── Recommendation.js
    │   ├── RestaurantCard.js
    │   ├── RestaurantDetail.js
    │   ├── RestaurantDetail.module.css
    │   ├── RestaurantListing.js
    │   ├── RestaurantTable.js
    │   ├── ScrollToTop.js
    │   ├── SearchBar.js
    │   ├── User.module.css
    │   ├── UserBar.js
    │   ├── UserBar.old.md
    │   ├── UserInfo.js
    │   ├── UserLogin.js
    │   └── index.js
    ├── context
    │   ├── ColorModeContext.js
    │   ├── RestaurantContext.js
    │   ├── UserContext.js
    │   └── userSlice.js
    ├── index.css
    ├── index.js
    ├── layouts
    │   └── RootLayout.js
    ├── pages
    │   ├── About.js
    │   ├── DefaultPage.js
    │   ├── Home.js
    │   ├── Home.module.css
    │   ├── Restaurants.js
    │   └── index.js
    └── store.js

```
-->

<!--
## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details -->
