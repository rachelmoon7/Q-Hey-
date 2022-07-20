# Q & Hey!

Q & Hey is an intentional social media platform that focuses on moderating a single conversation between a group of friends through photos. This is accomplished by prompting a single question every week that users can ponder and respond by posting images with  captions using the Cloudinary API.  Users can dive deeper into the conversation by commenting and/or reacting to posts with a like, love, laugh, or anger reaction.  Users can also invite other users to the conversation by sending friend requests, which can be accepted or denied. Once accepted, users have access to each other's posts and freedom to partake in future weekly conversations together.

# Techstack

Python, React, Javascript, PostgreSQL, SQLAlchemy, Jinja, React-Bootstrap

# Features

### Landing Page
Upon logging in users can view the conversation of the week which entails a question and its answers. The question rotates weekly from a pool of pre-selected questions. The answers rendered here are data that is fetched from the database and returned to the frontend by the server.

To partake in the conversation, users can choose to answer the weekly question with images and may even add a caption. To answer, users can select up to two image files that will be sent as a formData to the Cloudinary API which performs logic to create and respond with a unique image URL. The image URLs and caption of this new post are stored in our SQL database and are retrieved to display the post on the frontend.

### My Profile Page

Users can go to their own profile to see all of their own posts. This page leverages React’s reusable components to conditionally render posts only belonging to the logged in user.

### My Friends Page

Users have the ability to search for users and send friend requests, accept/deny friend requests, see whom they sent a friend request to, and see a list of their current friends. If a user clicks on their friend's name on the friend list, all of that friend’s posts will render, reusing components in a similar architectural pattern that is used to display the logged in user’s own profile page.