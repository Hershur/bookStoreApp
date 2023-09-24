# bookStoreApp

# Install Dependencies
### cd into webapp directory and execute 'npm run deps' -- this will install the dependencies for both the webapp and api

```
npm run deps
```

# Start the app
### In the webapp directory, execute 'npm run app' -- this will start both the webapp and api simultaneouly

```
npm run app
```


## Web App URL

[ http://127.0.0.1:5173/](http://127.0.0.1:5173/)


## API Base URL
[http://localhost:5500/](http://localhost:5500/)


### Seeding Data

```
    Seed user data - (POST) http://localhost:5500/seed/user (user data is seeded by default on app start)

    Seed book data - (POST) http://localhost:5500/seed/book 
```


### Get data from any existing table

```
    (GET) http://localhost:5500/fetch/{{tableName}}
```