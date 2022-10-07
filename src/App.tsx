import React from 'react';
import styles from "./App.module.css";
import {AuctionHistoryPage, DetailPage, HomePage, SearchPage} from "./pages";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {RegisterPage} from "./pages/register";
import {SignInPage} from "./pages/signIn";
import {WatchListPage} from "./pages/watchList";
import {WalletPage} from "./pages/wallet";
import {PersonalInfoPage} from "./pages/personalInfo";
import {CreateAuctionPage} from "./pages/createAuction";
import {UploadPropertyPage} from "./pages/uploadProperty";

function App() {

    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/search/:keywords?" component={SearchPage} />
                    <Route exact path="/detail/:propertyId?" component={DetailPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/sign" component={SignInPage} />
                    <Route exact path="/auctionHistory" component={AuctionHistoryPage} />
                    <Route exact path="/watchList" component={WatchListPage} />
                    <Route exact path="/wallet" component={WalletPage} />
                    <Route exact path="/personalInfo" component={PersonalInfoPage} />
                    <Route exact path="/createAuction" component={CreateAuctionPage} />
                    <Route exact path="/uploadProperty" component={UploadPropertyPage} />
                    <Route render={() => <h1>404 not found!</h1>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
