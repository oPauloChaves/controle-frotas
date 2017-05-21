import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Table from 'react-bootstrap/lib/Table'
import FormActions from './FormActions'
import Pagination from '../../Pagination'

const RowItem = ({ placa, modelo, marca, imagem, combustivel, valor }) => (
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
        <Row>
          <Col md={12}>
            <Table bordered hover responsive>
              <thead>
                <TableHeader />
              </thead>
              <tbody>
                {Object.keys(vehicles).map(i =>
                  <RowItem key={vehicles[i].placa} {...vehicles[i]} />
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="text-center">
              <Pagination />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { vehicles } = state
  return { vehicles }
}

export default connect(mapStateToProps)(Home)
