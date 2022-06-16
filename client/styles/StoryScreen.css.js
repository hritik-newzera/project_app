import {StyleSheet} from 'react-native';
import SIZES from './../constants/sizes';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#253a63',
  },
  progressBar: {
    height: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    margin: 30,
    justifyContent: 'center',
  },
  innerProgressBar: {
    width: '100%',
    height: 5,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  newsContainer: {
    height: 250,
    margin: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  newsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    marginTop: 40,
  },
  newsHeadline: {
    color: 'white',
    fontSize: 23,
    marginTop: 10,
  },
  userCommentContainer: {
    margin: 20,
    marginTop: 130,
    alignItems: 'center',
  },
  userComment: {
    color: 'white',
    fontSize: 40,
  },
  addButton: {
    margin: 20,
    alignItems: 'center',
  },
  addNewsButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  newsHeadlineInput: {
    color: 'white',
    textAlign: 'center',
    fontSize: SIZES.mediumFont,
    padding: 20,
  },
});
export default styles;
