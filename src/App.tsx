import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Plane, Settings } from 'lucide-react';
import AwbInvoiceForm from './components/AwbInvoiceForm';
import OtherChargesMaster from './pages/OtherChargesMaster';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <header className="bg-primary-800 text-white py-4 px-6 shadow-md sticky top-0 z-10">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Plane className="h-6 w-6" />
                <h1 className="text-xl font-semibold">NutraACS</h1>
              </div>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link to="/" className="text-white hover:text-primary-200">AWB Invoice</Link>
                  </li>
                  <li>
                    <Link to="/masters/charges" className="text-white hover:text-primary-200 flex items-center">
                      <Settings className="h-4 w-4 mr-1" />
                      Other Charges
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="container mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-primary-900">Cargo AWB Invoice</h2>
                  <p className="text-neutral-600 mt-1">Create and manage airway bill invoices</p>
                </div>
                <AwbInvoiceForm />
              </>
            } />
            <Route path="/masters/charges" element={<OtherChargesMaster />} />
          </Routes>
        </main>

        <footer className="bg-neutral-100 border-t border-neutral-200 py-4 px-6 text-center text-neutral-500 text-sm">
          <div className="container mx-auto">
            <p>NutraACS &copy; {new Date().getFullYear()} - Cargo AWB Invoice Module</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;