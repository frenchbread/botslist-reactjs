# botslist-reactjs

> Layout for listing bots (received via REST API endpoint) build with ReactJs

## Add `.env.local` file OR env variable `REACT_APP_APIHOST`

```
REACT_APP_APIHOST=http://localhost:3030/botslist
```

### Endpoint response should have following format:

```
[
  {
    id: <number>,
    name: <string>,
    reg: <millis>,
    level: <number>,
    link: <string>
  },
  ...
]
```

### Install dependencies

```
$ npm install
```

## Available Scripts

### To start in dev mode

```
$ npm run start
```

### To build

```
$ npm run build
```

### For other scripts check `package.json` or [Create React App](https://github.com/facebook/create-react-app).

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## LICENSE

> [MIT](https://github.com/frenchbread/botslist-reactjs/blob/master/LICENSE)
