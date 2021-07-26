import React from 'react';
import {StyleSheet, View, BackHandler, Alert, ScrollView} from 'react-native';
import {List, Searchbar, Text} from 'react-native-paper';
import {groupBy} from 'core';
import {ProductListItem} from './ProductListItem';
import {Background} from '../../Components/Background';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            icons: {},
            filteredProducts: [],
        };
        this.backBtnPressed = this.backBtnPressed.bind(this);
    }

    backBtnPressed() {
        Alert.alert('Alert', 'Exit app?', [
            {
                text: 'Cancel',
                onPress: () => null,
            },
            {
                text: 'Yes',
                onPress: () => BackHandler.exitApp(),
            },
        ]);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.backBtnPressed,
        );

        // db call to get products

        const testProductData = [
            {
                productId: 1,
                name: 'Arsenic Sulf 30',
                type: 'Medicine',
                price: 200,
                unitOfPrice: 'Tk.',
                amount: 1,
                unitOfMeasure: 'Ounce',
                tags: ['Homeo', 'Medicine'],
                imageUri:
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lZGljaW5lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            },
            {
                productId: 2,
                name: 'Mangoes from Rajshahi',
                type: 'fruit',
                price: 500,
                unitOfPrice: 'Tk.',
                amount: 3,
                unitOfMeasure: 'Kilogram',
                tags: ['Fruits', 'FreshFruit', 'Mango'],
                imageUri:
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lZGljaW5lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            },
            {
                productId: 3,
                name: 'Mangoes from Chapai',
                type: 'fruit',
                price: 800,
                unitOfPrice: 'Tk.',
                amount: 4,
                unitOfMeasure: 'Kilogram',
                tags: ['Fruits', 'FreshFruit', 'Mango'],
                imageUri:
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lZGljaW5lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            },
            {
                productId: 4,
                name: 'Mangoes from Chapai',
                type: 'fruit',
                price: 800,
                unitOfPrice: 'Tk.',
                amount: 4,
                unitOfMeasure: 'Kilogram',
                tags: ['Fruits', 'FreshFruit', 'Mango', 'Chapai'],
                imageUri:
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lZGljaW5lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            },
        ];

        const typeToIcon = {
            Medicine: 'pill',
            fruit: 'seed',
            default: 'information-outline',
        };

        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
            products: testProductData,
            icons: typeToIcon,
            filteredProducts: testProductData,
        });
    }

    onChangeSearch(searchText) {
        const {products} = this.state;

        this.setState({
            searchText,
            filteredProducts:
                searchText && searchText.trim().length > 0
                    ? products.filter(x => x.name.includes(searchText.trim()))
                    : products,
        });
    }

    renderSearch() {
        const {searchText} = this.state;
        return (
            <View style={styles.searchbar}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={value => this.onChangeSearch(value)}
                    value={searchText}
                />
            </View>
        );
    }

    renderProducts() {
        const {filteredProducts, icons} = this.state;
        if (filteredProducts && filteredProducts.length) {
            const groups = groupBy(filteredProducts, 'type', true);

            const listGroups = Object.keys(groups).map(group => {
                const groupProducts = groups[group].map(product => (
                    <ProductListItem
                        key={product.productId}
                        product={product}
                        itemOnPress={() => console.log(product)}
                        onTagPress={tagName => console.log(tagName)}
                    />
                ));

                return (
                    <List.Accordion
                        title={group}
                        left={props => (
                            <List.Icon
                                {...props}
                                icon={icons[group] || icons.default}
                            />
                        )}
                        key={group}>
                        {groupProducts}
                    </List.Accordion>
                );
            });

            return <List.Section>{listGroups}</List.Section>;
        }

        return (
            <View style={styles.noProductText}>
                <Text>No Product to show</Text>
            </View>
        );
    }

    render() {
        return (
            <Background>
                <View style={styles.container}>
                    {this.renderSearch()}
                    <ScrollView>{this.renderProducts()}</ScrollView>
                </View>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    noProductText: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    searchbar: {
        padding: 10,
    },
});

export {ProductList};
