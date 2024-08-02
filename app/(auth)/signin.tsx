import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import { Text, TextInput, Button, View,SafeAreaView,Image,TouchableOpacity } from "react-native";
import tw from "twrnc"
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView style={tw` bg-teal-500 flex-1 justify-center items-center text-center gap-8`}>
           <View style={tw`gap-5 h-1/3 items-center py-24`}>
        <Image style={tw`w-48 h-48 rounded-xl`} source={require("@/assets/images/login.png")} />
      </View>
      <View style={tw`gap-6 h-2/3 bg-white w-full px-9 py-16`}>
        <Text>Email Address</Text>
        <TextInput style={tw`text-xl border-2 border-white px-8 py-2 rounded-xl bg-white border-black border-2`} autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}/>
        <Text>Password</Text>
        <TextInput secureTextEntry style={tw`text-xl border-2 border-white px-8 py-2 rounded-xl bg-white border-black border-2`}   value={password}
        placeholder="Password..."
        onChangeText={(password) => setPassword(password)}/>
        <Link href="#"><Text style={tw`flex-row justify-end  text-white font-bold w-full text-end`}>Forgot Password?</Text>
        </Link>
        <TouchableOpacity onPress={onSignInPress} style={tw`bg-blue-700  items-center rounded-2xl py-2  `}><Text style={tw`text-white text-3xl `}>Login</Text></TouchableOpacity>
        <View><Text style={tw`text-black w-full text-center`}>Dont have an Account yet?  <Link href="/signup" style={tw`text-red-600 px-3`}>SignUp</Link> </Text>
        </View>
      </View>

    </SafeAreaView>
  );
}
