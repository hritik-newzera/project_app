/* eslint-disable react-native/no-inline-styles */
import {View, Image, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';

const Octagon = props => {
  const [bgColor, setBgColor] = useState('transparent');
  const [borderColor, setBorderColor] = useState('transparent');
  useEffect(() => {
    setBorderColor(props.borderColor);
  }, [props.borderColor]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* Shaping image in octagon shape */}
      <View style={styles.octagon}>
        <View
          style={[
            styles.octagonUp,
            styles.octagonBar,
            {
              backgroundColor: bgColor,
              borderColor: borderColor,
            },
          ]}
        />
        <View
          style={[
            styles.octagonFlat,
            styles.octagonBar,
            {
              backgroundColor: bgColor,
              borderColor: borderColor,
            },
          ]}
        />
        <View
          style={[
            styles.octagonLeft,
            styles.octagonBar,
            {
              backgroundColor: bgColor,
              borderColor: borderColor,
            },
          ]}
        />
        <View
          style={[
            styles.octagonRight,
            styles.octagonBar,
            {
              backgroundColor: bgColor,
              borderColor: borderColor,
            },
          ]}
        />
      </View>
      <Pressable
        onPressIn={() => setBgColor('lightgrey')}
        onPressOut={() => setBgColor('transparent')}
        onPress={() => {
          props.handlers[0]();
        }}
        onLongPress={() => {
          props.handlers[1]();
        }}>
        <View
          style={{
            width: 150,
            height: 150,
            transform: [{rotate: '45deg'}],
            overflow: 'hidden',
          }}>
          <Image
            source={props.profileImageSource}
            style={{
              width: '100%',
              height: '100%',
              transform: [{rotate: '-45deg'}],
              zIndex: 10,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  octagonBar: {
    width: 42,
    height: 100,
    color: 'white',
    borderTopWidth: 3,
    borderBottomWidth: 3,
  },
  octagonUp: {},
  octagonFlat: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{rotate: '90deg'}],
  },
  octagonLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{rotate: '-45deg'}],
  },
  octagonRight: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{rotate: '45deg'}],
  },
  octagon: {
    transform: [{scale: 1.7}],
    position: 'absolute',
  },
});

export default Octagon;
