/* eslint-disable react-native/no-inline-styles */
// modules imports
import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {gql, useQuery, useMutation} from '@apollo/client';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as ImagePicker from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import {
  faChevronLeft,
  faBars,
  faSquare,
  faPlay,
  faCirclePlus,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';

// styles, assets and components imports
import styles from '../styles/ProfileScreen.css';
import COLORS from '../constants/colors';
import SIZES from '../constants/sizes';
import defaultAvator from '../assets/images/blankProfile.png';
import PopupModal from '../components/PopupModal';
import Octagon from '../components/Shapes';
// import Shape from 'react-native-clip-path';

// constants
const decagonSvg = `
<svg width="400px" height="400px" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <polygon style="fill:none;stroke:#fdbb21;stroke-width:2.5px;" points="129.665631459995,191.301425564335 70.3343685400051,191.301425564335 22.3343685400051,156.427384220077 4,100 22.334368540005,43.5726157799226 70.334368540005,8.69857443566526 129.665631459995,8.69857443566525 177.665631459995,43.5726157799226 196,100 177.665631459995,156.427384220077" />
</svg>
`;

const FETCH_USER_DATA = gql`
  query {
    user: getUserDetails {
      Name
      Designation
      Website
      Photo
    }
  }
`;

const UPDATE_USER_PHOTO = gql`
  mutation updateUserPhoto($photoData: String!) {
    user: addProfilePicture(photoData: $photoData) {
      Photo
    }
  }
`;

const ProfileScreen = ({navigation, route}) => {
  // component states
  const [storyIsPresent, setStoryIsAdded] = useState(false);
  const [storyViewed, setStoryViewed] = useState(false);
  const [newsDetail, setNewsDetail] = useState({
    newsImage: '',
    newsHeadline: '',
    usersComment: '',
  });
  const [showModal, setShowModal] = useState(false);

  // graphql api
  const {data, loading, error, refetch} = useQuery(FETCH_USER_DATA);
  const [updateUserPhotoMutatioin] = useMutation(UPDATE_USER_PHOTO);

  // side effects
  useEffect(() => {
    if (route.params?.newsDetail) {
      setNewsDetail(route.params.newsDetail);
    }
    if (route.params?.storyShowMode) {
      setStoryIsAdded(true);
    }
  }, [route.params?.newsDetail, route.params?.storyShowMode]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    console.log(error.message);
  }

  // handler functions
  const handleOpenGallery = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', includeBase64: true, maxHeight: 200, maxWidth: 200},
      response => {
        setShowModal(false);
        if (!response?.assets) {
          return;
        }
        const photoData = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
        updateUserPhotoMutatioin({
          variables: {photoData: photoData},
        }).then(() => {
          refetch();
        });
      },
    );
  };
  const handleOpenCamera = () => {
    ImagePicker.launchCamera(
      {mediaType: 'photo', includeBase64: true, maxHeight: 200, maxWidth: 200},
      response => {
        setShowModal(false);
        if (!response?.assets) {
          return;
        }
        const photoData = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
        updateUserPhotoMutatioin({
          variables: {photoData: photoData},
        }).then(() => {
          refetch();
        });
      },
    );
  };
  const handlePhotoUpload = () => {
    setShowModal(true);
  };
  const handleStoryAdd = () => {
    if (storyIsPresent) {
      navigation.navigate('StoryScreen', {
        storyShowMode: true,
        newsDetail: newsDetail,
      });
      setTimeout(() => setStoryViewed(true), 300);
    } else {
      navigation.navigate('StoryScreen', {
        storyShowMode: false,
      });
    }
  };

  //   returning ui
  return (
    <>
      <PopupModal
        visible={showModal}
        handleShowModal={setShowModal}
        handleOpenCamera={handleOpenCamera}
        handleOpenGallery={handleOpenGallery}
      />
      <View style={styles.screen}>
        {/* --------------------------------STATUS BAR------------------------------- */}
        <StatusBar barStyle="dark-content" />

        {/* ----------------------------------HEADER----------------------------- */}
        <View style={styles.header}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={SIZES.icons}
            color={COLORS.yellow}
          />
          <FontAwesomeIcon
            icon={faBars}
            size={SIZES.icons}
            color={COLORS.yellow}
          />
        </View>

        {/* ---------------------------------PROFILE INFO------------------------------ */}
        {/* <Shape /> */}
        <View style={styles.profileInfo}>
          {/* Profile Photo */}
          <View style={styles.profilePhoto}>
            <Octagon
              profileImageSource={
                data?.user.Photo && data.user.Photo.length > 10
                  ? {uri: data?.user.Photo}
                  : defaultAvator
              }
              handlers={[handleStoryAdd, handlePhotoUpload]}
              borderColor={
                storyViewed
                  ? 'lightgrey'
                  : storyIsPresent
                  ? COLORS.yellow
                  : 'transparent'
              }
            />
            {!storyIsPresent ? (
              <FontAwesomeIcon
                icon={faCirclePlus}
                size={SIZES.icons}
                color={COLORS.yellow}
                style={[styles.iconOnProfile, {backgroundColor: 'transparent'}]}
              />
            ) : !storyViewed ? (
              <FontAwesomeIcon
                icon={faEllipsis}
                size={60}
                color={COLORS.yellow}
                style={[styles.iconOnProfile, {backgroundColor: 'transparent'}]}
              />
            ) : null}
          </View>

          {/* ------------------------------USER DETAIL--------------------------------- */}
          <View style={styles.userDetails}>
            {/* User Name */}
            <Text
              style={{
                fontSize: SIZES.largeFont,
                letterSpacing: SIZES.letterSpacing,
              }}>
              {data?.user.Name ? data.user.Name : 'user'}
            </Text>

            {/* User Bio */}
            <View style={styles.userDetails}>
              <Text style={{fontSize: SIZES.mediumFont}}>
                {data?.user.Designation ? data.user.Designation : 'designation'}
              </Text>
              <Text style={{fontSize: SIZES.mediumFont}}>
                {data?.user.Website ? data.user.Website : 'website'}
              </Text>
            </View>
          </View>
        </View>

        {/* --------------------------FOOTER------------------------------------- */}
        <View>
          <View style={styles.footerLine} />
          <View style={styles.footerDecagon}>
            <SvgXml xml={decagonSvg} width={SIZES.icons} height={SIZES.icons} />
          </View>
          <View style={styles.footerBottom}>
            <FontAwesomeIcon
              icon={faSquare}
              size={SIZES.icons}
              color={COLORS.yellow}
            />
            <FontAwesomeIcon
              icon={faPlay}
              style={{transform: [{rotate: '-90deg'}]}}
              size={SIZES.icons}
              color={COLORS.yellow}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;
