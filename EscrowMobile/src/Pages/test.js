import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {TextInput} from 'core';

class Test extends React.Component {
    state = {
        gender: '',
    };

    render() {
        const {gender} = this.state;
        return (
            <View style={styles.container}>
                <Text>Testing</Text>
                <TextInput
                    label="testing"
                    value={gender}
                    onChangeText={v => this.setState({gender: v})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default Test;
