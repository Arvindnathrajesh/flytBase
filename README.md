<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

FlytBase Assignment :

This Application is built on NestJS framework and MongoDB database.

I have created 5 mongo collections with its major fields:

User {
  userId: number;
...
}

Site {
  siteId: string;
  userId: number;
  ...
}

Mission {
  missionId: string;
  siteId: string;
  droneId: string;
  categoryId: string;
  ...
}

Drone {
  droneId: string;
  siteId: string;
  userId: number;
  ...
}

Category {
  categoryId: string;
  userId?: number;
  ...
}

This shows how I have designed the schema for collections to connect each other. 
I have created a postman collection which includes all the APIs and the API names are self explanatory. 

---API details---

signUp: You can provide email, password and a firstName => you wil get ur userId, JWT token. 
login: You can login using the provided emailId and password => you will get the userDetails and the JWT token which you can use to hit the remaining user APIs
create a site: passing the token as header and the site details in req body => you can create a site in your account
update a site: passing the token, site-id as query param and the site details in req body => you can update the site details
delete a site: passing the token, passing the site-id as query param => you can INACTIVATE the site(the data is not deleted from the DB)
create a drone: passing the token, passing the required drone details => a drone can be created (a drone cannot be created which belongs to a site of any other user)\\
update drone details: passing the token, updated drone details=> drone details can be updated if it belongs to that user
delete a drone: passing the token, and drone-id as query => you can INACTIVE the drone (all the missions associated to the drone will become droneId:null)
drone site shift: passing the token, the drone-id and new site-id => you can shift the drone to the new site
get drones in a site: passing the site-id as query => you can get all the drone belonging to that site
create mission: passing the token, mission-details => you can create a missiong with required details and appropriate site and drone(all necessary checks are in place)
update mission: passing the token, updated mission details=> independent mission details can be updated
delete a mission: passing the token, mission-id in query => you can inactivate a mission
get missions in a site: passing the site-id as query => you can get all the missions associated to that site

BONUS
create category: passing token, and necessary category details => you can create your custom category
update category: passing token and updated Category Details => you can update your category details
delete a category: passing token, category-id as query => you can INACTIVE a category (and the missions associated to this category will not have a category)
add category to a mission: passing token, appropriate mission-id and category-id => you can add category to a mission
add drone to mission: passing token, appropriate drone-id and mission-id as query => you can assign a drone to a mission
get missions in a category: passing token, appropriate category-id => you can get all missions associated to that category
get drones in a category: passing token, drone-id => you can get all the drone-details associated to the mission of that particualr category



All the schema, APIs and functionalities have been written handling appropriate checks, validations and logic

## Installation

```bash
$ npm install --force
```
## Running the app

```bash

# watch mode
$ npm run start:dev
# debug mode
$ npm run start:debug
```

## Stay in touch
- Author - [Arvind Nath Rajesh](https://arvindnathr@gmail.com)
