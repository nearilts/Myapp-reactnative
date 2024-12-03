import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Home Screen</Text>
          <Button 
            title="Go to Home Detail"
            onPress={() => navigation.navigate('HomeDetail')} // Navigasi ke HomeDetail
          />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
    });

export default HomeScreen;
