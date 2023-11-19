import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DetailedItem from './components/DetailedItem';
import NotFound from './components/not-found/NotFound';
import { Provider } from 'react-redux';
import store from './utils/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" />} />
        <Route path="/page/:page/" element={<App />}>
          <Route path="details/:id" element={<DetailedItem />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
