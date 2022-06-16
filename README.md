# project_app
It is a sample learning project app

## Functionalities Implemented
1. Profile photo is shown in an octagon shape.
2. Press profile photo to add a story. (Input fields to upload news image, news headline and users views are provided).
3. Story can be viewed by clicking on the profile photo.
4. The story has a progress bar which automatically closes the story screen in 5 seconds.
5. When no story is added a plus symbol is shown on profile photo
6. When a story is added and has not been viewed, a yellow border is shown around profile picture.
7. When a story is added but has been viewed, a dull border is shown around profile picture.
8. Long press profile picture to change it, either choosing from gallery or by clicking through camera.
9. All the data related to user's profile is fetched using apollo client and graphql from the server.
10. The server fetches the files from a remote sql database and returns it to client using apollo server and graphql.
11. Several edge cases were also handled, eg. user pressing back button in middle of adding story or updating photo will not affect anything.

## Reference Screen Recording
<a href="url"><img src="recording.gif" width="300" ></a>
