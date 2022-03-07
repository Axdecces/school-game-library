# Game Library

A game library for managing a game collection, rating games and adding favorites.

## Installation

### Requirements

- Node.js with NPM
- Python 3.9
- Pipenv
- IGDB API Account

### Backend (Django)

Run commands only in the respcetive folder!

Install required pip packages with pipenv.

```console
pipenv install
```

Start django dev server.

```console
pipenv run python manage.py runserver
```

(optional) Initialize SQlite Database.

```console
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate
```

### Frontend (React)

Install Node Modules.

```console
npm install
```

Start react dev  server.

```console
npm start
```

Get Twitch Api Key by following the [About Page](https://api-docs.igdb.com/#about) and paste the Client-ID and the Api-Token into /frontend/src/feature/games/apiAuth.js. The token has to be renewed manually, which is suboptimal and not usable in production.

### CORS Proxy

Install Node Modules.

```console
npm install
```

Start proxy server for adding cors header.

```console
npm start
```

## Milestones

### 1. :white_check_mark: Choose Framworks

- Django Rest Backend
- React-Redux Frontend
- Bootstrap Styling

### 2. :white_check_mark: Create Backend Models

### Games

- Title
- Description
- Favorite
- Preview
- Tags (ManyToMany)
- Deleted

### Tags

- Title

### 3. :white_check_mark: Create Rest Api

- :white_check_mark: create serializers
- :white_check_mark: create views
- :white_check_mark: create API endpoints for CRUD operations for games and tags

### 4. :white_check_mark: Create Frontend App Structure

- :white_check_mark: React-Redux Store
- :negative_squared_cross_mark: Diff function for only sending changes to the backend
- :white_check_mark: Bootstrap Grid Layout for different device sizes
- :white_check_mark: Navbar with Games and Tags
- :white_check_mark: GameTile Component for rendering a single Game as Tile
- :white_check_mark: View for game list
- :white_check_mark: Filter and search for game list
- :white_check_mark: View for tag list (editable)
- :white_check_mark: Modal for single game
- :white_check_mark: Page for editing a single game

### 5. :white_check_mark: Connect Frontend to Backend

- :white_check_mark: get data from backend
- :white_check_mark: save changes to backend

## 6. :white_check_mark: Connect IGDB Api to fetch game information

- :white_check_mark: find out appropiate endpoints
- :white_check_mark: fetch data into edit fields to allow the user to make manual changes

## 7. :negative_squared_cross_mark: Write print function for games or all favorites  (optional)
