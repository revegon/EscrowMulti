import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import PropTypes from 'prop-types';

class FileSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    async openChooser(onFileSelected) {
        try {
            const file = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            // console.log(
            //     file.uri,
            //     file.type, // mime type
            //     file.name,
            //     file.size,
            // );
            onFileSelected(file);
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                console.log(error);
            }
        }
    }

    render() {
        const {label, disabled, onFileSelected, containerStyle} = this.props;
        return (
            <View style={[styles.container, containerStyle]}>
                <Button
                    mode="contained"
                    onPress={() => this.openChooser(onFileSelected)}
                    disabled={disabled}>
                    {label || 'Choose a file'}
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

FileSelector.propTypes = {
    onFileSelected: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
};

export {FileSelector};
