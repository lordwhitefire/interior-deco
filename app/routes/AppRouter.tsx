import { Link, Route, Outlet } from '@remix-run/react';
import Home from './_index'; // Rename _index to Home or any preferred name
import Services from './services';
/* import About from './About';
import Blog from './Blog';
import Contact from './Contact'; */

function App() {
  return (
    <div>
      <nav>
        {/* Use Remix's Link component for internal navigation */}
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        {/* Add more navigation links as needed */}
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;



