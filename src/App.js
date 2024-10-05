import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Jobs from './components/JobsPage';
import Bookmark from './components/BookmarkPage';
import JobDetails from './components/JobDetailsPage';
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className='app'>
                <nav className='nav-bar'>
                    <Link to="/" className="nav-item">Jobs</Link>
                    <Link to="/bookmarks" className="nav-item">Bookmarked</Link>
                </nav>
                <main>
                    <Switch>
                        <Route exact path="/" component={Jobs} />
                        <Route path="/bookmarks" component={Bookmark} />
                        <Route path="/jobs/:id" component={JobDetails} />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
