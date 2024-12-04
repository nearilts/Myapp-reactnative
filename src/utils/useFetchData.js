import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../const/url';

const useFetchData = (navigation, endpoint) => {
  const [datas, setDatas] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  const fetchDatas = async () => {
    setIsLoading(true); 
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];



      console.log('url', `${BASE_URL}api/${endpoint}`);
      const response = await axios.get(`${BASE_URL}api/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      console.log('response', response.data);
      setDatas(response.data);


    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDatas();
    });
    fetchDatas();

    return () => {
      unsubscribe();
    };
  }, [navigation, endpoint]);

  return { datas, isLoading, fetchDatas }; 
};

export default useFetchData;
