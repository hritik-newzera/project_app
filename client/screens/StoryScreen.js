/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import styles from '../styles/StoryScreen.css';
import * as ImagePicker from 'react-native-image-picker';
import SIZES from '../constants/sizes';

const StoryScreen = ({route, navigation}) => {
  const storyShowMode = route.params.storyShowMode;
  // component states
  const [showAddButton, setShowAddButton] = useState(true);
  const [showTextInput, setShowTextInput] = useState(true);
  const [showCommentInput, setShowCommentInput] = useState(true);
  const [progressBarStatus, setProgressBarStatus] = useState(0);
  const [newsDetail, setNewsDetail] = useState({
    newsImage: '',
    newsHeadline: '',
    usersComment: '',
  });

  //   handler functions
  const handleStoryAdded = () => {
    navigation.navigate('ProfileScreen', {
      newsDetail: newsDetail,
      storyShowMode: true,
    });
  };
  const handleNewsAdd = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', includeBase64: true, maxHeight: 200, maxWidth: 200},
      response => {
        if (!response?.assets) {
          return;
        }
        const photoData = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
        setNewsDetail(prevNews => ({
          ...prevNews,
          newsImage: photoData,
        }));
        setShowAddButton(false);
      },
    );
  };
  const handleAddHeadline = () => {
    setShowTextInput(false);
  };
  const handleAddComment = () => {
    setShowCommentInput(false);
  };
  // side effects
  // To animate progress bar
  useEffect(() => {
    if (storyShowMode === false) {
      return;
    }
    const anim = new Animated.Value(0);
    anim.addListener(({value}) => setProgressBarStatus(value));
    Animated.timing(anim, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [storyShowMode]);
  // To navigate to profile screen after progress bar is complete
  useEffect(() => {
    if (storyShowMode === false) {
      return;
    }
    if (progressBarStatus === 100) {
      navigation.navigate('ProfileScreen');
    }
  }, [progressBarStatus, navigation, storyShowMode]);
  useEffect(() => {
    if (storyShowMode) {
      setNewsDetail(route.params.newsDetail);
    }
  }, [storyShowMode, route.params?.newsDetail]);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.statusbar}>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
      {/* ---------------------------PROGRESS BAR------------------------ */}
      {storyShowMode ? (
        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.innerProgressBar, {width: progressBarStatus + '%'}]}
          />
        </View>
      ) : null}
      {/* ---------------------------NEWS INFORMATION------------------------ */}
      {storyShowMode === false ? (
        // Input news image and headline
        <View>
          <TouchableOpacity style={styles.addNewsButton}>
            {showAddButton ? (
              <Button title="Add News Photo" onPress={handleNewsAdd} />
            ) : null}
          </TouchableOpacity>
          {showAddButton === false && showTextInput ? (
            <View>
              <TextInput
                placeholder="Type here to add news headline"
                placeholderTextColor="#fff"
                style={styles.newsHeadlineInput}
                value={newsDetail.newsHeadline}
                onChangeText={async newNews => {
                  setNewsDetail(prevNews => ({
                    ...prevNews,
                    newsHeadline: newNews,
                  }));
                }}
              />
              <TouchableOpacity style={styles.addNewsButton}>
                <Button title="Add Headline" onPress={handleAddHeadline} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null}
      {/* Show news image and headline */}
      <View style={styles.newsContainer}>
        {newsDetail.newsImage === '' ? null : (
          <Image
            source={{uri: newsDetail.newsImage}}
            resizeMode="cover"
            style={styles.newsImage}
          />
        )}
        {storyShowMode === true || showTextInput === false ? (
          <Text style={styles.newsHeadline}>{newsDetail.newsHeadline}</Text>
        ) : null}
      </View>

      {/* --------------------------------USER VIEWS--------------------------- */}
      {storyShowMode === false ? (
        // Input users comment
        <View>
          {showAddButton === false &&
          showTextInput === false &&
          showCommentInput === true ? (
            <View>
              <TextInput
                placeholder="Type here to add your views"
                placeholderTextColor="#fff"
                style={[
                  {
                    marginTop: 100,
                    fontSize: SIZES.mediumFont,
                    textAlign: 'center',
                    color: 'white',
                    padding: 20,
                  },
                ]}
                value={newsDetail.usersComment}
                onChangeText={async newComment => {
                  setNewsDetail(prevNews => ({
                    ...prevNews,
                    usersComment: newComment,
                  }));
                }}
              />
              <TouchableOpacity style={styles.addNewsButton}>
                <Button title="Add Views" onPress={handleAddComment} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null}
      {/* Show users comment */}
      {storyShowMode === true || showCommentInput === false ? (
        <View>
          <View style={styles.userCommentContainer}>
            <Text style={styles.userComment}>{newsDetail.usersComment}</Text>
          </View>
        </View>
      ) : null}
      {showCommentInput === false ? (
        <TouchableOpacity style={styles.addButton}>
          <Button title="Add Story" onPress={() => handleStoryAdded()} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default StoryScreen;
