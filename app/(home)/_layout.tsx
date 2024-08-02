import { Slot, Stack } from "expo-router";

export default function HomeLayout() {
  return <Stack >
    <Stack.Screen name="index"   options={{
        headerStyle: {
          backgroundColor: '#1e40af',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
    <Stack.Screen name="recipecategories" options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
    
  </Stack>;
}
