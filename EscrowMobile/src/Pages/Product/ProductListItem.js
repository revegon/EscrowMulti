import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Title, Text, Chip} from 'react-native-paper';
import {ImageViewer} from '../../Components/ImageViewer';
import PropTypes from 'prop-types';
import {ThemeContext} from 'core';

class ProductListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showImagePrompt: false,
        };
    }

    renderPricingSection(product) {
        return (
            <View>
                <Text>Price: {`${product.unitOfPrice} ${product.price}`}</Text>
                <Text>
                    Amount: {`${product.amount} ${product.unitOfMeasure}`}
                </Text>
            </View>
        );
    }

    renderTags() {
        const {product, onTagPress} = this.props;
        const productTags = product.tags.map(item => (
            <Chip
                key={item}
                onPress={() => onTagPress(item)}
                style={styles.chip}>
                {item}
            </Chip>
        ));

        return <View style={styles.tagContainer}>{productTags}</View>;
    }

    render() {
        const {itemOnPress, product, id} = this.props;
        return (
            <ThemeContext.Consumer>
                {({theme}) => (
                    <TouchableOpacity
                        onPress={() => itemOnPress()}
                        style={styles.container(theme)}>
                        <View style={styles.product} key={id}>
                            <View style={styles.imageContainer}>
                                <ImageViewer
                                    url={product.imageUri}
                                    height={100}
                                    width={100}
                                />
                            </View>
                            <View style={styles.detailContainer}>
                                <Title>{product.name}</Title>
                                {/* <Text>{product.type}</Text> */}
                                {this.renderPricingSection(product)}
                            </View>
                        </View>
                        {this.renderTags()}
                    </TouchableOpacity>
                )}
            </ThemeContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: theme => ({
        margin: 10,
        backgroundColor: theme.colors.background,
    }),
    product: {
        height: 110,
        flexDirection: 'row',
    },
    detailContainer: {
        flex: 1.5,
    },
    imgeContainer: {
        flex: 1,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
});

ProductListItem.propTypes = {
    itemOnPress: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    onTagPress: PropTypes.func,
    id: PropTypes.any,
};

export {ProductListItem};
