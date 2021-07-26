import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Portal, Dialog, Button} from 'react-native-paper';
import {
    ThemeContext,
    themes,
    backgroundTypes,
} from '../Contexts/ThemeContext';
import {DropDownList} from './DropDownList';

class MiniSettings extends React.Component {
    state = {
        showModal: false,
        themeName: '',
        backgroundType: '',
        changed: false,
    };

    componentDidMount() {
        const {name, backgroundType} = this.context;
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({themeName: name, backgroundType});
    }

    changeBackgroundType = backgroundType =>
        this.setState({backgroundType, changed: true});

    changeTheme = themeName => this.setState({themeName, changed: true});

    renderModalContent() {
        const {themeName, backgroundType} = this.state;
        return (
            <View style={styles.dialogContent}>
                <DropDownList
                    label="Background Type"
                    value={backgroundType}
                    choiceList={Object.keys(backgroundTypes)}
                    onChange={this.changeBackgroundType}
                    containerStyle={styles.dropDownContainer}
                />
                <DropDownList
                    label="Theme"
                    value={themeName}
                    choiceList={Object.keys(themes)}
                    onChange={this.changeTheme}
                    containerStyle={styles.dropDownContainer}
                />
            </View>
        );
    }

    hideDialog = () => {
        const {name, backgroundType} = this.context;
        this.setState({
            showModal: false,
            themeName: name,
            backgroundType,
            changed: false,
        });
    };

    ApplyChanges = () => {
        const {changeBackgroundType, changeTheme} = this.context;
        const {backgroundType, themeName} = this.state;
        changeBackgroundType(backgroundType);
        changeTheme(themeName);
        this.setState({showModal: false, changed: false});
    };

    renderDialog() {
        const {showModal, changed} = this.state;

        return (
            <Dialog visible={showModal} onDismiss={this.hideDialog}>
                <Dialog.Content>{this.renderModalContent()}</Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={this.ApplyChanges} disabled={!changed}>
                        Apply
                    </Button>
                    <Button onPress={this.hideDialog}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        );
    }

    render() {
        const {containerStyle} = this.props;
        const {theme} = this.context;
        return (
            <View style={[styles.container, containerStyle]}>
                <IconButton
                    icon="cog"
                    color={theme.colors.title}
                    onPress={() => this.setState({showModal: true})}
                />
                <Portal>{this.renderDialog()}</Portal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dialogContent: {
        // flex: 1,
    },
});

MiniSettings.contextType = ThemeContext;

export {MiniSettings};
