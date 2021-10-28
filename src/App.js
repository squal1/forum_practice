import React , {useState, useEffect} from "react";
import './styles/App.css';
import LoginPage from "./components/login/LoginPage.js"
import Header from "./components/header/Header.js"
import Sidebar from "./components/sidebar/Sidebar.js"
import TopicWindow from "./components/post_window/TopicWindow.js"
import { BrowserRouter as Router , Switch, Route} from "react-router-dom"
import { useStateValue } from "./StateProvider";
import db from "./firebase";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginPage/>
        ): (
          <>
            <Header/>
            <div className = "App_body">
              <Sidebar/>

              <Switch>
              <Route path = "/post/:postId">
                <TopicWindow/>
              </Route>
              <Route path = "/">
                <h1>Welcome</h1>
              {/*Welcome page here */}
              </Route>
              </Switch>
            </div>
          </>
        )}
        
      </Router>
    </div>
  );
}

export default App;
