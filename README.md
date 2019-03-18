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


Install the dependencies and devDependencies and start the server.
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
    Status: Done, endpoint: [ localhost:3000/api/restaurant](localhost:3000/api/restaurant)
- An endpoint that lets the client get more info on a single restaurant
    Status: Done, endpoint: [ localhost:3000/api/restaurant/id](localhost:3000/api/restaurant/1)
- An endpoint that accepts a POST request to add new restaurants to the DB
    Status: Done, endpoint: [ localhost:3000/api/restaurant](localhost:3000/api/restaurant)
- Functionality to delete restaurants from the DB through API
    Status: Done, endpoint: [ localhost:3000/api/restaurant/id](localhost:3000/api/restaurant/id)
- Functionality to fetch a sorted list of restaurants based on relevant attributes
    Status: Done, endpoint: [ localhost:3000/api/restaurant?orderby={attribute}](localhost:3000/api/restaurant?orderby={attribute})
- Functionality to fetch a filtered list of restaurants based on relevant attributes
    Status: In progress

## Short explanation
1. If you are curious and wondering about how the api functions in more detail. check the API document running on [localhost:3000/api-docs/](http://localhost:3000/api-docs/) once you start the server.
2. I divide the folders so that it is easier to maintain. And I think it is more clear to see which one is which this way. for example. configurations are in the config.js file in config folder. future configuration stuff can be added in the folder so we don't lose track of stuff :)
3. For sorting and filtering, I essentially just pass in the arguments in the url to sent to the server, and then let the server figure out what user wants from the arguments. The server will then call for MongoDB and do the sorting and fitlering there. I think this is a better practise. because I do not want to let the sorting done on the client side, especially when the data is huge. When we do it on the server side using Mongo however, is rather efficient and quick. 
## Possible improvements / bugs
- BUGS: Right now the id is not enforced to be uniq. so technocally I can POST an restaurant that uses an existing id. annd when we are asked to display more info based on that id. more than one document will show up. 
- IMPROVMENT: Use JWT to protect the API. (advantage: overhead is smaller than stateful ones)
- IMPROVMENT: Display the data in a table on the frontend. so the user and change the sorting here(maybe in filterting) instead of typing stuff in the url
- IMPROVMENT: Genric CRUD 
    Since all crud operations are the same(almost). I would like to write the genric CRUD.js and use it instead of having to write CRUD for every single new stuff(e.g. another endpoint localhost:3000/clubs that does CRUD on this endpoint)

    To do it, I will first create an util folder, here i can add a crud.js file. in this javascript file I will put in the generic crud operations:
```js
    export const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findOne({ id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = model => async (req, res) => {
  try {
    const docs = await model
      .find()
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = model => async (req, res) => {
  const createdBy = req.user._id
  try {
    const doc = await model.create({ ...req.body, createdBy })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      id: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
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
