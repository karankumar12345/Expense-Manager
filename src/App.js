import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Notes from './pages/Notes';
import AddExpenseForm from './pages/Lists/AddNewForm';
import Sidebar from './pages/List/ListHomePage';
import LoginRegister from './pages/LoginRegister';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import TodoForm from './pages/TodoForm';
import PrivateRoute from './PrivateRoute';
// import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/note" element={<Notes />} />
          <Route
            path="/add-new-list"
            element={<PrivateRoute element={<AddExpenseForm />} />}
          />
          <Route
            path="/List-item/:id"
            element={<PrivateRoute element={<Sidebar />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<TodoForm />} />
        </Routes>
      </div>
      {/* Home page navigation button */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4">
        <button
          onClick={() => {
            // Navigate to the home page
            window.location.href = '/';
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Home
        </button>
      </div>
    </BrowserRouter>
  );
}

export default App;
