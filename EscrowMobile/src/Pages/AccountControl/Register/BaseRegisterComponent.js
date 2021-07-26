import React from 'react';
import {StyleSheet, View, BackHandler, Platform} from 'react-native';
import {Button, IconButton, Title} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AccessControlBackground} from '../background';
import {MiniSettings, ThemeContext} from 'core';

class BaseRegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.inputComponent = null;
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => this.onBackPressed(),
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    // needs to overridden
    onBackPressed() {}

    verifyInputs() {
        if (this.inputComponent && this.inputComponent.verifyInputValues()) {
            this.inputComponent.updateUserInfo();
            this.performNext();
        }
    }

    // needs to overridden
    performNext() {}

    // needs to overridden
    renderInputs() {
        return null;
    }

    renderButtons() {
        return (
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={styles.okBtn}
                    onPress={() => this.verifyInputs()}>
                    Next
                </Button>
            </View>
        );
    }

    renderTitle() {
        if (!this.title) {
            return null;
        }
        const {theme} = this.context;
        return (
            <View style={styles.titleSection}>
                <IconButton
                    icon="arrow-left"
                    color={theme.colors.title}
                    onPress={() => this.onBackPressed()}
                    style={styles.backButton}
                />
                <View style={styles.titleContainer}>
                    <Title style={styles.title(theme)}>{this.title}</Title>
                </View>
                <MiniSettings containerStyle={styles.settingsButton} />
            </View>
        );
    }

    renderContent() {
        return (
            <>
                {this.renderTitle()}
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'always'}
                    enableAutomaticScroll={Platform.OS === 'ios'}
                    extraScrollHeight={200}
                    enableOnAndroid={true}
                    centerContent>
                    <View style={styles.scrollWrapper}>
                        {this.renderInputs()}
                        {this.renderButtons()}
                    </View>
                </KeyboardAwareScrollView>
            </>
        );
    }

    render() {
        return (
            <AccessControlBackground>
                {this.renderContent()}
            </AccessControlBackground>
        );
    }
}

const styles = StyleSheet.create({
    scrollWrapper: {
        flex: 1,
    },
    okBtn: {
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    backButton: {
        margin: 5,
    },
    titleSection: {
        flexDirection: 'row',
        width: '100%',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
    },
    title: theme => ({
        color: theme.colors.title,
    }),
    settingsButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});

BaseRegisterComponent.contextType = ThemeContext;

export {BaseRegisterComponent};
