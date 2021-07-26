var path = require('path');
const appDirectory = path.resolve(__dirname);
const coreAppPath = path.resolve(appDirectory, '../EscrowBase');
var config = {
    projectRoot: appDirectory,
    watchFolders: [coreAppPath],
    resolver: {
        sourceExts: ['js', 'jsx', 'ts', 'tsx'],
        extraNodeModules: {
            // Here I reference my upper folder
            core: coreAppPath,

            // Important, those are all the dependencies
            // asked by the "../Project-Library" but which
            // are not present in the ROOT/node_modules
            // So install it in your RN project and reference them here

            'react-native-reanimated': path.resolve(
                appDirectory,
                'node_modules/react-native-reanimated',
            ),
            'react-native-gesture-handler': path.resolve(
                appDirectory,
                'node_modules/react-native-gesture-handler',
            ),
            'react-native-vector-icons': path.resolve(
                appDirectory,
                'node_modules/react-native-vector-icons',
            ),
            'react-native-paper': path.resolve(
                appDirectory,
                'node_modules/react-native-paper',
            ),
            '@react-native-async-storage/async-storage': path.resolve(
                appDirectory,
                'node_modules/@react-native-async-storage/async-storage',
            ),
            'module-resolver': path.resolve(
                appDirectory,
                'node_modules/module-resolver',
            ),
            'react-native-modal-dropdown': path.resolve(
                appDirectory,
                'node_modules/react-native-modal-dropdown',
            ),
            'prop-types': path.resolve(appDirectory, 'node_modules/prop-types'),
            'react-native': path.resolve(
                appDirectory,
                'node_modules/react-native',
            ),
            '@react-navigation/native': path.resolve(
                appDirectory,
                'node_modules/@react-navigation/native',
            ),
            '@react-navigation/stack': path.resolve(
                appDirectory,
                'node_modules/@react-navigation/stack',
            ),
            react: path.resolve(appDirectory, 'node_modules/react'),

            // dev dependencies
            '@babel/core': path.resolve(
                appDirectory,
                'node_modules/@babel/core',
            ),
            '@babel/runtime': path.resolve(
                appDirectory,
                'node_modules/@babel/runtime',
            ),
            'babel-jest': path.resolve(appDirectory, 'node_modules/babel-jest'),
            jest: path.resolve(appDirectory, 'node_modules/jest'),
            'metro-react-native-babel-preset': path.resolve(
                appDirectory,
                'node_modules/metro-react-native-babel-preset',
            ),
            'react-test-renderer': path.resolve(
                appDirectory,
                'node_modules/react-test-renderer',
            ),
        },
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
};

module.exports = config;
