import React from "react";

const Paginate = ({
                      recsPerPage,
                      totalRecs,
                      paginate,
                      previousPage,
                      nextPage,
                  }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecs / recsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container mt-2">
            <ul className="pagination">
                <li onClick={previousPage} className="page-number">
                    <button className="page-link" onClick={previousPage}>
                        Prev
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => paginate(number)}
                        className="page-number"
                    >
                        <button onClick={() => paginate(number)} className="page-link" >
                            {number}
                        </button>
                    </li>
                ))}
                <li onClick={nextPage} className="page-number">
                    <button className="page-link" onClick={nextPage}>
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Paginate;