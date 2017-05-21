import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Table from 'react-bootstrap/lib/Table'
import FormActions from './FormActions'
import Pagination from '../../Pagination'

import { /* invalidateVehiclesPage, */ selectVehiclesPage, fetchVehiclesIfNeeded } from '../../actions/vehicles'

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

class VehiclesPage extends Component {
  constructor(props) {
    super(props);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    // this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, page } = this.props;
    dispatch(fetchVehiclesIfNeeded(page));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      const { dispatch, page } = nextProps;
      dispatch(fetchVehiclesIfNeeded(page));
    }
  }

  handleNextPageClick(e) {
    e.preventDefault();
    const { page, vehicles } = this.props;
    if (vehicles.length > 0) {
      // go to next page only if more vehicles may be available
      this.props.dispatch(selectVehiclesPage(page + 1));
    }
  }

  handlePreviousPageClick(e) {
    e.preventDefault();
    const page = this.props.page;
    if (page > 1) {
      this.props.dispatch(selectVehiclesPage(page - 1));
    }
  }

  render() {
    const { page, error, vehicles, isFetching } = this.props;

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
                  <Pagination />
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
  const { selectedVehiclesPage, vehiclesByPage } = state;
  const page = selectedVehiclesPage || 1;

  if (!vehiclesByPage || !vehiclesByPage[page]) {
    return {
      page,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      vehicles: [],
      error: null,
    };
  }

  return {
    page,
    error: vehiclesByPage[page].error,
    isFetching: vehiclesByPage[page].isFetching,
    didInvalidate: vehiclesByPage[page].didInvalidate,
    totalCount: vehiclesByPage[page].totalCount,
    vehicles: vehiclesByPage[page].vehicles,
  };
}

export default connect(mapStateToProps)(VehiclesPage);
