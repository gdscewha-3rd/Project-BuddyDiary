import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [txt, setTxt] = useState("Hello World");

  useEffect(() => {
    loadData(); // 제일 처음 실행될 함수나 로그
  }, []);

  // 저장 함수
  const saveData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
      console.log('saved');
    } catch (e) {
      // saving error
    }
  }

  // 불러오기 함수
  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        setTxt(value);
      }
    } catch(e) {
      // error reading value
    }
  }


  return (
    <View style={{flex:1, backgroundColor:'#fc0',}}>
      <SafeAreaView style={{flex:1, }}>
        <StatusBar style="auto"/>

        <View style={{padding:10,  flexDirection:'row', 
                      alignItems:'center', justifyContent:'space-between', }}>
          <Button title="저장" onPress={()=>saveData(txt)}></Button>
        <Text style={{fontSize:18,}}>메모장</Text>  
          <Button title="불러오기" onPress={()=>loadData()}> </Button>
        </View>

        <View style={{backgroundColor:'#eeeeee', flex:1, padding:10, }}>
        <TextInput value={txt} 
        onChangeText={txt => setTxt(txt)}
        multiline/>
        </View>
      </SafeAreaView>
    </View>
  );
}
