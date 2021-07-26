import React from 'react';
import {DefaultTheme, DarkTheme, Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {backgroundImages} from '../../assets';

const defaultTheme = {
    ...DefaultTheme,
    backgroundImage: backgroundImages.light,
    colors: {
        ...DefaultTheme.colors,
        title: '#add8e6',
    },
};

const darkTheme = {
    ...DarkTheme,
    backgroundImage: backgroundImages.dark,
    colors: {
        ...DarkTheme.colors,
        surface: '#000000',
        title: '#add8e6',
    },
};

export const backgroundTypes = {
    solid: 'solid',
    image: 'image',
};

export const themes = {
    default: defaultTheme,
    dark: darkTheme,
};

export const ThemeContext = React.createContext({
    name: 'default',
    theme: {},
    backgroundType: backgroundTypes.image,
    changeTheme: theme => console.log(theme),
    changeBackgroundType: type => console.log(type),
});

export class ThemeContextProvider extends React.Component {
    state = {
        name: 'dark',
        theme: themes.dark,
        backgroundType: backgroundTypes.image,
    };

    changeTheme = name =>
        this.setState({
            name,
            theme: themes[name],
        });

    changeBackgroundType = backgroundType => this.setState({backgroundType});

    render() {
        const {children} = this.props;
        const {name, backgroundType, theme} = this.state;
        return (
            <ThemeContext.Provider
                value={{
                    name,
                    theme,
                    backgroundType,
                    changeTheme: this.changeTheme,
                    changeBackgroundType: this.changeBackgroundType,
                }}>
                <Provider theme={theme}>
                    <NavigationContainer theme={theme}>
                        {children}
                    </NavigationContainer>
                </Provider>
            </ThemeContext.Provider>
        );
    }
}
