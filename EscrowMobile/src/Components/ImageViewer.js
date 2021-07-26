import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';
import {ActivityIndicator, Portal, Modal} from 'react-native-paper';
import Viewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';

class ImageViewer extends React.Component {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('screen');
        this.state = {
            isLoading: false,
            showPrompt: false,
            screenHeight: height,
            screenWidth: width,
        };
    }

    closeModal() {
        this.setState({showPrompt: false});
    }

    toggleImageViewer() {
        const {showPrompt} = this.state;
        this.setState({
            showPrompt: !showPrompt,
        });
    }

    render() {
        const {isLoading, showPrompt, screenHeight, screenWidth} = this.state;
        const {url, height, width} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.toggleImageViewer()}>
                    {isLoading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" />
                        </View>
                    )}
                    <Image
                        source={{uri: url}}
                        style={styles.image(height, width)}
                        onLoadStart={() => this.setState({isLoading: true})}
                        onLoadEnd={() => this.setState({isLoading: false})}
                    />
                </TouchableOpacity>
                <Portal>
                    <Modal
                        visible={showPrompt}
                        onDismiss={() => this.closeModal()}
                        contentContainerStyle={styles.modal(
                            screenHeight,
                            screenWidth,
                        )}>
                        <Viewer
                            imageUrls={[{url: url}]}
                            onCancel={() => this.toggleImageViewer()}
                            renderIndicator={() => {}}
                            backgroundColor="transparent"
                            height={screenHeight}
                            width={screenWidth}
                            enableSwipeDown
                            maxOverflow={1}
                        />
                    </Modal>
                </Portal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    image: (height, width) => ({height, width}),
    modal: (height, width) => ({
        backgroundColor: 'transparent',
        height: height,
        width: width,
        padding: 10,
    }),
});

ImageViewer.propTypes = {
    url: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
};

export {ImageViewer};
