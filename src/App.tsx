import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages/LoginPage';
import { TablePage } from './pages/TablePage';

function App() {
  const isAuth = 0;
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ isAuth ? '/table' : '/login'} />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="*" element={<Navigate to={ isAuth ? '/table' : '/login'} />}/>
    </Routes>
  );
};

export default App;
