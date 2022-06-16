/* eslint-disable react-native/no-inline-styles */
import {View, Button} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const PopupModal = ({
  visible,
  handleShowModal,
  handleOpenGallery,
  handleOpenCamera,
}) => {
  return (
    <Modal
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      backdropOpacity={0.1}
      onBackdropPress={() => {
        handleShowModal(false);
      }}
      isVisible={visible}
      style={{
        margin: 0,
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        height: 100,
      }}>
      <View style={{width: '80%', marginBottom: 10}}>
        <Button
          title="Upload from Gallery"
          onPress={() => handleOpenGallery()}
        />
      </View>
      <View style={{width: '80%'}}>
        <Button
          title="Capture from Camera"
          onPress={() => handleOpenCamera()}
        />
      </View>
    </Modal>
  );
};

export default PopupModal;
