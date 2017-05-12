import React, { Component } from 'react'
import { connect } from 'react-redux'

const Vehicle = ({ placa, modelo }) => (
  <div>
    <h2>{placa} - {modelo}</h2>
  </div>
)

class Home extends Component {
  render() {
    const { vehicles } = this.props

    return (
      <div>
        <div className="row">
          {Object.keys(vehicles).map(i =>
            <div className="col-md-4" key={vehicles[i].id}>
              <Vehicle {...vehicles[i]} />
            </div>
          )}
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
