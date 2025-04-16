import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Login from './components/Login';
import Register from './components/Register';
import Favorites from './components/Favorites';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const login = (t) => { setToken(t); localStorage.setItem("token", t); };
  const logout = () => { setToken(null); localStorage.removeItem("token"); };

  return (
    <BrowserRouter>
      <nav>
        <a href="/recipe">Home</a>
        {token ? <a href="/favorites">Favorites</a> : null}
        {token ? <button onClick={logout}>Logout</button> : <a href="/login">Login</a>}
      </nav>
      <Routes>
        <Route path="/recipe" element={<RecipeList token={token} />} />
        <Route path="/recipe/:id" element={<RecipeDetail token={token} />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register onRegister={login} />} />
        <Route path="/favorites" element={token ? <Favorites token={token} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/recipe" />} />
      </Routes>
    </BrowserRouter>
  );
}