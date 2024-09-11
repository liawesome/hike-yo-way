# Project Title

Hike-yo-way

## Overview

What is your app? Give a brief description in a couple of sentences.

Hike-yo-way( Hike your way) is a place for hiking enthusiasts to discover personalized hiking trails based on their feelings, favorite views, and past experiences through AI-powered algorthim.


### Problem Space

Why is your app needed? Give any background information around any pain points or other reasons.

While existing hiking apps offer search functionality based on explicit trail attributes (distance, elevation gain, difficulty, etc.), users often find the process time-consuming and may struggle to find trails that truly match their preferences. Hike-yo-way addresses this by:

- Allowing users to describe their desired hiking experience using natural language.
- Enabling users to upload images of landscapes they find appealing.
- Utilizing AI to match user preferences with suitable hiking trails.
- Providing personalized recommendations based on the user's location and past experiences.


### User Profile

Who will use your app? How will they use it? Add any special considerations that your app must take into account.

- Hiking enthusiasts of all levels
- Users seeking trails based on their current mood or desired scenery
- Travelers looking for hiking options in new locations
- Individuals who want to keep track of their hiking experiences


### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.


User Authentication and Profile Management

- As a user, I want to create an account and manage my profile.
- As a user, I want to log in to access personalized features.


Trail Discovery

- As a user, I want to describe my desired hiking experience using natural language.
- As a user, I want to upload images of landscapes I find appealing.
- As a user, I want to receive trail recommendations based on my current location and preferences.


Trail Information

- As a user, I want to view recommended trails on a map.
- As a user, I want to see detailed information about each trail, including difficulty, length, and elevation gain.
- As a user, I want to view aggregated user comments and ratings for each trail.


User Interaction

- As a logged-in user, I want to rate trails I've visited on a 5-point scale.
- As a logged-in user, I want to upload photos from my hiking experiences.
- As a logged-in user, I want to leave comments or tips for specific trails.


Personal Hiking History

- As a logged-in user, I want to view a list of trails I've visited.
- As a logged-in user, I want to filter my visited trails by rating or location.
- As a logged-in user, I want to see statistics about my hiking history (e.g., total distance hiked, elevation gained).


Offline Functionality

- As a user, I want to download trail information for offline use.
- As a user, I want to record my hikes even when I don't have an internet connection.


## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

- React
- MongoDB
- Express
Client libraries: 
    - react
    - react-router
    - axios
Server libraries:
    - knex
    - express
Authentication
	- bcrypt for password hashing 
	- JWT

Maps
- React Native Maps
- Apple Map

Offline Functionality
- AsyncStorage or Redux Persist

Deployment
-Heroku


### APIs

List any external sources of data that will be used in your app.

- No external APIs will be used for the first sprint
- https://developer.apple.com/documentation/mapkitjs/mapkit/addressfilter

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.


## 1. Home Page
Immediate trail discovery based on user input and location.

Key Features:
- Location selection
- Quick input methods:
  a) Text field for describing desired hike
  b) Image upload option for similar trail matching
- "Find Trails" button
- Two suggested trails displayed immediately after input
- Option to "See More Trails" if suggestions aren't ideal

User Flow:
1. User selects location
2. User inputs trail preferences (text or image)
3. Two trail suggestions appear instantly
4. User can tap on a trail to view details or choose to see more options

Additional Elements:
- User authentication (login/signup) accessible via a menu icon
- Quick access to user profile (if logged in)

## 2. Trail Details Page
Comprehensive information about a selected trail.

Key Features:
- Trail name and key stats (difficulty, length, elevation gain)
- Photo gallery (swipeable)
- Brief description
- Interactive map snippet (expandable)
- User ratings and top reviews
- "Start Hike" button
- Option to save trail or share

## 3. User Profile Page
Personal space for users to track their hiking experiences.

Key Features:
- User info and stats (hikes completed, total distance, etc.)
- Recently viewed trails
- Saved trails
- Personal hiking gallery
- Achievements/Badges


## Optional 4th Page: Expanded Trail List
This page would only be accessed if user chooses "See More Trails" from the Home page.

Key Features:
- List of trails based on user's initial input
- Filter and sort options
- Each trail item shows a small image, name, and key stats
- Tapping a trail leads to the Trail Details page

User Flow:
1. User chooses "See More Trails" from Home page
2. Expanded list of relevant trails appears
3. User can refine results or select a trail to view details



### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.


#### Home Page
page 1 

#### Register Page
page 2 

#### Trail Details Page
page 3 

#### User Profile Page
page 4 

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out. 

Database: 
Users
Trails
Reviews
Hikes (completed hikes by users)
Photos


// Users
```
{
  _id: ObjectId,
  username: String,
  email: String,
  password_hash: String,
  created_at: Date,
  completed_hikes: [
    {
      trail_id: ObjectId,
      date_completed: Date,
      duration: Number  // in minutes
    }
  ],
  preferences: [
    {
      input_text: String,
      preference_type: String,  // 'feeling', 'scenery', 'difficulty', 'other'
      created_at: Date
    }
  ]
}
```

//Trials
```
{
  _id: ObjectId,
  name: String,
  description: String,
  difficulty: String,  // 'Easy', 'Moderate', 'Hard'
  length: Number,
  elevation_gain: Number,
  location: String,
  coordinates: {
    type: "Point",
    coordinates: [Number, Number]  // [longitude, latitude]
  },
  reviews: [
    {
      user_id: ObjectId,
      rating: Number,
      comment: String,
      created_at: Date
    }
  ],
  photos: [
    {
      user_id: ObjectId,
      photo_url: String,
      caption: String,
      uploaded_at: Date
    }
  ]
}
```



### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.


## 1. User Authentication

### POST /api/auth/register
Create a new user account.

Parameters:
- username (string)
- email (string)
- password (string)

Example Response:
```json
{
  "status": "success",
  "data": {
    "user_id": 12345,
    "username": "hikerlover",
    "email": "hiker@example.com"
  }
}
```

### POST /api/auth/login
Log in an existing user.

Parameters:
- email (string)
- password (string)

Example Response:
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "user_id": 12345,
      "username": "hikerlover"
    }
  }
}
```

## 2. Trail Discovery

### POST /api/trails/discover
Get trail recommendations based on user input.

Parameters:
- location (string)
- preference (string)
- user_id (integer, optional)

Example Response:
```json
{
  "status": "success",
  "data": {
    "trails": [
      {
        "trail_id": 1,
        "name": "Sunset Peak Trail",
        "difficulty": "Moderate",
        "length": 5.2,
        "elevation_gain": 1200,
        "rating": 4.7
      },
      {
        "trail_id": 2,
        "name": "Lake View Loop",
        "difficulty": "Easy",
        "length": 3.5,
        "elevation_gain": 500,
        "rating": 4.5
      }
    ]
  }
}
```

## 3. Trail Details

### GET /api/trails/:trail_id
Get detailed information about a specific trail.

Parameters:
- trail_id (integer, in URL)

Example Response:
```json
{
  "status": "success",
  "data": {
    "trail": {
      "trail_id": 1,
      "name": "Sunset Peak Trail",
      "description": "Beautiful trail with panoramic views...",
      "difficulty": "Moderate",
      "length": 5.2,
      "elevation_gain": 1200,
      "location": "Mountain National Park",
      "coordinates": {
        "latitude": 34.2234,
        "longitude": -118.0123
      },
      "rating": 4.7,
      "reviews": [
        {
          "user": "hikerlover",
          "rating": 5,
          "comment": "Amazing views at the top!"
        }
      ],
      "photos": [
        {
          "url": "https://example.com/trail1_photo1.jpg",
          "caption": "Sunset view from the peak"
        }
      ]
    }
  }
}
```

## 4. User Preferences

### POST /api/users/preferences
Save a user's trail preference.

Parameters:
- user_id (integer)
- input_text (string)
- preference_type (string: 'feeling', 'scenery', 'difficulty', or 'other')

Example Response:
```json
{
  "status": "success",
  "data": {
    "preference_id": 789,
    "message": "Preference saved successfully"
  }
}
```

## 5. User Profile

### GET /api/users/:user_id/profile
Get user profile information including hiking history.

Parameters:
- user_id (integer, in URL)

Example Response:
```json
{
  "status": "success",
  "data": {
    "user": {
      "user_id": 12345,
      "username": "hikerlover",
      "email": "hiker@example.com",
      "completed_hikes": [
        {
          "trail_id": 1,
          "name": "Sunset Peak Trail",
          "date_completed": "2023-09-15",
          "duration": 180
        }
      ],
      "total_distance": 15.7,
      "total_elevation_gain": 3500
    }
  }
}
```

## 6. Reviews

### POST /api/trails/:trail_id/reviews
Add a review for a trail.

Parameters:
- user_id (integer)
- trail_id (integer, in URL)
- rating (integer, 1-5)
- comment (string)

Example Response:
```json
{
  "status": "success",
  "data": {
    "review_id": 456,
    "message": "Review added successfully"
  }
}
```

## 7. Photos

### POST /api/trails/:trail_id/photos
Upload a photo for a trail.

Parameters:
- user_id (integer)
- trail_id (integer, in URL)
- photo (file)
- caption (string, optional)

Example Response:
```json
{
  "status": "success",
  "data": {
    "photo_id": 789,
    "url": "https://example.com/uploads/trail1_photo2.jpg",
    "message": "Photo uploaded successfully"
  }
}
```

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date. 

---

## Future Implementations
Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

