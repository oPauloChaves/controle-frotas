import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/lib/Table'
import FormActions from './FormActions'

const Row = ({ placa, modelo, marca, imagem, combustivel, valor }) => (
  <tr>
    <td><input type="checkbox"/></td>
    <td>{placa}</td>
    <td>{modelo}</td>
    <td>{marca}</td>
    <td>{imagem === null ?
      <span>Sem foto</span> :
      <a href={imagem} target="_blank">Foto</a>
    }</td>
    <td>{combustivel}</td>
    <td>{valor}</td>
  </tr>
)

const TableHeader = () => (
  <tr>
    <th><input type="checkbox"/></th>
    <th>Placa</th>
    <th>Modelo</th>
    <th>Marca</th>
    <th>Foto</th>
    <th>Combustível</th>
    <th>Valor</th>
  </tr>
)

class Home extends Component {
  render() {
    const { vehicles } = this.props

    return (
      <div>
        <FormActions />
        <div className="row">
          <div className="col-md-12">
            <Table bordered hover responsive>
              <thead>
                <TableHeader />
              </thead>
              <tbody>
                {Object.keys(vehicles).map(i =>
                  <Row key={vehicles[i].placa} {...vehicles[i]} />
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { vehicles } = state
  return { vehicles }
}

export default connect(mapStateToProps)(Home)
