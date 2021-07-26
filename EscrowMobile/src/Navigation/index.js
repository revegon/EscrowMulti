import React from 'react';
import {AccountContext} from '../Contexts/AccountContext';
import {AccountNavigation} from './AccountNavigation';
import {NavigationMain} from './NavigationMain';

class Navigation extends React.Component {
    componentDidMount() {
        //TODO: check for sign in / auto log in
    }

    render() {
        const {isSignedIn} = this.context;
        return isSignedIn ? <NavigationMain /> : <AccountNavigation />;
    }
}

Navigation.contextType = AccountContext;

export {Navigation};
