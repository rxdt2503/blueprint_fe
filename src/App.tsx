import React from "react";
import "./App.css";
import "./index.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./services/redux";
import { Route, Routes } from "react-router-dom";
import SideNav from "./components/SideNav";
import Header from "./components/common/Header";
import DashboardScreen from "./pages/DashboardScreen";
import PlanScreen from "./pages/PlanScreen";
import CreatePlanScreen from "./pages/CreatePlanScreen";
function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow">
            <Header />
            <Routes>
              <Route path="/" element={<PlanScreen />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/dashboard/plan" element={<PlanScreen />} />
              <Route
                path="/dashboard/createPlan"
                element={<CreatePlanScreen />}
              />
            </Routes>
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
