# magd150-Projects

A repository with a few of the projects I made for my Intro to Media Arts and Game Development class, built using p5js.
Run the individual projects by downloading them and opening the index.html file within them.
Final Project has additional requirements as noted below.

## Project 3 - Constellations

Originally this project was to create a procedural constellation generator, but time constraints and convincing random constellations limited the project down to a random starry sky generator, with functionality for the user to draw their own constellations. 
Click anywhere in the starfield to start a line, and then click a second time for it to appear between the selected points.

## Project 4 - Gravity

An attempt at creating two dimensional gravity. When the simulation is started, only a star in the middle is placed.
Click anywhere to begin placing a planet, and then click a second time away from the starting position to initialize its velocity. After the second click the planet is placed and visible, and semi-functionally interacts gravitationally with the center star. Unfortunately, planets do not interact with each other.

## Project 5 - Lightning

A more traditional arcade type game, you play as a red square using left and right on the keyboard to move from side to side, and dodge impending lightning strikes from clouds above. Clouds are initilized with random speed, and strike at random intervals, but glow yellow before striking. You gain a point for each strike dodged, and lose if you get hit. Highest score to my knowledge is 96.

# Final Project

My final project is more of a tech demo, based off of code from Project 4. You play as a space ship, using the mouse to control your direction, and click to burn your engine in that direction. Gravity is simulated between several planets, moons, and the central star, relative to the player, although celestial objects are set on rails relative to each other.

The planets/moons have different classes:
- Star : high gravity
- Grey : basic attributes
- Light Blue : super low friction
- Inverted : inverse gravity
- pink : bouncy (sometimes) 
- gas giant :can fly partially into it (sometimes flings you out of the universe) 

Escape pauses the game, and 8 opens up a debug overlay the displays various stats.

The final project requires a local web server to run with images.
https://github.com/processing/p5.js/wiki/Local-server
I have tried the python simplehttpserver which did NOT work at the time of development,
and the node http-server, which is what I reccomend. I believe the Chrome Web Server should work as well.

If you don't want to run a local server, the project will still run, but upon loading none of the images for the planets or background will load. If you then hit 8, and enable the debug overlay, everything will be displayed using basic p5js geometry.
