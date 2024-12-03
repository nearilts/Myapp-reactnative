import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Detail Screen</Text>
      <Button 
        title="Go Back to Home"
        onPress={() => navigation.goBack()} // Kembali ke layar sebelumnya
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeDetailScreen;
