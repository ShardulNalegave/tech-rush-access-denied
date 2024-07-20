
# API Specification
Mosaicify has a well-defined RESTful API which allows for flawless functioning. This file lists all endpoints exposed by the API and explains what they do.

- POST - `/auth/login` \
Handles user login.

- POST - `/auth/logout` \
Handles user logout.

- POST - `/auth/create` \
Handles user signups.

- GET - `/users` \
Gets all users

- GET - `/users/current` \
Gets data about the currently logged in user

- PUT - `/users/current` \
Updates user profile

- POST - `/users/current/profilePic` \
Set a new profile pic

- GET - `/users/{userID}` \
Gets data about the user with `id = userID`

- GET - `/users/{userID}/followers` \
Gets data of all followers of `userID`

- GET - `/users/{userID}/following` \
Gets data of all users followed by `userID`

- GET - `/users/{userID}/likedPosts` \
Gets all posts liked by `userID`

- POST - `/users/{userID}/follow` \
Allows current user to follow `userID`

- GET - `/users/{userID}/posts` \
Gets posts made by `userID`

- GET - `/posts` \
Get all posts

- POST - `/posts` \
Allows the currently logged in user to create a new post

- GET - `/posts/current` \
Get posts by currently logged in user

- GET - `/posts/current/feed` \
Get feed posts for currently logged in user

- GET - `/posts/{postID}` \
Get post with `id = postID`

- GET - `/posts/{postID}/likes` \
Get info about which users have liked `postID`

- POST - `/posts/{postID}/likes` \
Allows current user to like `postID`

- GET - `/posts/{postID}/comments` \
Gets all comments on `postID`

- POST - `/posts/{postID}/comments` \
Allows current user to comment on `postID`

- DELETE - `/posts/{postID}` \
Allows current user to delete `postID` if created by them

- GET - `/comments` \
Gets all comments made by all users

- GET - `/comments/current` \
Gets all comments made by currently logged in user

- GET - `/comments/{commentID}` \
Gets comment which has `id = commentID`

- DELETE - `/comments/{commentID}` \
Allows current user to delete `commentID` if created by them

- PUT - `/comments/{commentID}` \
Allows current user to update `commentID` if created by them