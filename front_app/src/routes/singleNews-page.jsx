import React, { useEffect, useState } from "react";
import MainHeaderImage from "../components/main-header-image";
import MainMenu from "../components/main-menu";
import { useSelector } from "react-redux";
import { value } from "lodash/seq";
import { set } from "../app/features/jwt/jwtSlice";
import FooterComponent from "../components/footer";
import PaginationComponent from "../components/pagination-component";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SingleNewsPage() {
    const [news, setNews] = useState({});
    const { id } = useParams();

    function getNews() {
        const url =  process.env.REACT_APP_BASE_URL;
        axios.get(`${url}/news/${id}`).then(response => setNews(response.data.news))
    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div>
            <MainHeaderImage />
            <MainMenu />
            <div className="w-4/5 ml-auto mr-auto mt-2 items-center">
                <div className="">
                    <div className="flex justify-between">
                        <div className="flex">
                            <h1 className="text-2xl text-blue-600 mr-4">News</h1>
                        </div>
                    </div>

                    <div
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
                    >
                        <h3 className="text-xl italic mb-0.5">{news.title}</h3>
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
                            ).format(news.date)
                        }
                        </p>
                        <p>{news.body}</p>
                        <a href={news.href} target="_blank">
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
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}
