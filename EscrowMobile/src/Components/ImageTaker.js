import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, IconButton, Portal, Dialog, Text} from 'react-native-paper';
import {FileSelector} from './FileSelector';
import {ImageViewer} from './ImageViewer';
import PropTypes from 'prop-types';
import {LoadingPanel} from 'core';
import {RNCamera, FaceDetector} from 'react-native-camera';

class ImageTaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            useCamera: false,
            file: null,
            allowTakingPic: false,
            comeraType: RNCamera.Constants.Type.front,
            errorMessage: '',
            isProcessing: false,
        };
    }

    takePhoto = async self => {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            try {
                self.setState({isProcessing: true});
                const data = await this.camera.takePictureAsync(options);
                console.log(data.uri);
                const detectionResult = await FaceDetector.detectFacesAsync(
                    data.uri,
                );
                const state = {
                    isProcessing: false,
                };
                if (detectionResult.faces.length === 0) {
                    state.allowTakingPic = false;
                    state.errorMessage =
                        'No face found in the image. Do you want to try again?';
                } else if (detectionResult.faces.length > 1) {
                    state.errorMessage =
                        'More than one faces detected. Do you want to try again?';
                } else {
                    state.file = data;
                    state.useCamera = false;
                    state.allowTakingPic = false;
                    state.errorMessage = '';
                }
                self.setState(state);
                // console.log(detectionResult.faces.length);
                // console.log(data);
            } catch (error) {
                self.setState({
                    isProcessing: false,
                    errorMessage: 'Error processing image',
                });
                console.log(error);
            }
        }
    };

    changeCameraType = currentType => {
        const cameraType =
            currentType === RNCamera.Constants.Type.front
                ? RNCamera.Constants.Type.back
                : RNCamera.Constants.Type.front;
        this.setState({
            cameraType,
        });
    };

    renderMessageDialog() {
        const {errorMessage} = this.state;
        return (
            <Dialog visible={errorMessage}>
                <Dialog.Content>
                    <Text>{errorMessage}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => this.setState({errorMessage: ''})}>
                        Yes
                    </Button>
                    <Button
                        onPress={() =>
                            this.setState({errorMessage: '', useCamera: false})
                        }>
                        No
                    </Button>
                </Dialog.Actions>
            </Dialog>
        );
    }

    renderCamera() {
        const {allowTakingPic, comeraType, isProcessing} = this.state;
        return (
            <View>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={comeraType}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onFacesDetected={this.handleFaceDetection}
                    onFaceDetectionError={({isOperational}) =>
                        this.setState({allowTakingPic: false})
                    }
                />
                <View style={styles.cameraButtonContainer}>
                    <IconButton
                        icon="refresh"
                        onPress={() => this.changeCameraType()}
                    />
                    <Button
                        mode="contained"
                        disabled={!allowTakingPic}
                        onPress={() => this.takePhoto()}>
                        Snap
                    </Button>
                </View>
                <Portal>
                    <LoadingPanel isLoading={isProcessing} noPortal />
                    {this.renderMessageDialog()}
                </Portal>
            </View>
        );
    }

    renderPreview() {
        const {
            doneButtonLabel,
            cameraButtonLabel,
            fileChooserButtonLabel,
            onDone,
        } = this.props;
        const {file} = this.state;
        return (
            <>
                <View style={styles.imageViewer}>
                    {file && <ImageViewer url={file.uri} />}
                </View>
                <View style={styles.buttonContainer}>
                    <Button>{cameraButtonLabel || 'Use Camera'}</Button>
                    <FileSelector
                        label={fileChooserButtonLabel || 'From Files'}
                        onFileSelected={selectedFile =>
                            this.setState({file: selectedFile})
                        }
                    />
                    {file && (
                        <Button onPress={() => onDone(file)}>
                            {doneButtonLabel || 'Done'}
                        </Button>
                    )}
                </View>
            </>
        );
    }

    render() {
        const {useCamera} = this.state;
        return (
            <View style={styles.container}>
                {useCamera ? this.renderCamera() : this.renderPreview()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageViewer: {
        flex: 1,
    },
    buttonContainer: {
        // flex: 1,
        flexDirection: 'row',
    },
    cameraButtonContainer: {
        flexDirection: 'row',
    },
});

ImageTaker.propTypes = {
    onDone: PropTypes.func.isRequired,
    doneButtonLabel: PropTypes.string,
    cameraButtonLabel: PropTypes.string,
    fileChooserButtonLabel: PropTypes.string,
};

export {ImageTaker};
