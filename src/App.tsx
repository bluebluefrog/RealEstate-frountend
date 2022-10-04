import React from 'react';
import styles from "./App.module.css";
import {DetailPage, HomePage, SearchPage} from "./pages";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/search/:keywords?" component={SearchPage} />
                    <Route exact path="/detail/:propertyId?" component={DetailPage} />
                    <Route render={() => <h1>404 not found!</h1>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
