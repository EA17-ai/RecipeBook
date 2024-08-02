import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { SafeAreaView, Image } from "react-native";
import tw from "twrnc";
import { Link } from "expo-router";
export default function LoggedIn() {
  const { user } = useUser();
  const { signOut } = useClerk();
  //console.log(user);
  return (
    <View>
      <View
        style={tw` flex flex-row bg-white w-full h-20 justify-between items-center px-4 `}
      >
        <Text style={tw`font-bold text-lg`}>
          Welcome <Text style={tw`text-orange-400`}>{user?.username}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            signOut({ redirectUrl: "/" });
          }}
        >
          <Image
            style={tw`w-8 h-8`}
            source={require("@/assets/images/signout.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={tw` gap-12 items-center m-10`}>
        <Image style={tw` rounded-2xl m-6 w-72 h-72 p-8 `} source={require("@/assets/images/recipelog.png")}/>
        <View style={tw`flex border-2 bg-blue-400 rounded-3xl h-10 border-white justify-center w-full items-center`}>
        <Link href="/recipecategories">
                  <Text style={tw`text-white text-2xl`}> Recipe Categories</Text>
        
        </Link>
        </View>  

      </View>
    </View>
  );
}
