import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Background} from '../../Components/Background';

export const AccessControlBackground = ({children, backgroundImage}) => {
    return (
        <View style={styles.container}>
            <Background backgroundImage={backgroundImage}>
                <View style={styles.outerContainer}>{children}</View>
            </Background>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    outerContainer: {
        flex: 1,
        margin: 20,
    },
});
