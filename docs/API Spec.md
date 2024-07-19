
# API Specification
Mosaicify has a well-defined RESTful API which allows for flawless functioning. This file lists all endpoints exposed by the API and explains what they do.

1. POST - `/auth/login` \
Handles user login.

2. POST - `/auth/logout` \
Handles user logout.

3. POST - `/auth/create` \
Handles user signups.

4. GET - `/users` \
Gets all users

5. GET - `/users/current` \
Gets data about the currently logged in user

6. GET - `/users/{userID}` \
Gets data about the user with `id = userID`

7. GET - `/users/{userID}/followers` \
Gets data of all followers of `userID`

8. GET - `/users/{userID}/following` \
Gets data of all users followed by `userID`

9. GET - `/users/{userID}/likedPosts`
Gets all posts liked by `userID`

10. POST - `/users/{userID}/follow` \
Allows current user to follow `userID`

11. GET - `/posts` \
Get all posts

12. GET - `/posts/current` \
Get posts by currently logged in user

13. GET - `/posts/{postID}` \
Get post with `id = postID`

14. GET - `/posts/{postID}/likes` \
Get info about which users have liked `postID`

15. POST - `/posts/{postID}/addLike` \
Allows current user to like `postID`

16. GET - `/posts/{postID}/comments` \
Gets all comments on `postID`

17. POST - `/posts/{postID}/addComment` \
Allows current user to comment on `postID`

18. DELETE - `/posts/{postID}`
Allows current user to delete `postID` if created by them

19. GET - `/comments` \
Gets all comments made by all users

20. GET - `/comments/current` \
Gets all comments made by currently logged in user

21. GET - `/comments/{commentID}` \
Gets comment which has `id = commentID`

22. DELETE - `/comments/{commentID}` \
Allows current user to delete `commentID` if created by them

23. PUT - `/comments/{commentID}` \
Allows current user to update `commentID` if created by them