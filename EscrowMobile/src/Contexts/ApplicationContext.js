import React from 'react';
import {AccountContextProvider, ThemeContextProvider} from 'core';

export const AppContextProvider = ({children}) => {
    return (
        <AccountContextProvider>
            <ThemeContextProvider>{children}</ThemeContextProvider>
        </AccountContextProvider>
    );
};
