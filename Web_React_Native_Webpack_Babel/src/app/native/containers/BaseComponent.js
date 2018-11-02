import { Component } from 'react';




/** The app entry point */
class BaseComponent extends Component {

    componentDidMount() {

      /**
       * Registering androind hard back button
       */
        if (Platform.OS == "android" && listener == null) {
          listener = BackAndroid.addEventListener("hardwareBackPress", () => {
            return androidBackButtonPressed()
          })
        }
      }
    
    /**
     * Handle android hardware button press event
     */
    androidBackButtonPressed =()=> {

    }

}

export default BaseComponent
