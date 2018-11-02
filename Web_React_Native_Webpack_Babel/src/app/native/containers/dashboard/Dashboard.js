import React, { Component } from 'react';
import { View } from 'react-native';

import { appStyle } from '../../styles/styles';
import HelloWorld from '../../components/HelloWorld';

/************************** Redux************************/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
/********************************************************/

import { toggleColor } from '../../../actions/actions';

class Dashboard extends Component {

  componentDidMount() {
    this.interval = setInterval(
      () => {
        clearInterval(this.interval);
        this.props.navigation.navigate('Home');
      },
      1000
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("Component  will receive props");
    console.log(nextProps);
  }
  handleSubmit(event) {
    console.log(this.props);
  }


  render() {

    ///const { navigate } = this.props.navigation
    const { color, data } = this.props.toggleReducer;
    console.log("Inside component");
    console.log(this.props);
    return (


      <View style={appStyle.reactNativeWeb}>

        <HelloWorld
          onPress={() => {
            this.props.toggle();
          }}
          color={color}
        />
      </View>

    );
  }
}


const mapStateToProps = state => {
  console.log('login new mapStateToProps', state);
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: bindActionCreators(toggleColor, dispatch),
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

