import React from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import {LoaderAndMessageDialog} from 'core';
import {ImageTaker} from '../../../Components/ImageTaker';
import {
    CombinedContext,
    wrapWithCombinedContextProvider,
} from '../../../Contexts/CombinedContext';
import {AccessControlBackground} from '../background';

class ProfileImageTaker extends React.Component {
    state = {
        showLoading: false,
        serverError: '',
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => this.onBackPressed(),
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onDone = file => {
        this.setState({showLoading: true});
        const {accountContext} = this.context;
        accountContext.updateUserInfo({avatar: file});
        accountContext.onRegister().then(
            () => this.setState({showLoading: false}),
            error => this.setState({serverError: error, showLoading: false}),
        );
    };

    onBackPressed() {
        this.props.navigation.goBack();
    }

    renderTitle() {
        const {themeContext} = this.context;
        const {theme} = themeContext;
        return (
            <View style={styles.titleSection}>
                <IconButton
                    icon="arrow-left"
                    color={theme.colors.title}
                    onPress={() => this.onBackPressed()}
                    style={styles.backButton}
                />
                <View style={styles.titleContainer}>
                    <Title style={styles.title(theme)}>Profile Picture</Title>
                </View>
            </View>
        );
    }

    render() {
        const {showLoading, serverError} = this.state;
        return (
            <AccessControlBackground>
                {this.renderTitle()}
                <ImageTaker
                    doneButtonLabel="Done"
                    onDone={file => this.onDone(file)}
                />
                <LoaderAndMessageDialog
                    isLoading={showLoading}
                    message={serverError}
                />
            </AccessControlBackground>
        );
    }
}

const styles = StyleSheet.create({
    backButton: {
        margin: 5,
    },
    titleSection: {
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'center',
    },
    title: theme => ({
        color: theme.colors.title,
    }),
});

ProfileImageTaker.contextType = CombinedContext;

export default wrapWithCombinedContextProvider(ProfileImageTaker);
