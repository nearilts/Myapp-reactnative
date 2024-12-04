// AuthContext.js

import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../const/url';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false)


  const logins = (email, password) => {
    setIsLoading(true);
    console.log('login', `${BASE_URL}api/login`);

    axios
      .post(`${BASE_URL}api/login`, { email, password})
      .then((res) => {
        let userData = res.data.data;
        console.log('response login', userData);
        if (userData.access_token) {
          setUserInfo(userData);
          AsyncStorage.setItem('userInfo', JSON.stringify(userData))
            .then(() => {
              setIsLoading(false);
            })
            .catch((err) => {
              alert('Error saving userInfo to AsyncStorage: '+ err)
              setIsLoading(false);
          });
        }
        
      })
      .catch((err) => {
          alert('error login: '+err)
        console.log('error login', err);
        setIsLoading(false);
      });
  };

  const registers = (name,email,phone,city, password,address) => {
    setIsLoading(true);
    console.log('login', `${BASE_URL}api/login`);

    axios
      .post(`${BASE_URL}api/register`, { name,email,phone,city, password,address})
      .then((res) => {
        let userData = res.data.data;
        console.log('response registers', userData);
        if (userData.access_token) {
          setUserInfo(userData);
          AsyncStorage.setItem('userInfo', JSON.stringify(userData))
            .then(() => {
              setIsLoading(false);
            })
            .catch((err) => {
              alert('Error saving userInfo to AsyncStorage: '+ err)
              setIsLoading(false);
          });
        }
        
      })
      .catch((err) => {
          alert('error login: '+err)
        console.log('error login', err);
        setIsLoading(false);
      });
  };


  const profils = async (token) => {
      axios
        .get(`${BASE_URL}api/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          let userData = res.data;
          console.log('PROFILE', userData)
        })
        .catch((err) => {
          console.log('error login', err);
          setUserInfo({})
          AsyncStorage.removeItem('userInfo')
          setIsLoading(false);
        });
    };
    
  const logouts = async (navigation) => {
    setUserInfo({})
    AsyncStorage.removeItem('userInfo')

    navigation.navigate('LoginScreen');
  };

  const isLoggedIn = async () => {
      try {
        setSplashLoading(true);
    
        let userInfo = await AsyncStorage.getItem('userInfo');
        console.log('isLoggedIn', userInfo);
    
        if (userInfo) {
          userInfo = JSON.parse(userInfo);
          if (userInfo.access_token) {
            let token = userInfo.access_token.split('|')[1];
            profils(token);
            setUserInfo(userInfo);
          } else {
            console.error('Access token tidak ditemukan di userInfo');
            setUserInfo({});
          }
        } else {
          console.log('userInfo kosong atau tidak ditemukan');
          setUserInfo({});
        }
    
        setSplashLoading(false);
      } catch (error) {
        console.error('Error di isLoggedIn:', error);
        setSplashLoading(false);
      }
    };
    

  useEffect(() => {
    isLoggedIn();
  }, [])
  return (
    <AuthContext.Provider value={{ 
      isLoading,
      userInfo,
      splashLoading,
      logins,
      logouts

     }}>
      {children}
    </AuthContext.Provider>
  );
};
