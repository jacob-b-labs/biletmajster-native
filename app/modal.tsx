import { StatusBar } from 'expo-status-bar';
import {Alert, Platform, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {useRecoilState} from "recoil";
import selectedEventIdState from "../recoil/selectedEventIdState";
import {EventsCategoriesDropdown} from "../components/EventsCategoriesDropdown";
import React, {useEffect, useState} from "react";
import {CategoriesApi, Category, Configuration, EventApi} from "../open-api/generated";
import axios from "axios/index";
import Backend from "../constants/Backend";
import {Button, Divider, Searchbar} from "react-native-paper";
import {EventsSortByDropdown} from "../components/EventsSortByDropdown";
import allEventsSortByState from "../recoil/allEventsSortByState";
import allEventsSearchNameState from "../recoil/allEventsSortByNameState";

export default function ModalScreen() {

  // api
  const config = new Configuration();
  const axiosInstance = axios.create({
    headers: {Authorization: 'YOUR_TOKEN'},
  });
  const eventApi = new EventApi(config, Backend(''), axiosInstance);
  const categoriesApi = new CategoriesApi(config, Backend(''), axiosInstance);

  // categories
  const [categories, setCategories] = useState<Category[]>([]);

  // search bar
  const [searchQuery, setSearchQuery] = useRecoilState(allEventsSearchNameState);
  const onChangeSearch = (query: string)  => {
    setSearchQuery(query);
  }

  // fetch categories
  const getCategories = async () => {
    try {
      const fetchedCategories = await categoriesApi.getCategories();
      // console.log("Fetched getEvents");
      setCategories(data => fetchedCategories.data);
    } catch (error) {
      console.warn(error);
      Alert.alert('An error occurred');
    }
  };

  // use filters


  // on screen load
  useEffect(() => {
    getCategories();
  }, []);

  // DEBUG
  // useEffect(() => {
  //   console.log("SearchQuery: " + searchQuery);
  // }, [searchQuery])

  return (
    <View style={styles.container}>
      <Searchbar style={{...styles.margins, marginTop: 20}}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}
      <EventsCategoriesDropdown
        categories={categories}
        getEvents={eventApi.getEvents}
        getByCategory={eventApi.getByCategory}
        getCategories={categoriesApi.getCategories}
      />

      <EventsSortByDropdown/>

      <View style={{flexDirection: 'row'}}>

        <View style={{width: '50%'}}>
          <Button
            style={{...styles.margins, marginRight: 5}} icon="filter-remove" mode="outlined" onPress={() => {}}>
            Clear filters
          </Button>
        </View>

        <View style={{width: '50%'}}>
          <Button
            style={{...styles.margins, marginLeft: 5}} icon="car-info" mode="contained" onPress={() => {}}>
            Use filters
          </Button>
        </View>

      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '100%',
  },
  margins: {
    margin: 10,
    marginTop: 0,
  }
});
