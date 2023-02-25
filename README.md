<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

<b><em><u>FlytBase Assignment</u> :</b></em>

This Application is built on NestJS framework and MongoDB database.

I have created 5 mongo collections with its major fields:

<b>User </b>{
  userId: number;
...
}

<b>Site </b>{
  siteId: string;
  userId: number;
  ...
}

<b>Mission </b>{
  missionId: string;
  siteId: string;
  droneId: string;
  categoryId: string;
  ...
}

<b>Drone </b>{
  droneId: string;
  siteId: string;
  userId: number;
  ...
}

<b>Category </b>{
  categoryId: string;
  userId?: number;
  ...
}

This shows how I have designed the schema for collections to connect each other. 
I have created a postman collection which includes all the APIs and the API names are self explanatory. 

<b><em>---<u>API details</u>---</em></b>

<p> <b>signUp</b>: You can provide email, password and a firstName => you wil get ur userId, JWT token. </p>
<p> <b>login</b>: You can login using the provided emailId and password => you will get the userDetails and the JWT token which you can use to hit the remaining user APIs </p>
<p><b>create a site</b>: passing the token as header and the site details in req body => you can create a site in your account</p>
<p><b>update a site</b>: passing the token, site-id as query param and the site details in req body => you can update the site details</p>
<p><b>delete a site</b>: passing the token, passing the site-id as query param => you can INACTIVATE the site(the data is not deleted from the DB)</p>
<p><b>create a drone</b>: passing the token, passing the required drone details => a drone can be created (a drone cannot be created which belongs to a site of any other user)</p>
<p><b>update drone details</b>: passing the token, updated drone details=> drone details can be updated if it belongs to that user</p>
<p><b>delete a drone</b>: passing the token, and drone-id as query => you can INACTIVE the drone (all the missions associated to the drone will become droneId:null)</p>
<p><b>drone site shift</b>: passing the token, the drone-id and new site-id => you can shift the drone to the new site</p>
<p><b>get drones in a site</b>: passing the site-id as query => you can get all the drone belonging to that site</p>
<p><b>create mission</b>: passing the token, mission-details => you can create a missiong with required details and appropriate site and drone(all necessary checks are in place)</p>
<p><b>update mission</b>: passing the token, updated mission details=> independent mission details can be updated</p>
<p><b>delete a mission</b>: passing the token, mission-id in query => you can inactivate a mission</p>
<p><b>get missions in a site</b>: passing the site-id as query => you can get all the missions associated to that site</p>

<p><b><em><u>BONUS</u></b></em></p>
<p><b>create category</b>: passing token, and necessary category details => you can create your custom category</p>
<p><b>update category</b>: passing token and updated Category Details => you can update your category details</p>
<p><b>delete a category</b>: passing token, category-id as query => you can INACTIVE a category (and the missions associated to this category will not have a category)</p>
<p><b>add category to a mission</b>: passing token, appropriate mission-id and category-id => you can add category to a mission</p>
<p><b>add drone to mission</b>: passing token, appropriate drone-id and mission-id as query => you can assign a drone to a mission</p>
<p><b>get missions in a category</b>: passing token, appropriate category-id => you can get all missions associated to that category</p>
<p><b>get drones in a category</b>: passing token, drone-id => you can get all the drone-details associated to the mission of that particualr category</p>


<p><p><b>All the schema, APIs and functionalities have been written handling appropriate checks, validations and logic</b></p></p>

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
