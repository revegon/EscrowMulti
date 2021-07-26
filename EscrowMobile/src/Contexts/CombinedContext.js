import React from 'react';
import {AccountContext, ThemeContext} from 'core';

// taken from https://stackoverflow.com/questions/53988193/how-to-get-multiple-static-contexts-in-new-context-api-in-react-v16-6
export const CombinedContext = React.createContext({
    themeContext: {},
    accountContext: {},
});

export const CombinedContextProvider = ({children}) => {
    return (
        <AccountContext.Consumer>
            {accountContext => (
                <ThemeContext.Consumer>
                    {themeContext => (
                        <CombinedContext.Provider
                            value={{themeContext, accountContext}}>
                            {children}
                        </CombinedContext.Provider>
                    )}
                </ThemeContext.Consumer>
            )}
        </AccountContext.Consumer>
    );
};

export const wrapWithCombinedContextProvider = Component => {
    return props => (
        <CombinedContextProvider>
            <Component {...props} />
        </CombinedContextProvider>
    );
};
