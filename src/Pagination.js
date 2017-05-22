import React from 'react'
import Pagination from 'react-bootstrap/lib/Pagination'

const BasicPagination = ({ totalCount, activePage, onChangePage }) => {
  const pages = Math.ceil(totalCount / 5)

  return (
    <div className="AppPagination">
      <Pagination
        prev={<span className="BtnPrev" aria-label="Prev">«</span>}
        next={<span className="BtnNext" aria-label="Next">»</span>}
        bsSize="medium"
        items={pages}
        activePage={activePage}
        onSelect={onChangePage} />
    </div>
  )
}

export default BasicPagination
