import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {backgroundTypes, ThemeContext, backgroundImages} from 'core';

export const Background = ({backgroundImage, children}) => {
    const {theme, backgroundType} = React.useContext(ThemeContext);
    return backgroundType === backgroundTypes.solid ? (
        <View style={styles.background(theme)}>{children}</View>
    ) : (
        <ImageBackground
            source={
                backgroundImage ||
                (theme && theme.backgroundImage) ||
                backgroundImages.default
            }
            resizeMode="cover"
            style={styles.image}>
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    background: theme => {
        return {
            backgroundColor: theme.colors.surface,
            flex: 1,
        };
    },
});
