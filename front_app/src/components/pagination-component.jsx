import React, { useState, useEffect } from "react";
import { hover } from "@testing-library/user-event/dist/hover";

export default function PaginationComponent({ perPage, totalNews, previousPage, nextPage, paginate, curPage }) {
    const pageNumbers = [];
    const pageStyle = {}
    const activePage = {
        fontWeight: "800", fontSize: "2.2rem", border: "0px"
    }

    for (let i = 1; i <= Math.ceil(totalNews / perPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="flex mt-4">
            <div className="ml-auto mr-auto">
                <a
                    onClick={() => paginate(previousPage)}
                    className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                >
                    &laquo;
                </a>
                { pageNumbers.map((number) => (
                    <a
                        key={number}
                        onClick={() => paginate(number)}
                        className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                        style={number === Number(curPage )? activePage : pageStyle}
                    >
                        {number}
                    </a>
                ))}
                <a
                    onClick={() => paginate(nextPage)}
                    className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                >
                    &raquo;
                </a>
            </div>
        </div>
    );
}

