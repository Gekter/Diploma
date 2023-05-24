import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from '../../App';
import Analytics from '../../page/Analytics/Analytics';
import Members from '../../page/Members/Members';
import Notifications from '../../page/Notifications/Notifications';
import Projects from '../../page/Projects/Projects';
import Settings from '../../page/Settings/Settings';
import Tasks from '../../page/Tasks/Tasks';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <Projects />
                ),
            },
            {
                path: "/projects",
                element: (
                    <Projects />
                ),
            },
            {
                path: "/projects/:id/tasks",
                element: <Tasks />,

            },
            {
                path: "/projects/:id/members",
                element: (
                    <Members />
                ),
            },
            {
                path: "/analytics",
                element: (
                    <Analytics />
                ),
            },
            {
                path: "/settings",
                element: (
                    <Settings />
                ),
            },
            {
                path: "/notifications",
                element: (
                    <Notifications />
                ),
            },

        ],
    },
]);


const Router = () => {
    return (
        <RouterProvider router={router} />

    )
}

export default Router