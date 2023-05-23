# A WILD SOCIAL NETWORK

## Description
A Wild Social Network is a social network api that uses MongoDB to manage its database. Using this api you can create and update Users that can be assigned Thoughts and Friends. Thoughts can be updated and assigned Reactions. Both Friends and Reactions can be removed as well.

[Click here for a video demonstrating this project's usage!](https://www.youtube.com/watch?v=qWa2Kmlwt_0)


## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Credits](#credits)

- [Features](#features)

- [License](#license)

## Installation
To install simply download or clone this repository into a folder of your choosing on your local machine.


## Usage
After installed open up a terminal from the root folder of this project and invoke "npm start" in the command line. This will start the server and connect to the MongoDB database. Once started you can test the User, Thoughts, Reactions and Friends routes by passing GET, POST, PUT and DELETE http requests through insomnia. The database will then be updated using the request bodies if applicable. Please refer to the video linked in the description for a more detailed overview.


## Features
- Connects to MongoDB database
- Allows for testing of Users, Thoughts, Reactions and Friends routes
- Allows GET, POST, PUT and DELETE http requests to routes
- Updates database to reflect request bodies

## License
Licensed under the MIT License.

GitHub: [navidliwa](https://github.com/navidliwa)