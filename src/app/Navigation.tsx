import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
