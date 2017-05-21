import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
// import { addVehicle } from '../../reducers/vehicles'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      combustivel: 'Flex',
      imagem: '',
      marca: '',
      modelo: '',
      placa: '',
      valor: 0.0
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  getValidationState(input) {
    const length = this.state[input].length
    return length == 8 ? '': 'error'
  }

  handleSubmit(event) {
    const { dispatch, history } = this.props

    event.preventDefault()
    // dispatch(addVehicle(this.state))
    history.push('/')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="placa"
          validationState={this.getValidationState('placa')}
        >
          <ControlLabel>Placa</ControlLabel>
          <FormControl
            type="text"
            id="placa"
            name="placa"
            value={this.state.placa}
            onChange={this.handleInputChange}
            placeholder="AAA-9999"
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
    )
  }
}

/*
class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      combustivel: 'Flex',
      imagem: '',
      marca: '',
      modelo: '',
      placa: '',
      valor: 0.0
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    const { dispatch, history } = this.props

    event.preventDefault()
    // dispatch(addVehicle(this.state))
    history.push('/')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="placa">Placa: </label>
          </div>
          <div className="col-md-10">
            <input
              type="text"
              id="placa"
              name="placa"
              value={this.state.placa}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="modelo">Modelo: </label>
          </div>
          <div className="col-md-10">
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={this.state.modelo}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="marca">Marca: </label>
          </div>
          <div className="col-md-10">
            <input
              type="text"
              id="marca"
              name="marca"
              value={this.state.marca}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="imagem">Foto: </label>
          </div>
          <div className="col-md-10">
            <input
              type="text"
              id="imagem"
              name="imagem"
              value={this.state.imagem}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="valor">Valor (R$): </label>
          </div>
          <div className="col-md-10">
            <input
              type="text"
              id="valor"
              name="valor"
              value={this.state.valor}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="combustivel">Combustível </label>
          </div>
          <div className="col-md-10">
            <select
              type="text"
              id="combustivel"
              name="combustivel"
              value={this.state.combustivel}
              onChange={this.handleInputChange}>
              <option value="Flex">Flex</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Alcool">Alcool</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    )
  }
}
*/

export default connect()(Form)
