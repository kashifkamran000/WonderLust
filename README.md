
# WonderLust
WonderLust is a web application that allows users to discover and share unique travel destinations. Users can register, log in, add travel listings with descriptions and images, comment on other listings, view listing locations on an interactive map, and authorized users have the ability to manage (edit/delete) their own listings.



##  Table of Contents
- Features
- Technologies Used
- Environment Variables
- Installation
- Usage
- Screenshots
- Acknowledgements

## Features
- User Authentication: Secure user registration and login functionality using Passport.js.
- Listings Management: Logged-in users can add new travel listings with descriptions, images, and location data.
- Interactive Maps: Seamlessly integrated Mapbox to display locations of listings on an interactive map.
- Commenting System: Engage with the community by commenting on other users' travel listings.
- Image Uploading: Effortlessly upload and manage images for listings via Cloudinary.
- Authorization Control: Only authorized users can edit or delete their own listings.


## Technologies Used
- Backend: Node.js, Express.js
- Frontend: EJS (Embedded JavaScript)
- Database: MongoDB
- Authentication: Passport.js
- Image Storage: Cloudinary
- Map Integration: Mapbox
- Other: HTML, CSS, JavaScript

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MAP_TOKEN`

`CLOUD_NAME`

`CLOUD_API_KEY`

`CLOUD_API_SECRET`





## Installation

1. Clone the repository:

```bash
  git clone https://github.com/kashifkamran000/WonderLust.git
  cd WonderLust
```
2. Install dependencies:
```bash
  npm install
```

3. Run the application:
```bash
  npm start
```

    
## Usage

- Register/Login: Create an account or log in if you already have one.
- Add Listings: Add new travel listings with descriptions, images, and location data.
- View Listings: Browse through listings and view their locations on an interactive map.
- Comments: Engage with other users by commenting on their listings.
- Manage Listings: Authorized users can edit or delete their own listings.


## Screensorts

Landing Page:


![1wonderlust](https://github.com/user-attachments/assets/c0db6038-d531-4661-8e2a-9a1a466f4952)


Registration Page:


![6wonderlust](https://github.com/user-attachments/assets/6cab86a5-2006-4462-9974-ecd26f3acf2a)


Login Page:


![5wonderlust](https://github.com/user-attachments/assets/37b730ea-d00d-4075-8737-dea6fa7d5628)


Add Listing Page:


![4wonderlust](https://github.com/user-attachments/assets/f18701db-3326-4654-855d-871005beffa5)


Listing Page: 


![7wonderlust](https://github.com/user-attachments/assets/dd829624-c87b-428e-8300-b68d3a462ee4)


## Acknowledgements

- Mapbox for providing map services.
- Cloudinary for image storage.
- Passport.js for authentication.










