import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import SearchIcon from '../../assets/images/search.svg';
import {fetchEmployeeList} from '../action/list';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/helpers/responsive';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [employeesData, setEmployeesData] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState('');

  const {employeesList, employeesListSuccess, employeesListError} = useSelector(
    state => state.listReducer,
  );

  const employeesListRef = useRef();
  const employeesListSuccessRef = useRef();
  const employeesListErrorRef = useRef();

  employeesListRef.current = employeesList;
  employeesListSuccessRef.current = employeesListSuccess;
  employeesListErrorRef.current = employeesListError;

  useEffect(() => {
    if (searchKeyWord?.length) {
      const res = employeesListRef.current?.filter(item =>
        item?.name?.includes(searchKeyWord),
      );
      if (res?.length) {
        setEmployeesData(res);
      }
    } else {
      if (
        employeesList?.length !== employeesListRef.current?.length ||
        searchKeyWord?.length === 0
      ) {
        setEmployeesData(employeesListRef.current);
      }
    }
  }, [employeesData, employeesList?.length, searchKeyWord]);

  useEffect(() => {
    if (!employeesListSuccessRef.current?.length) {
      dispatch(fetchEmployeeList()).then(() => {
        if (employeesListRef.current?.length) {
          setEmployeesData(employeesListRef.current);
        }
      });
    }
  }, [dispatch]);

  const renderData = ({item, index}) => {
    const renderImage = item?.profile_image
      ? {
          uri: item?.profile_image,
          priority: FastImage.priority.normal,
        }
      : require('../../assets/images/avatar.png');

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('Details', {details: item});
        }}
        style={style.card}>
        <FastImage
          style={style.image}
          source={renderImage}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={style.cardName}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              flexWrap: 'wrap',
              fontWeight: 'bold',
            }}>
            {item?.name}
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              flexWrap: 'wrap',
              color: 'grey',
            }}>
            {item?.company?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const Footer = () => (
    <View
      style={{
        paddingBottom: responsiveHeight(3),
      }}
    />
  );

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAvoidingView style={style.container}>
        <ScrollView
          bounces={false}
          contentContainerStyle={style.flexOne}
          style={style.flexOne}>
          <View style={style.flexOne}>
            <View style={style.linearGradientView}>
              <LinearGradient
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 1.0}}
                colors={['#6DD2F4', '#699DF4', '#6562F0']}
                style={style.linearGradient}>
                <View style={style.searchBoxView}>
                  <TextInput
                    onChangeText={v => setSearchKeyWord(v)}
                    maxLength={20}
                    placeholder="Search"
                    placeholderTextColor={'#fff'}
                    style={style.textinput}
                  />
                  <View style={style.searchIconView}>
                    <SearchIcon color={'#fff'} />
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View style={style.detailsView}>
              <View style={style.detailsChild}>
                <Text style={style.employeeLabel}>Employees</Text>
                <FlatList
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  data={employeesData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderData}
                  ListFooterComponent={<Footer />}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;

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
    color: '#fff',
    fontSize: responsiveFontSize(1.9),
  },
  searchIconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradientView: {
    flex: 0.3,
  },
  detailsView: {
    flex: 0.7,
  },
  detailsChild: {
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(3),
  },
  employeeLabel: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  card: {
    marginVertical: responsiveHeight(2),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
    borderRadius: 15,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#91919160',
  },
  image: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(12),
  },
  cardName: {
    marginLeft: responsiveWidth(2),
    justifyContent: 'center',
  },
});
