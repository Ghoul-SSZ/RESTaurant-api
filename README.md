# RESTaurant-api
## Install
This api requires [Node.js](https://nodejs.org/) to run.
Mongodb used in this case is provide with docker, to use it: 
1. unzip the backend.zip
2. navigate into the unzipped folder(a folder named backend)
2. run the docker in terminal using 
```sh
$ cd backend
$ docker-compose up --build
```


Install the dependencies and start the server.
```sh
$ cd RESTaurant-api
$ npm install
$ npm run start
```
If you want to be in the dev environment instead. you can run
```sh
$ npm run dev
```

## List of features attempted
- An endpoint that lets the client get a list of restaurants. 
    Status: Done, endpoint: [localhost:3000/api/restaurant](localhost:3000/api/restaurant)
- An endpoint that lets the client get more info on a single restaurant
    Status: Done, endpoint: [localhost:3000/api/restaurant/id](localhost:3000/api/restaurant/1)
- An endpoint that accepts a POST request to add new restaurants to the DB
    Status: Done, endpoint: [localhost:3000/api/restaurant](localhost:3000/api/restaurant)
- Functionality to delete restaurants from the DB through API
    Status: Done, endpoint: [localhost:3000/api/restaurant/id](localhost:3000/api/restaurant/id)
- Functionality to fetch a sorted list of restaurants based on relevant attributes
    Status: Done, endpoint: [localhost:3000/api/restaurant?orderby={attribute}](localhost:3000/api/restaurant?orderby={attribute})
- Functionality to fetch a filtered list of restaurants based on relevant attributes
    Status: In progress

## Short explanation
1. If you are curious and wondering about how the api functions in more detail. check the API document running on [localhost:3000/api-docs/](http://localhost:3000/api-docs/) once you start the server.
2. Quick tour on the src folder: 
    -   app.js is the Main js file that consist of calling express, mongodb, other middleware, routers, etc.
    -   config folder contains all the configuration files
    -   controllers folder contains all the crud controller files
    -   model folder contains all Mongoose Model Schemas
    -   router folder contains all router javascript files
3. I divided the folders so that it is easier to maintain. And I think it is more clear to see which one is which this way. for example. configurations are in the config.js file in config folder. future configuration stuff can be added in the folder so we don't lose track of stuff :)
4. The reason I uses process.env.PORT aswell instead of just 3000 is that later on if we deploy the server on Heroku for example, heroku will assign a port for the server instead of allowing us to specify it.
5. For sorting and filtering, I essentially just pass in the arguments in the url to sent to the server, and then let the server figure out what user wants from the arguments. The server will then call for MongoDB and do the sorting and fitlering there. I think this is a better practise. because I do not want to let the sorting done on the client side, especially when the data is huge. When we do it on the server side using Mongo however, is rather efficient and quick. 
## Possible improvements / bugs
- BUGS: Right now the id is not enforced to be unique. so technically I can POST an restaurant that uses an existing id. annd when we are asked to display more info based on that id. more than one document will show up.
- IMPROVEMENT: Right now the sorting is only done in ascending order. we could add functionality that allows the MongoDB to sorting documents in an desending order.(e.g. by passing the params like "localhost:300/api/restaurant?orderby=name.desc") 
- IMPROVEMENT: Use JWT to protect the API. (advantage: overhead is smaller than stateful ones)
- IMPROVEMENT: Display the data in a table on the frontend. so the user and change the sorting here(maybe in filterting) instead of typing stuff in the url
- IMPROVEMENT: Move the code that connects to MongoDB from app.js into another file(let's call it db.js)  
- IMPROVEMENT: Genric CRUD 
    Since all crud operations are the same(almost). I would like to write the genric CRUD.js and use it instead of having to write CRUD for every single new stuff(e.g. another endpoint localhost:3000/clubs that does CRUD on this endpoint)

    To do it, I will first create an util folder, here i can add a crud.js file. In this javascript file I will put in the generic crud operations:
```js
export const getOne = model => async (req, res) => {
    code for mongoosemodel.findOne here
}

export const getMany = model => async (req, res) => {
    code for mongoosemodel.find here
}

export const createOne = model => async (req, res) => {
    code for mongoosemodel.create here
}

export const updateOne = model => async (req, res) => {
    code for mongoosemodel.findOneAndUpdate here
}

export const removeOne = model => async (req, res) => {
    code for mongoosemodel.removeone here
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
```

   This util folder can also store db.js which I might migrate the javascript code to connect to MongoDB into this js file.
   
   And then for every new endpoint(for example, localhost:3000/club), instead of having to rewrite CRUD, I can simply reuse this crud.js for my new controller(e.g. clubControllers.js):

```js
//import generic crud controller
import { crudControllers } from '../utils/crud'
//improt MongoDB schema model
import { Club } from '../model/club.model' 

export default crudControllers(Item)
```   

  And if I want to do one operation differently. I can just overwrite it in clubController.js file. 
  
```js
//import generic crud controller
import { crudControllers } from '../utils/crud'
//improt MongoDB schema model
import { Club } from '../model/club.model' 

export default {
    ...crudControllers(Item),
    getMany(){
        overwiting code here
    }
}
```

I think this will be a good practice later on. 
