import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./Settings";
import SuppliersOfficeName from "./SuppliersOfficeName";
import SuppliersPaidBills from "./SuppliersPaidBills";
import Staff from "./Staff";
import EditEmployee from "./EditEmployee";
import Analytic from "./Analytic";
import Patients from "./Patients";
import Store from "./Store";
import Labs from "./Labs";
import Doctors from "./Doctors";
import Reports from "./Reports";
import SystemSettings from "./SystemSettings";
import BasicPlugins from "./BasicPlugins";
import Login from "./Login";
import Accounting from "./Accounting";
import { Provider } from "react-redux";
import { store } from "./app/store";
import SuppliersOfficeBills from "./SuppliersOfficeBills";
import ShowEmployee from "./ShowEmployee";
import "./i18n";
import axios from "axios";
import PrivateRoutesLab from "./PrivateRouteLab";

function App() {
  axios.defaults.baseURL = "https://aurora-team.com/lab/api/";
  // if (localStorage.getItem("admin"))
  // axios.defaults.headers.common["Authorization"] =
  // "Bearer " + localStorage.getItem("token");
  // if (localStorage.getItem("lab"))
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("lab_token");
  return (
    <div className="bg-[#F2F4F7] h-full w-full">
      <Router>
        <Provider store={store}>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route element={<PrivateRoutesLab />}>
              <Route path="/" element={<Home />} />
              <Route path="/Accounting" element={<Accounting />} />
              {/* </Route> */}

              <Route path="/Settings" element={<Settings />} />
              <Route path="/Suppliers" element={<SuppliersOfficeName />} />
              <Route
                path="/Suppliers/OfficeBills"
                element={<SuppliersOfficeBills />}
              />

              <Route
                path="/Suppliers/PaidBills"
                element={<SuppliersPaidBills />}
              />

              <Route path="/Staff" element={<Staff />} />
              <Route
                path="/Staff/ShowEmployee/:id"
                element={<ShowEmployee />}
              />

              <Route
                path="/Staff/EditEmployee/:id"
                element={<EditEmployee />}
              />
              <Route path="/Analytic" element={<Analytic />} />
              <Route path="/Patients" element={<Patients />} />
              <Route path="/Store" element={<Store />} />
              <Route path="/Labs" element={<Labs />} />
              <Route path="/Doctors" element={<Doctors />} />
              <Route path="/Reports" element={<Reports />} />
              <Route
                path="/Settings/SystemSettings"
                element={<SystemSettings />}
              />
              <Route path="/Settings/BasicPlugins" element={<BasicPlugins />} />
            </Route>
          </Routes>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
