import {StyleSheet} from 'react-native';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 25,
    justifyContent: 'space-between',
    fontFamily: 'gothic',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profilePhoto: {
    marginHorizontal: 'auto',
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  iconOnProfile: {
    position: 'absolute',
    bottom: 30,
    right: -10,
    backgroundColor: 'transparent',
    borderRadius: 50,
  },
  userDetails: {
    alignItems: 'center',
  },
  footerLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.yellow,
  },
  footerDecagon: {
    marginTop: -14,
    alignItems: 'center',
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default styles;
