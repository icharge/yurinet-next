import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Header from './header';

class MyLayout extends Component {

  render() {

    return (
      <div></div>
    );
  }

}

function mapStateToProps(state) {
  return {
    // sidebar: state.personalize.sidebar,
  };
}

export default (connect(mapStateToProps)(MyLayout));
