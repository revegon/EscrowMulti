import React from 'react';
import 'react-native-gesture-handler';
import {ProductList} from '../Pages/Product/ProductList';

class NavigationMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ProductList />;
    }
}

export {NavigationMain};
