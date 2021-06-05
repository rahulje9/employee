import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import BackIcon from '../../assets/images/chevron-left.svg';
import GlobeIcon from '../../assets/images/globe.svg';
import AddressIcon from '../../assets/images/map.svg';
import MonitorIcon from '../../assets/images/monitor.svg';
import UserIcon from '../../assets/images/user.svg';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/helpers/responsive';

const Details = ({navigation, route}) => {
  const details = route?.params?.details;

  const renderImage = details?.profile_image
    ? {
        uri: details?.profile_image,
        priority: FastImage.priority.normal,
      }
    : require('../../assets/images/avatar.png');

  const Card = ({icon, label, value}) => {
    return (
      <View style={style.cardContainer}>
        <View>{icon}</View>
        <View style={style.labelView}>
          {label && <Text style={style.labelText}>{label}</Text>}
        </View>
        {value && (
          <TouchableOpacity
            disabled={label !== 'Website'}
            activeOpacity={0.5}
            style={style.valueView}>
            <Text style={style.valueText}>{value}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView bounces={false} contentContainerStyle={style.flexOne}>
        <View style={style.container}>
          <View style={style.linearGradientView}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.5, y: 1.0}}
              colors={['#6DD2F4', '#699DF4', '#6562F0']}
              style={style.linearGradient}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
                style={style.bckBtn}>
                <BackIcon
                  width={responsiveWidth(10)}
                  height={responsiveWidth(10)}
                  color={'#fff'}
                />
              </TouchableOpacity>
              <View style={style.imageView}>
                <FastImage
                  style={style.imageStyle}
                  source={renderImage}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <View style={style.nameView}>
                  <Text style={style.nameLabel}>{details?.name}</Text>
                  <Text style={style.emailLabel}>{details?.email}</Text>
                  <Text style={style.phoneLabel}>{details?.phone}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={style.viewChild}>
            <Text style={style.detailsTitle}>Details</Text>
            <View>
              <Card
                icon={<UserIcon color={'#000'} />}
                label={'Username'}
                value={details?.username}
              />
              <Card
                icon={<AddressIcon color={'#000'} />}
                label={'Address'}
                value={details?.address?.city}
              />
              <Card
                icon={<UserIcon color={'#fff'} />}
                value={details?.address?.street}
              />
              <Card
                icon={<UserIcon color={'#fff'} />}
                value={details?.address?.suite}
              />
              <Card
                icon={<UserIcon color={'#fff'} />}
                value={details?.address?.zipcode}
              />
              <Card
                label={'Company'}
                icon={<MonitorIcon color={'#000'} />}
                value={details?.company?.name}
              />
              <Card
                icon={<UserIcon color={'#fff'} />}
                value={details?.company?.catchPhrase}
              />
              <Card
                icon={<UserIcon color={'#fff'} />}
                value={details?.company?.bs}
              />

              <Card
                label={'Website'}
                icon={<GlobeIcon color={'#000'} />}
                value={details?.website}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexOne: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBoxView: {
    width: responsiveWidth(80),
    height: responsiveHeight(5),
    borderRadius: 10,
    backgroundColor: '#ebf0f270',
    flexDirection: 'row',
  },
  textinput: {
    height: responsiveHeight(5),
    width: responsiveWidth(70),
    paddingHorizontal: responsiveWidth(2),
  },
  searchIconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradientView: {
    flex: 0.3,
  },
  bckBtn: {
    position: 'absolute',
    left: responsiveWidth(1),
    top: responsiveWidth(2),
    padding: 5,
  },
  imageView: {
    width: responsiveWidth(90),
    flexDirection: 'row',
    paddingTop: responsiveHeight(5),
  },
  imageStyle: {
    width: responsiveWidth(28),
    height: responsiveWidth(28),
    borderRadius: responsiveWidth(15),
  },
  nameView: {
    marginLeft: responsiveWidth(5),
    justifyContent: 'center',
  },
  nameLabel: {
    fontSize: responsiveFontSize(2.2),
    flexWrap: 'wrap',
    color: '#fff',
    fontWeight: 'bold',
    width: responsiveWidth(50),
  },
  emailLabel: {
    fontSize: responsiveFontSize(1.8),
    flexWrap: 'wrap',
    marginTop: 5,
    color: '#ebeae8',
  },
  phoneLabel: {
    fontSize: responsiveFontSize(1.8),
    flexWrap: 'wrap',
    marginTop: 5,
    color: '#ebeae8',
  },
  detailsTitle: {
    fontSize: responsiveFontSize(2.8),
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  viewChild: {
    flex: 0.7,
    paddingHorizontal: responsiveWidth(3),
    paddingTop: responsiveHeight(3),
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1),
    marginVertical: 5,
  },
  labelView: {
    flex: 0.4,
    marginLeft: 10,
  },
  labelText: {
    fontSize: responsiveFontSize(1.8),
    color: '#878787',
  },
  valueView: {
    flex: 0.6,
  },
  valueText: {
    fontSize: responsiveFontSize(1.8),
    color: '#000',
    fontWeight: 'bold',
  },
});
