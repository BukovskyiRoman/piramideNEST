import React, { useEffect, useState } from "react";
import MainHeaderImage from "../components/main-header-image";
import MainMenu from "../components/main-menu";
import { useSelector } from "react-redux";
import { value } from "lodash/seq";
import { set } from "../app/features/jwt/jwtSlice";
import FooterComponent from "../components/footer";
import PaginationComponent from "../components/pagination-component";

export default function NewsPage() {
    //const jwt = useSelector(state => state.auth.token);
    const [search, setSearch] = useState("");
    const [news, setNews] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        prevPage: 0,
        nextPage: 2,
        perPage: 5
    })

    function getNews(page) {
        const url = "http://localhost:5000";
        fetch(`${url}/news?page=${page}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json()
            )
            .then((result) => {
                setNews(result.news);
                setPagination(result.pagination)
            });
    }

    const paginate = (pageNumber) => {
        getNews(pageNumber);
    };

    useEffect(() => {
        //const url = process.env.URL_BACK;
        getNews(pagination.currentPage)
    }, []);

    function searchChange(event) {
        setSearch(event.target.value);
    }

    function handleSubmit(event) {
        const url = "http://localhost:5000";
        //const url = process.env.URL_BACK;
        //const url = "http://107.23.119.30:5000"
        //const url = "nest-app:5000"
        fetch(`${url}/news/search?search=${search}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                setNews(result.news);
            });
        event.preventDefault();
    }

    return (
        <div>
            <MainHeaderImage />
            <MainMenu />
            <div className="w-4/5 ml-auto mr-auto mt-2 items-center">
                <div className="">
                    <div className="flex justify-between">
                        <div className="flex">
                            <h1 className="text-2xl text-blue-600 mr-4">News</h1>
                            <select className="rounded-xl bg-blue-50 pr-4">
                                <option>Desc</option>
                                <option>ASC</option>
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
                                <h3 className="text-xl italic mb-0.5">{value.title}</h3>
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

            { pagination.total > pagination.perPage && <PaginationComponent
               perPage={pagination.perPage}
               totalNews={pagination.total}
               previousPage={pagination.prevPage}
               nextPage={pagination.nextPage}
               paginate={paginate}
            /> }
            <FooterComponent />
        </div>
    );
}
