import {BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight} from "react-icons/bi"

function Pagination({currentPage, banksPerPage, totalBanks, paginate, handleBanksPerPage}) {


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalBanks/banksPerPage); i++) {
        pageNumbers.push(i);
    }

    let paginationNumbers = [];

    let showMax = 5;
    let endPage;
    let startPage;

    if (pageNumbers <= showMax) {
        startPage = 1;
        endPage = pageNumbers.length;
    }
    else {
        startPage = currentPage;
        if (startPage != pageNumbers.length && (startPage + 1) != pageNumbers.length) {
            endPage = currentPage + showMax - 1;
        }
        else {
            endPage = pageNumbers.length;
        }
    }
    for (let i = startPage; i <= endPage; i++) {
        paginationNumbers.push(i);
    }


  return (
    <>
        <div className="section">
            <div className="page-group">
            {currentPage > 2 ? <a href="#" onClick={() => paginate(1)} title="Move to 1st page"><BiChevronsLeft /></a> : null}
            {currentPage == 1 ? null : <a href="#" onClick={() => paginate(currentPage - 1)}><BiChevronLeft /></a>}
            {
                paginationNumbers.map((number) => (
                    <>
                        {
                            number == currentPage
                            ? <a href="#" onClick={() => paginate(number)} className="page-number active" key={number}>{number}</a>
                            : <a href="#" onClick={() => paginate(number)} className="page-number" key={number}>{number}</a>
                        }
                    </>
                ))
            }
            {currentPage == pageNumbers.length ? null : <a href="#" onClick={() => paginate(currentPage + 1)}><BiChevronRight /></a>}
            {(pageNumbers.length-currentPage) > 3 ? <a href="#" title="Move to last page" onClick={() => paginate(pageNumbers.length)}><BiChevronsRight /></a> : null  }
            </div>
            <p className="">Showing <input type="number" min="1" max="50" value={banksPerPage} onChange={(e) => handleBanksPerPage(e.target.value)} /> items per page.</p>
        </div>
        
    </>
  )
}
export default Pagination;