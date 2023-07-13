# Minesweeper

A simple Minesweeper game made using **JavaScript, PHP** & **CSS**. This project is a part of the application for Core position in [Lambda, IIT Hyderabad](https://iith.dev/).


# Structure

This project consists of two main sections:
 1. **User Authentication**: This is the landing page of the website. The user has to sign in using their existing credentials or create a new account in order to play the game.
 2. **Game Page**: This page contains the game implementation.
 
## Instructions
 1. The user has to register themselves in the landing page with a unique **Username** of their choice (subject to availability), **Email** and **Password**.
 4. The password must contain at least one alphabet of lower and upper case, a digit, a special character and at least 8character long.
 5. They can also use their existing credentials to sign in.
 6. After successful sign in, User need to click *new game* to start the game.
 7. Current activity and verdict of game will be displayed below the *new game* button.
 8. User can see the time of current game and their **best score**.
 9. The **leaderboard** consists of top 3 scores and get updated every 10 seconds.
 10. User can successfully logout using the *logout* button on the top.
 
 
## Game Rules
 
 1. The game map consists of a **20&times;20** grid. There are **50 mines** among the 400 tiles. Each tile may contain a mine.
 12. It is guaranteed that the **top-left tile doesn't contain a mine**.
 13. The objective of the game is to **uncover all the empty tiles** without uncovering a tile with mine.
 14. User can uncover a tile by **clicking** on it.
 15. Pressing **spacebar/ long touch** flags a tile with flag icon.
 16. Number on a uncovered tile denotes the number of mines around it.
 17. Pressing spacebar/ long touch on a numbered tile triggers click on all its non-flagged neighbors.
 18. The above feature works only when number of flagged tiles around it are equal to the number on the tile.
## Implementation
 1. **User Authentication**: PHP was used to authenticate user by fetching data from database/ creating new user and redirect user to game page. Users who are not logged in cannot access the game page. A **Regular Expression** is used to verify the constraints on password. JavaScript was used to switch between sign in and sign up forms.
 2. **Game Implementation**: Mostly, JavaScript was used to handle all the function used for game. PHP was used to update user score in database and logout. AJAX was used to update leaderboard every 10 seconds in real-time. CSS classes were used to determine the tiles with mines, uncovered tiles and numbered tiles.

## Hosting

This website is hosted at ____________.
