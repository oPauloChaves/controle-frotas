import React, { Component } from 'react'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Table from 'react-bootstrap/lib/Table'
import FormActions from './FormActions'
import Pagination from '../../Pagination'
import './Home.css'

import {
  invalidateVehiclesPage,
  selectVehiclesPage,
  fetchVehiclesIfNeeded,
  searchVehicles
} from '../../actions/vehicles'

function toReal(valor) {
  valor = parseFloat(valor);
  return valor.toLocaleString('pt', { minimumFractionDigits: 2 })
}

const RowItem = ({ placa, modelo, marca, imagem, combustivel, valor }) => (
  <tr>
    <td><input type="checkbox"/></td>
    <td>{placa}</td>
    <td>{modelo}</td>
    <td>{marca}</td>
    <td>{!imagem ?
      <span>Sem foto</span> :
      <a href={imagem} target="_blank" rel="noopener noreferrer">Foto</a>
    }</td>
    <td>{combustivel}</td>
    <td>{toReal(valor)}</td>
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
    this.state = {
      search: ''
    }
    this.handleChangePageClick = this.handleChangePageClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
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

  handleSearchInputChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleSearch(e) {
    const { dispatch, isFetching } = this.props
    if (e.keyCode === undefined || e.keyCode === 13) {
      if (!isFetching) {
        dispatch(selectVehiclesPage(1))
        dispatch(searchVehicles(this.state.search.trim()))
      }
    }
  }

  render() {
    const { page, error, vehicles, isFetching, totalCount } = this.props

    return (
      <div className="AppList">
        <FormActions
          handleSearch={this.handleSearch}
          handleSearchInputChange={this.handleSearchInputChange}
          search={this.state.search}
        />

        {error &&
          <div className="alert alert-danger">
            {error.message || 'Houve um erro no servidor'}
          </div>
        }

        {!isFetching && vehicles.length === 0 &&
          <div className="alert alert-warning">Oops, nehum registro foi encontrado</div>
        }

        <div className="AppAreaTable">
          {isFetching &&
            <Row>
              <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
              </div>
            </Row>
          }
          {!isFetching && vehicles.length > 0 &&
            <div>
              <Row style={{ opacity: isFetching ? 0.5 : 1 }}>
                <Col md={12}>
                  <Table id="AppTable" hover responsive>
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
