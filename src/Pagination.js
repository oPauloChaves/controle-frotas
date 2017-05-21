import React, { Component } from 'react'
import Pagination from 'react-bootstrap/lib/Pagination'

class BasicPagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    })
  }

  render() {
    return (
      <div>
        <Pagination
          prev={<span aria-label="Prev">«</span>}
          next={<span aria-label="Next">»</span>}
          bsSize="medium"
          items={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
      </div>
    )
  }
}

export default BasicPagination
