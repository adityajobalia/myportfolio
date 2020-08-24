import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
 } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import Navbar from "./pages/Navbar";
import './App.css';
import NotFound from './pages/NotFound';

class App extends Component{
  render() {
    return (
     <Router>
        <div className="App">
          <Navbar/>
          <div id="page-body">
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/about" component={AboutPage} />
              <Route path="/articlesListPage" component={ArticlesListPage} />
              <Route path="/articles/:name" component={ArticlePage} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
     </Router>
    );  
  }
}

export default App;
