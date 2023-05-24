import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Analytics from "./page/Analytics/Analytics";
import Notifications from "./page/Notifications/Notifications";
import Settings from "./page/Settings/Settings";
import Tasks from "./page/Tasks/Tasks";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { App } from "./App";
import "./global/reset.css";
import "./global/colors.css";
import "./global/style.css";
import Projects from "./page/Projects/Projects";
import Members from "./page/Members/Members";

import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./components/router/Router";

const container = document.getElementById("root")!;
const root = createRoot(container);


root.render(
  <Provider store={store}>
    <ChakraProvider>
      <Router></Router>
    </ChakraProvider>
  </Provider>
);
