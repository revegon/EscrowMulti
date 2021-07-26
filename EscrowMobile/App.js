import React from 'react';
import {AppContextProvider} from './src/Contexts/ApplicationContext';
import {Login} from './src/Pages/AccountControl';
// import Test from './src/Pages/test';

class App extends React.Component {
    render() {
        return (
            <AppContextProvider>
                <Login />
            </AppContextProvider>
        );
    }
}

export default App;
