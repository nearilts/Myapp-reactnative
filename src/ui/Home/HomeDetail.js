import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import usePostData from '../../utils/usePostData';

const HomeDetail = ({ navigation }) => {
  const { postData, isLoading } = usePostData();
  const [formData, setFormData] = useState({
    name: '',
    imei: '',
    code: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleNext = async () => {
    if (!formData.name || !formData.imei || !formData.code) {
      alert('Lengkapi Form Yang Tersedia.');
      return;
    }

    try {
      const response = await postData('create-tab', formData);
      if (response.status === 'Success') {
        alert('Data Success Save');
        navigation.navigate('ListTabScreen');
      } else {
        alert('Gagal Simpan');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Tab</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="IMEI"
        value={formData.imei}
        onChangeText={(value) => handleInputChange('imei', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={formData.code}
        onChangeText={(value) => handleInputChange('code', value)}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Submit" onPress={handleNext} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default HomeDetail;
