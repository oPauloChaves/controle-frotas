import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Table from 'react-bootstrap/lib/Table'
import FormActions from './FormActions'
import Pagination from '../../Pagination'

import { invalidateVehiclesPage, selectVehiclesPage, fetchVehiclesIfNeeded } from '../../actions/vehicles'

const RowItem = ({ placa, modelo, marca, imagem, combustivel, valor }) => (
  <tr>
    <td><input type="checkbox"/></td>
    <td>{placa}</td>
    <td>{modelo}</td>
    <td>{marca}</td>
    <td>{!imagem ?
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

class VehiclesPage extends Component {
  constructor(props) {
    super(props)
    this.handleChangePageClick = this.handleChangePageClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, page } = this.props
    dispatch(fetchVehiclesIfNeeded(page))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      const { dispatch, page } = nextProps
      // force request on every page change
      dispatch(invalidateVehiclesPage(page))
      dispatch(fetchVehiclesIfNeeded(page))
    }
  }

  handleChangePageClick(selectedPage) {
    const { vehicles, dispatch } = this.props
    if (vehicles.length > 0) {
      // go to next|prev page only if more vehicles may be available
      dispatch(selectVehiclesPage(selectedPage))
    }
  }

  render() {
    const { page, error, vehicles, isFetching, totalCount } = this.props

    return (
      <div>
        <FormActions />

        {
          error &&
          <div className="alert alert-danger">
            {error.message || 'Unknown errors.'}
          </div>
        }

        {!isFetching && vehicles.length === 0 &&
          <div className="alert alert-warning">Oops, nothing to show.</div>
        }

        {vehicles.length > 0 &&
          <div>
            <Row style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Col md={12}>
                <Table bordered hover responsive>
                  <thead>
                    <TableHeader />
                  </thead>
                  <tbody>
                    {vehicles.map(vehicle =>
                      <RowItem key={vehicle.placa} {...vehicle} />
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="text-center">
                  <Pagination
                    onChangePage={this.handleChangePageClick}
                    totalCount={totalCount}
                    activePage={page}
                  />
                </div>
              </Col>
            </Row>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedVehiclesPage, vehiclesByPage } = state
  const page = selectedVehiclesPage || 1

  if (!vehiclesByPage || !vehiclesByPage[page]) {
    return {
      page,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      vehicles: [],
      error: null,
    }
  }

  return {
    page,
    error: vehiclesByPage[page].error,
    isFetching: vehiclesByPage[page].isFetching,
    didInvalidate: vehiclesByPage[page].didInvalidate,
    totalCount: vehiclesByPage[page].totalCount,
    vehicles: vehiclesByPage[page].vehicles,
  }
}

export default connect(mapStateToProps)(VehiclesPage)
