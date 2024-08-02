import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
export default function UnAuthenticatedLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return <Stack>
    <Stack.Screen name="signin" options={{
        headerStyle: {
          backgroundColor: '#1e40af',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
    <Stack.Screen name="signup" options={{
        headerStyle: {
          backgroundColor: '#1e40af',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
  </Stack>;
}
