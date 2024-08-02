import React, { useState } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image,TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';

const CreateEvent = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center gap-6`}>
      <Text>Enter Event Name</Text>
        <TextInput style={tw`border-2 border-black px-5 py-2 rounded-2xl`} placeholder='Enter Event Name'/>
        
      <View style={tw`rounded-3xl px-2 py-2 bg-amber-400 gap-4`}>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={tw`text-white text-xl flex-row items-center`}>
            Date Picker
            <Image source={require('@/assets/images/date.png')} style={tw`w-8 h-8 ml-2`} />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tw`rounded-3xl px-2 py-2 bg-sky-400`}>
        <TouchableOpacity onPress={showTimepicker}>
          <Text style={tw`text-white text-xl`}> Time Picker</Text>
        </TouchableOpacity>
      </View>
      <Text>Selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default CreateEvent;
