import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<ListPage />} />
        <Route path='/add' element={<AddPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
        {/* TODO: ADD a 404 page */}
      </Routes>
    </Router>
  );
}

export default App;
