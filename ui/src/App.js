import PackageMovement from "components/PackageMovement";
import "./App.css";
import TableData from "components/TableData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckStorage from "components/CheckStorage";

function App() {
  return (
    <div className="App">
      <CheckStorage header={"AVAIALBLE STORAGE TABLE"} />
      <TableData header={"FRONT DESK APP"} />
      <PackageMovement header={"PACKAGE MOVEMENTS"} />
      <ToastContainer theme="colored" hideProgressBar={true} autoClose={3000} />
    </div>
  );
}

export default App;
