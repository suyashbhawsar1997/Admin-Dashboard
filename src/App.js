import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerTable from "./pages/DashboardTable/customer"
import AddCustomer from './pages/DashboardTable/AddCustomer';
import Login from './pages/login/Login';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/customer/*" element={<CustomerTable />} />
          <Route path="/AddCustomer" element={<AddCustomer />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
