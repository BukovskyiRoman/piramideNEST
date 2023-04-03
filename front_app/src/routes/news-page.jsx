import React, { useEffect, useState } from "react";
import MainHeaderImage from "../components/main-header-image";
import MainMenu from "../components/main-menu";
import FooterComponent from "../components/footer";
import PaginationComponent from "../components/pagination-component";
import axios from "axios";

export default function NewsPage() {
    const [search, setSearch] = useState("");
    const [news, setNews] = useState([]);
    const [sort, setSort] = useState("DESC");

    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        prevPage: 0,
        nextPage: 2,
        perPage: 5
    });

    const pages = Math.ceil(pagination.total / pagination.perPage);

    function getNews(page) {

        const url = "http://localhost:5000";

        axios.get(`${url}/news`, {
            params: {
                sort,
                page
            }
        })
            .then(response => {
                setPagination(response.data.pagination);
                setNews(response.data.news);
            });
    }

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= pages) {
            getNews(pageNumber);
        }
    };

    useEffect(() => {
        getNews(pagination.currentPage);
    }, [sort]);

    const searchChange = async (event) => {
        setSearch(event.target.value);
    };

    function handleSubmit(event) {
        const url = process.env.REACT_APP_BASE_URL;

        axios.get(`${url}/news/`, {
            params: {
                search
            }
        })
            .then(response => setNews(response.data.news))
            .catch(error => console.log(error));

        event.preventDefault();
    }

    const sortChange = (event) => {
        setSort(event.target.value);
    };

    return (
        <div>
            <MainHeaderImage />
            <MainMenu />
            <div className="w-4/5 ml-auto mr-auto mt-2 items-center">
                <div className="">
                    <div className="flex justify-between">
                        <div className="flex">
                            <h1 className="text-2xl text-blue-600 mr-4">News</h1>
                            <select className="rounded-xl bg-blue-50 pr-4" onChange={sortChange}>
                                <option value="DESC">Desc</option>
                                <option value="ASC">ASC</option>
                            </select>
                        </div>

                        <form className="w-1-3 mr-0 flex justify-end" onSubmit={handleSubmit}>
                            <input
                                className="rounded pl-3 w-[30%]"
                                type="text"
                                placeholder="Search"
                                value={search}
                                name="search"
                                onChange={searchChange}
                            />
                            <input
                                type="submit"
                                className="rounded-xl px-2 border-2 border-blue-200 hover:border-blue-400 ml-2"
                                value="Search"
                            />
                        </form>
                    </div>

                    {
                        news.map((value, index) => {
                            return <div
                                className="
                                block
                                mt-2
                                border-blue-200
                                hover:border-blue-300
                                rounded
                                border-[1px]
                                px-4
                                py-4
                                mb-2
                                overflow-y-auto
                                "
                                key={index}
                            >
                                <a href={`/news/${value.id}`}>
                                    <h3 className="text-xl italic mb-0.5">{value.title}</h3>
                                </a>
                                <p className="text-gray-400 mb-2">{
                                    new Intl.DateTimeFormat(
                                        "UK",
                                        {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            timeZone: "UTC"
                                        }
                                    ).format(value.date)
                                }
                                </p>
                                <p>{value.body.substring(0, 255)}...</p>
                                <a href={value.href} target="_blank">
                                    <input
                                        className="
                                    border
                                    border-blue-200
                                    px-2
                                    py-1
                                    rounded-2xl
                                    mt-3
                                    hover:border-blue-400
                                    cursor-pointer
                                    "
                                        type="button"
                                        value="Go to source"
                                    />
                                </a>
                            </div>;
                        })
                    }
                </div>
            </div>

            {pagination.total > pagination.perPage && <PaginationComponent
                perPage={pagination.perPage}
                totalNews={pagination.total}
                previousPage={pagination.prevPage}
                nextPage={pagination.nextPage}
                paginate={paginate}
                curPage={pagination.currentPage}
                pages={pages}
            />}

            <FooterComponent />
        </div>
    );
}
