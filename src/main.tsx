import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DetailedItem from './components/DetailedItem';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/page/1" />} />
      <Route path="/page/:page/" element={<App />}>
        <Route path="details/:id" element={<DetailedItem />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
