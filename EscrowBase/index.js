// context
import {AccountContext, AccountContextProvider} from './src/Contexts/AccountContext';
import {backgroundTypes, themes, ThemeContext, ThemeContextProvider} from './src/Contexts/ThemeContext';

// component
import {InputBase} from './src/Components/InputBase';
import {TextInput, NumberInput, TextArea, PasswordInput, EmailInput} from './src/Components/Inputs';
import {LoadingPanel, MessageDialog, LoaderAndMessageDialog} from './src/Components/Dialogs';
import {DropDownList} from './src/Components/DropDownList';
import {MiniSettings} from './src/Components/MiniSettings';

// asset
import {backgroundImages} from './assets';

// utility
import {accountPages, registerPages, productPages, storageKeys} from './src/Utility/enums';
// import * as Validations from './src/Utility/Validations';
import {groupBy} from './src/Utility/Utils';

// page
import {Login, AccountInfoInputs, AddressTakerInputs, PersonalInfoInputs} from './src/Pages/AccessControl';

export {AccountContext, AccountContextProvider, backgroundTypes, themes, ThemeContext, ThemeContextProvider, InputBase, TextInput, NumberInput, TextArea, PasswordInput, EmailInput, LoadingPanel, MessageDialog, LoaderAndMessageDialog, DropDownList, backgroundImages, accountPages, registerPages, productPages, storageKeys, groupBy, MiniSettings, Login, AccountInfoInputs, AddressTakerInputs, PersonalInfoInputs};

