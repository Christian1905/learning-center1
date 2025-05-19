# ACME Learning Center Web Application (learning-center)

## Summary

ACME Learning Center Application (Angular Framework Edition), illustrating CRUD behavior and in-app navigation, with Angular Material and Angular Router. It also uses a JSON Server Fake API.

## Features

Project features include:

- CRUD operations for Course Management.
- Material Design-based components.
- Integration with JSON Server Fake API.
- In-app navigation.
- Internationalization (i18n).
- Environment configuration.
- Domain-Driver Design approach.

## Documentation
The documentation is available in the `docs` folder. It includes:
- User Stories are available in the [docs/user-stories.md](docs/user-stories.md) file.
- PlantUML Class diagrams are available in the [docs/class-diagram.puml](docs/class-diagram.puml) file.
- C4 Model Software Architecture is available in the [docs/software-architecture.dsl](docs/software-architecture.dsl) file.

## Frameworks and Libraries

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.

It also uses the following dependencies:

- Angular Material (https://material.angular.io/).
- ngx-translate ( https://github.com/ngx-translate/core ).
- ngx-translate/http-loader (https://github.com/ngx-translate/http-loader).
- JSON Server stable version(https://github.com/typicode/json-server/tree/v0).

## Fake API start

Run the following commands to start the fake API server:

```bash
cd server
sh start.sh
``` 

The API endpoints should be accessible at `http://localhost:3000/api/v1`. The current API resource endpoints are:
- `http://localhost:3000/api/v1/courses`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## COMMANDS TO INIT PROJECT

cd Documents

sudo npx --yes --package @angular/cli@latest ng new learning-center --defaults --standalone=true

## Mac - Updating File Ownership and Permissions
sudo chown -R alumnos:staff ~/Documents
sudo chown -R alumnos:staff ~/Documents/learning-center
sudo chown alumnos ~/.zshrc
chmod u+rw ~/.zshrc
sudo chown alumnos ~/.angular-config.json

## Angular Material

sudo ng add @angular/material

## Json Server
sudo npm i -g json-server@0.17.4

## Environments
ng g environments

## i18n
sudo npm i @ngx-translate/core @ngx-translate/http-loader

## Language Switcher

ng g c public/components/LanguageSwitcher
ng g c public/pages/Home
ng g c public/pages/About
ng g c public/pages/PageNotFound

