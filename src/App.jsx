import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Theory from './pages/Theory/index.jsx';
import Practice from './pages/Practice/index.jsx';
import Analytics from './pages/Analytics';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="theory" element={<Theory />} />
          <Route path="practice" element={<Practice />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
