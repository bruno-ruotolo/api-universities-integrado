<br />
<div align="center">
    <h3 align="center">API Universities</h3>
    <p> An API to check, store and register worldwide universities </p>
</div>

## Technologies
These are the main tools, frameworks and languages that were used in this project:<br>

<div>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" />
  <img style='margin: 5px;' src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img style='margin: 5px;' src="https://img.shields.io/badge/Joi-FFFF00?style=for-the-badge&logo=joi&logoColor=058a5e"/>
   <img style='margin: 5px;' src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/SuperTest-9254ff?style=for-the-badge&logo=supertest"/>
</div>

## How to Run

You can use this API cloning this repository 

To clone the project, run the following command:

```git
git clone https://github.com/bruno-ruotolo/api-universities-integrado.git
```

Then, navigate to the project folder and run the following command to install the dependences:

```git
npm i
```

Before running the scripts you need to configure your _.env_ file based on the _.envExample_ given on the project folder:

```git
PORT = Your Server Running Port
MONGO_URI = MongoDB connection string (for localhost use: mongodb://localhost:27017)
MONGO_DB_NAME = Your database name
```

Now you can initialize the mongoDB server on you machine, in case it's down.

Run the following script to receive and store the universities data from the website _http://universities.hipolabs.com/search_ on your MongoDB database:

```git
npm run store
```

Finally, you can start the server:

```git
npm run deploy
```

This script will build and run the project.

# API Reference

Here you can check the endpoints related to the project, as well as their respective characteristics. Have Fun 😄

## Routes
### Universities Routes

#### Get All Universities
- GET _/universities_

Here you can add the filters _?country=_ and  _?page=_, to filtered by country and acess a specifica page, respectively,
since the API return a limit of 20 universities per page.

- Response
```json
[
  {
    "_id": "university unique id",
    "state-province": "university province state",
    "country": "university country",
    "name": "university name"
  },
  {...}
]
```
---

#### Get A Specific University
- GET _/universities/:universityId_

- Response
```json
[
  {
    "_id": "university unique id",
    "state-province": "university province state",
    "country": "university country",
    "name": "university name"
    "alpha_two_code": "country two code (XX)",
    "web_pages": [], //university array of websites
    "domains": [] //university array of domains
  },
  {...}
]
```
---

#### Create University
- POST _/university_

- Body
```json
{
    "state-province": "university province state",
    "country": "university country",
    "name": "university name"
    "alpha_two_code": "country two code (XX)",
    "web_pages": [], //university array of websites
    "domains": [] //university array of domains
}
```
---

#### Update University
- PUT _/university/:universityId_

- Body
```json
{
    "name": "university name"
    "web_pages": [], //university array of websites
    "domains": [] //university array of domains
}
```

#### Delete University
- DELETE _/university/:universityId_

---

## Authors
### Bruno Ruotolo

[![GitHub](https://img.shields.io/badge/-BrunoRuotolo-black?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/bruno-ruotolo/)]([https://www.linkedin.com/in/bruno-amaral-ruotolo-295876186/](https://github.com/bruno-ruotolo/))
[![Gmail Badge](https://img.shields.io/badge/-brunoaruotolo@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:)](mailto:brunoaruotolo@gmail.com)
[![Linkedin Badge](https://img.shields.io/badge/-brunoamaralruotolo-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/bruno-amaral-ruotolo-295876186/)](https://www.linkedin.com/in/bruno-amaral-ruotolo-295876186/)
