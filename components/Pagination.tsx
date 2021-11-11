import React from "react";
import { useRouter } from 'next/router'

const Pagination = ({currentPage, totalPages}: PropTypes) => {
  if (totalPages === 1) { return <div></div>}
  const router = useRouter()
  
  const pageButton = (page: number) => {
    let query = new URLSearchParams({...router.query, page: `${page}`})
    const url = `${router.route}?${query.toString()}`
    return <a href={url} className={`pagination-link${page === currentPage ? ' is-current' : ''}`} aria-label={`Page ${page}`} aria-current={page === currentPage ? `page` : 'false'}>{page}</a>
  }
  const pageStart = Math.max(currentPage - 2, 1)

return <nav className="pagination is-small is-centered" role="navigation" aria-label="pagination">
  <ul className="pagination-list">
    {pageStart != 1 && <li><a className="pagination-previous">{`<`}</a></li>}
    {pageStart > 1 && <li>{pageButton(1)}</li>}
    {pageStart > 2 && <li><span className="pagination-ellipsis">&hellip;</span></li>}
    {pageStart <= totalPages && <li>{pageButton(pageStart)}</li>}
    {(pageStart + 1) <= totalPages && <li>{pageButton(pageStart + 1)}</li>}
    {(pageStart + 2) <= totalPages && <li>{pageButton(pageStart + 2)}</li>}
    {(pageStart + 3) <= totalPages && <li>{pageButton(pageStart + 3)}</li>}
    {(pageStart + 4) <= totalPages && <li>{pageButton(pageStart + 4)}</li>}
    {(pageStart + 4) < (totalPages - 1) && <li><span className="pagination-ellipsis">&hellip;</span></li>}
    {(pageStart + 4) < totalPages && <li>{pageButton(totalPages)}</li>}
    {currentPage < totalPages && <li><a className="pagination-next">{`>`}</a></li>}
  </ul>
</nav>
}

type PropTypes = {
  currentPage: number
  totalPages: number
}
export default Pagination;