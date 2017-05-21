import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import configStore from './store/configStore'
import App from './App'

import './index.css';

const initialState = {
  vehicles: {
    'FFF-5498': {
      combustivel: 'Flex',
      imagem: null,
      marca: 'Volkswagem',
      modelo: 'Gol',
      placa: 'FFF-5498',
      valor: '20000'
    },
    'FOX-4125': {
      combustivel: 'Gasolina',
      imagem: null,
      marca: 'Volkswagem',
      modelo: 'Fox',
      placa: 'FOX-4125',
      valor: '20000'
    },
    'PAI-4121': {
      combustivel: 'Alcool',
      imagem: 'http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg',
      marca: 'Volkswagem',
      modelo: 'Fusca',
      placa: 'PAI-4121',
      valor: '20000'
    }
  }
}

const store = configStore(initialState)

const render = (Component) => {
  return ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(NextApp)
  })
}

registerServiceWorker();
