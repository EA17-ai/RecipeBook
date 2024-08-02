import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc"
import { Image } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import LoggedIn from "./loggedIn";

export default function Page() {

  return (
    <SafeAreaView style={tw`flex-1 bg-white justify-between items-center`}>
      <SignedIn>
        <LoggedIn/>
      </SignedIn>
      <SignedOut >
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`bg-blue-500 p-4 rounded-full`}>
        <Image style={tw`w-72 h-72 rounded-full border-2 border-black `} source={require("@/assets/images/mainlogo.png")}/>
          
        </View>
        <Text style={tw`text-2xl font-bold text-blue-800 mt-4`}>RecipeBook</Text>
        <Text style={tw`text-base text-blue-400`}>Cook at home like a Professional chef</Text>
      </View>
      <View style={tw`w-full p-8 bg-blue-900 rounded-t-3xl items-center justify-center text-center gap-6`}>
        <Link href="/signin" style={tw`w-full bg-blue-500 py-4 rounded-full text-center  justify-center items-center`}>
          <Text style={tw` text-white text-lg font-bold `}>Login</Text>
        </Link>
        <Link href="/signup" style={tw`w-full border-2 border-blue-500 py-4 rounded-full text-center justify-center items-center`}>
          <Text style={tw`text-center text-blue-500 text-lg font-bold`}>Sign Up</Text>
        </Link>
      </View>
    
      </SignedOut>
      </SafeAreaView>
  
    
  );
}




