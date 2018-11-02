import validator from 'validator';

import React from 'react';
import _get from 'lodash/get'

const required = (value,props) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return <span className="validation-help-block">Above field is required.</span>;
  }
};
 
const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="validation-help-block">{value} is not a valid email.</span>
  }
};

const mobile = (value) => {
    if (!validator.isMobilePhone(value)) {
        return <span className="validation-help-block">{value} is not a valid mobile number.</span>
    }
};


const website = (value) => {
    if (!validator.isURL(value)) {
        return <span className="validation-help-block">{value} is not a valid url.</span>
    }
};
 
const lt = (value, props) => {
  // get the maxLength from component's props
  if (!value.toString().trim().length > props.maxLength) {
    // Return jsx
    return <span className="validation-help-block">The value exceeded {props.maxLength} symbols.</span>
  }
};
 
const password = (value, props, components) => {
  // NOTE: Tricky place. The 'value' argument is always current component's value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['password'][0].value) { 
      // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    return <span className="validation-help-block">Passwords are not equal.</span>
  }
};

const hasError = (form) => {
    let hasError = false;
    let formChildren = _get(form,'state.byId',{})
    Object.keys(formChildren).forEach((childKey)=>{
        if(formChildren[childKey].error){
            hasError = true
        }
    })
    return hasError
}


export default {
    required: required,
    email: email,
    lt: lt,
    password: password,
    hasError: hasError,
    mobile: mobile,
    website: website
}