import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Dialog, Portal, Text, Button} from 'react-native-paper';

export const LoadingPanel = ({isLoading, noPortal = false}) => {
    const content = (
        <Dialog visible={isLoading}>
            <Dialog.Content>
                <ActivityIndicator size="large" />
            </Dialog.Content>
        </Dialog>
    );

    return noPortal ? content : <Portal>{content}</Portal>;
};

export const MessageDialog = ({
    message,
    dialogTitle = 'Error',
    buttonLabel = 'ok',
    noPortal = false,
}) => {
    const content = (
        <Dialog visible={!!message}>
            <Dialog.Title>{dialogTitle}</Dialog.Title>
            <Dialog.Content>
                <Text>{message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => this.hideMessage()}>
                    {buttonLabel}
                </Button>
            </Dialog.Actions>
        </Dialog>
    );

    return noPortal ? content : <Portal>{content}</Portal>;
};

export const LoaderAndMessageDialog = ({
    isLoading,
    message,
    dialogTitle = 'Error',
    buttonLabel = 'ok',
}) => {
    return (
        <Portal>
            <LoadingPanel isLoading={isLoading} noPortal />
            <MessageDialog
                message={message}
                dialogTitle={dialogTitle}
                buttonLabel={buttonLabel}
                noPortal
            />
        </Portal>
    );
};
