import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import MainPage from "./routes/main-page";
import LoginPage from "./routes/login-page";
import AboutPage from "./routes/about-page";
import RegisterPage from "./routes/register-page";
import ProfilePage from "./routes/profile-page";
import { Provider } from "react-redux";
import store from "./app/store";
import ChatPage from "./routes/chat-page";
import NewsPage from "./routes/news-page";
import { CookiesProvider } from "react-cookie";
import SingleNewsPage from "./routes/singleNews-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "/about",
        element: <AboutPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/chat",
        element: <ChatPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    },
    {
        path: "/news",
        element: <NewsPage />
    },
    {
        path: "/news/:id",
        element: <SingleNewsPage />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <div className="bg-gradient-to-r from-blue-50 to-pink-50 w-2/3 ml-auto mr-auto h-full rounded-xl">
            <CookiesProvider>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </CookiesProvider>
        </div>
    </React.StrictMode>
);
