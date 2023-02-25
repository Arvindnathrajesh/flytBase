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
