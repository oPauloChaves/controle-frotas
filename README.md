# controle-frotas

### Run in dev mode
```sh
yarn start
```
> Your browser should open automatically at [localhost:3000](http://localhost:3000)

### Run the production build local
```sh
yarn run build
yarn global add serve # this package runs a node server at localhost
serve -s build
```
> Your app is running at [localhost:5000](http://localhost:5000)

### Deploy (Github Pages)
Before deploying the project install the `gh-pages` package from npm

```sh
yarn global add gh-pages
yarn run deploy
```
