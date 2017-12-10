/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { 
  IndexScroller,
  lowerAlphabetIndex,
  upperAlphabetIndex
} from 'rn-index-scroller'

const index = upperAlphabetIndex

export default class example extends Component {
  state = {
    currentIndex: ''
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Index Scroller Example
        </Text>
        <View style={styles.currentIndexWrap}>
          <Text style={styles.currentIndex}>
            {index[this.state.currentIndex]}
          </Text>
        </View>
        <IndexScroller onChange={(i)=>{this.setState({currentIndex: i})}} index={index} style={{
          fontSize: 16,
          paddingVertical: 10,
          paddingTop: 120,
          fontWeight: 'bold',
          color: 'blue',
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  currentIndex: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  currentIndexWrap: {
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#444'
  }
});

AppRegistry.registerComponent('example', () => example);
