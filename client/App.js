import React from "react";
import { StateProvider } from "./utils/GlobalState";

import Routes from "./utils/routes";

export default function App() {
  return (
    <StateProvider>
      <Routes />
    </StateProvider>
  );
}
