import * as React from "react";
import {TouchableOpacity,Text, TextInput,Image, Button, View, SafeAreaView } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import tw from "twrnc"
import { Link } from "expo-router";
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
const [username,setUsername]=React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={tw` bg-indigo-200 flex-1 justify-center items-center text-center gap-8`}>
      <View style={tw`gap-5 h-1/3 px-8 items-center justify-center `}>
      <Image style={tw`w-48 h-48 rounded-xl`} source={require("@/assets/images/signup.png")} />
    </View>
    

      {!pendingVerification && (
        
    <View style={tw`gap-6 rounded-tl-2xl bg-white rounded-tr-2xl w-full h-2/3 px-10 py-5`}>
    <Text>Username</Text> 
       <TextInput
            autoCapitalize="none"
            style={tw`text-xl border-2 border-white px-8 py-2 rounded-xl border-indigo-400`}
            value={username}
            placeholder="Username"
            onChangeText={(username) => setUsername(username)}
          />

    <Text>Email Address</Text> 
       <TextInput
            autoCapitalize="none"
            style={tw`text-xl border-2 border-white px-8 py-2 rounded-xl border-indigo-400`}
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
      <Text>Password</Text>
      <TextInput
            value={password}
            style={tw`text-xl border-2 border-white px-8 py-2 rounded-xl border-indigo-400`}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
      <TouchableOpacity onPress={onSignUpPress} style={tw`bg-blue-700  items-center rounded-2xl py-2 `}><Text style={tw`text-white text-3xl `}>SignUp</Text></TouchableOpacity>
      
      <Text style={tw`text-black w-full text-center`}>Already Have an Account?  <Link href="/signin" style={tw`text-blue-600 px-3`}>Login</Link> </Text>
    </View>  
          
      )}
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </SafeAreaView>
  );
}
