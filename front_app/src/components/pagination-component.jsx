import React from "react";

export default function PaginationComponent(props) {
    //console.log(props.page);
    return (
        <div className="flex mt-4">
            <div className="ml-auto mr-auto">
                <a href="#" className="text-black px-4 py-2">&laquo;</a>
                <a href="?page=1" className="text-black px-4 py-2">1</a>
                <a href="?page=2" className="text-black px-4 py-2">2</a>
                <a href="?page=3" className="text-black px-4 py-2">3</a>
                <a href="?page=4" className="text-black px-4 py-2">4</a>
                <a href="?page=5" className="text-black px-4 py-2">5</a>
                <a href="?page=6" className="text-black px-4 py-2">6</a>
                <a href="#" className="text-black px-4 py-2">&raquo;</a>
            </div>
        </div>
    );
}

