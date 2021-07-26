import React from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import {Title, IconButton, Text} from 'react-native-paper';
import {
    MiniSettings,
    LoadingPanel,
    Login as LoginInputs,
    ThemeContext,
} from 'core';
import {AccessControlBackground} from '../background';

class Login extends React.Component {
    state = {
        serverError: null,
        showLoading: false,
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => this.backBtnPressed(),
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    backBtnPressed() {
        this.props.navigation.goBack();
    }

    renderHeaderSection() {
        const {theme} = this.context;
        return (
            <View style={styles.titleSection}>
                <IconButton
                    icon="arrow-left"
                    color={theme.colors.title}
                    onPress={() => this.backBtnPressed()}
                    style={styles.backButton}
                />
                <View style={styles.titleTextContainer}>
                    <Title style={styles.title(theme)}>Login</Title>
                </View>
                <MiniSettings containerStyle={styles.settingsButton} />
            </View>
        );
    }

    render() {
        const {serverError, showLoading} = this.state;
        const {theme} = this.context;
        return (
            <AccessControlBackground>
                {this.renderHeaderSection()}
                {serverError && (
                    <View style={styles.serverErrorContainer}>
                        <Text style={styles.error(theme)}>{serverError}</Text>
                    </View>
                )}
                <LoginInputs
                    showLoading={() =>
                        this.setState({showLoading: true, serverError: null})
                    }
                    hideLoading={() => this.setState({showLoading: false})}
                    showError={error =>
                        this.setState({showLoading: false, serverError: error})
                    }
                />
                <LoadingPanel isLoading={showLoading} />
            </AccessControlBackground>
        );
    }
}

const styles = StyleSheet.create({
    titleTextContainer: {
        alignItems: 'center',
        marginBottom: 8,
        flex: 1,
    },
    title: theme => ({
        color: theme.colors.title,
    }),
    titleSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    backButton: {
        alignSelf: 'flex-end',
    },
    settingsButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    serverErrorContainer: {
        // alignItems: 'center'
    },
    error: theme => ({
        color: theme.colors.error,
    }),
});

Login.contextType = ThemeContext;

export {Login};
