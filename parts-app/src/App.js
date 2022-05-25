import './App.css';
import Main from './components/main/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HouseDetails from './components/houseDetails/HouseDetails';
function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/house/:id" element={<HouseDetails />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
