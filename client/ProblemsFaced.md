# Render Error
1. requireNativeComponent: "RNSScreenStackHeaderConfig" was not find in the UIManager
Solution: 
    * rerun "npx react-native run-ios" and "npx react-native run-android"

2. Linking external fonts
Solution:
    * create react-native.config.js
    * add the assets location there

3. Non-serializable values were found in the navigation state.
    * Happened when passed functions in the params to screens