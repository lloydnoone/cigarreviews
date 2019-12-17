![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# cigar reviews
fullstack react app

![image](https://github.com/lloydnoone/cigarreviews/blob/master/Screenshot%202019-10-22%20at%2021.05.09.png?raw=true)

This was a project assigned to me by General Assembly during a software engineering immersive course. The purpose of the project was to solidify the skills we learnt while studying back-end technologies. This inluded learning react and interacting with public API's, Node.js and its popular packages. 

At that point in the course we had covered using react as a front end framework. So, after covering backend in the next unit we were given a weekend to put it all together by making our own simple API, a database using mongo, brcypt for authentication and react for the front-end. It was a solo project and we had two days to quickly put it together.

It is for cigar reviews. Users are able to view cigars, register, login, add, edit comment on and remove cigars in the database served up by the API.

## Built With

1. HTML5
2. CSS3
3. JavaScript
4. React 16
5. My cigar API
6. Node.js
7. express
8. npm
9. bcrypt
10. MongoDB
11. GitHub
12. Heroku

![image](https://github.com/lloydnoone/cigarreviews/blob/master/Screenshot%202019-10-22%20at%2021.06.00.png?raw=true)

## Deployment

The website is deployed on Heroku and it can be found here- https://cigarapi.herokuapp.com

## Getting Started

Anybody can browse the cigars by clicking on index. In order to add, edit and comment you must register or login if you have already. Users can only edit or comment on cigars they have uploaded. 

## How It Works

Users are authenticated using bcrypt. This is what enables the restrictions. The data on the cigars is stored in a cloud database and is persistent. When a user interacts with the cigars, API calls are made. Theses API calls get, add, edit or delete items in the database.

![image](https://github.com/lloydnoone/cigarreviews/blob/master/Screenshot%202019-10-22%20at%2021.07.04.png?raw=true)

Below is the code that handles the routes for each browser request. Generally for each route, the correct react component will be displated, the logic of the secure route will be enacted on certain routes and then the corresponding action on the data is enacted.

```javascript
router.route('/cigars')
  .get(cigars.index)
  .post(secureRoute, cigars.create)

router.route('/cigars/:id')
  .get(cigars.show)
  .delete(secureRoute, cigars.destroy)
  .put(secureRoute, cigars.update)

router.route('/cigars/:id/comments')
  .get(cigars.commentShow)
  .post(secureRoute, cigars.commentCreate)

router.route('/cigars/:id/comments/:commentId')
  .delete(secureRoute, cigars.commentDelete)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/profile')
  .get(secureRoute, users.profile)
  
```

## Wins and Blockers

The main challenge in this project was figuring out the best way to cyle through each working part pf the app and developing them in iterations as each part grew. This was especially challenging as i had only just picked up most of these technologies and given the time constraint for the initial deliverable.

The part where i had the most difficulty was picking up authentication. It was hard to understand but i realised there a some functions in packages that i dont have to completely understand how they work yet as long as i know what they do.

It was a good feeling to pull everything together that we had learned and gain the ability to actually make something useful and deploy it. Once i got over some initail hurdles and setup i managed to get everything working quite quickly and spent some time geting more comfortable with react. 

## Future Features

The main future improvement for the project would be moslty front-end authentication and giving the user better feedback when something does or does not work. The initial deliverable was after two days but i will continue to work on this in my spare time.

## Key Learnings

One sticking point i had during this project was knowing when to ask for help and not spend too much time on problems on my own. I ended up trying to solve a problem and going down completely the wrong route. When i finally asked for help the solution was a lot more simple than i realised. This was frustrating but also an important lesson for me.

A large part of my learning on this was authentication. I spent a lot of time going over what we were shown before i eventually understood it. I feel a lot more comfortable with it now.

## Author 

Lloyd Noone - portfolio: lloydnoone.com
