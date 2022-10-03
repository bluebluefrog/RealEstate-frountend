import React from 'react';
import styles from "./App.module.css";
import {HomePage} from "./pages";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route render={() => <h1>404 not found 页面去火星了 ！</h1>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
