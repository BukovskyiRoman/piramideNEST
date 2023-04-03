import React, { useState, useEffect } from "react";
import { hover } from "@testing-library/user-event/dist/hover";
import { number } from "prop-types";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function PaginationComponent({ perPage, totalNews, previousPage, nextPage, paginate, curPage, pages }) {
    const pageStyle = {};
    const activePage = {
        fontWeight: "800", fontSize: "2.2rem", border: "0px"
    };

    const pageNumbers = [...Array(pages).keys()].map(i => i + 1);

    return (
        <div className="flex mt-4">
            <div className="ml-auto mr-auto">
                { curPage > 3 && (
                    <a
                        onClick={() => paginate(1)}
                        className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                    >
                        First
                    </a>
                )}
                <a
                    onClick={() => paginate(previousPage)}
                    className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                >
                    &laquo;
                </a>
                {previousPage > 0 && (
                    <a
                        onClick={() => paginate(previousPage)}
                        className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                    >
                        {previousPage}
                    </a>
                )}

                <a
                    className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                    style={activePage}
                >
                    {curPage}
                </a>
                {nextPage <= pages && (
                    <a
                        onClick={() => paginate(nextPage)}
                        className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                    >
                        {nextPage}
                    </a>
                )}

                <a
                    onClick={() => paginate(nextPage)}
                    className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                >
                    &raquo;
                </a>
                { curPage < (pages -3 ) && (
                    <a
                        onClick={() => paginate(pages)}
                        className="text-black px-4 py-2 cursor-pointer hover:border-2 border-gray-500 rounded"
                    >
                        Last
                    </a>
                )}
            </div>
        </div>
    );
}

