import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import tw from "twrnc";
  import { Link } from "expo-router";
  
  interface MealCategory {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }
  
  interface Recipe {
    strMealThumb: string;
    idMeal: string;
    strMeal: string;
  }
  
  const Meal = () => {
    const [searchedRecipe, setSearchedRecipe] = useState("");
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [mealCategories, setMealCategories] = useState<MealCategory[]>([]);
    useEffect(()=>{
      const getRecipes=async()=>{
        try {
          const response = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
          );
          setRecipes(response.data.meals);
        } catch (error) {
          console.error("Error fetching meal categories:", error);
        }
  
      }
  
  
  
      getRecipes();
    },[])
  
    useEffect(() => {
      const getCategories = async () => {
        try {
          const response = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
          );
          setMealCategories(response.data.categories);
        } catch (error) {
          console.error("Error fetching meal categories:", error);
        }
      };
  
      getCategories();
    }, []);
  
    const searchRecipesByName = async () => {
      try {
        const response = await axios.get(
          `http://www.themealdb.com/api/json/v1/1/search.php?s=${searchedRecipe}`
        );
        console.log(response.data);
        setRecipes(response.data.meals);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
  
    return (
      <SafeAreaView style={tw`flex-1 bg-amber-500`}>
        <View style={tw`flex-row w-full justify-between p-8 bg-violet-400`}>
          <TouchableOpacity>
            <Image
              style={tw`w-12 h-12`}
              source={require("@/assets/images/person.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={tw`w-12 h-12`}
              source={require("@/assets/images/person.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`p-10 font-bold`}>
          <Text style={tw`font-bold text-white text-3xl`}>Hi Abhinav</Text>
          <Text style={tw`font-bold text-white text-2xl`}>
            Make your own food...Stay Home
          </Text>
        </View>
        <View style={tw`p-8 rounded-3xl flex-row items-center justify-center`}>
          <Text style={tw`mr-4 text-white text-xl`}>Search Recipes</Text>
          <TextInput
            value={searchedRecipe}
            onChangeText={(value) => setSearchedRecipe(value)}
            style={tw`px-32 py-3 rounded-3xl border-2 border-white`}
          />
          <TouchableOpacity onPress={searchRecipesByName}>
            <Image
              source={require("@/assets/images/search.png")}
              style={tw`ml-4 w-8 h-8`}
            />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={tw`h-96 flex-row w-full mb-20 overflow-hidden`}>
          {mealCategories.length > 0 &&
            mealCategories.map((category) => {
              return (
                <TouchableOpacity 
                onPress={async()=>{
                  const response=await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
                  setRecipes(response.data.meals)
                }}
                  key={category.idCategory}
                  style={tw`w-full  justify-evenly w-44 h-44 justify-center items-center text-center`}
                >
                
                  <View style={tw`w-28 h-28 rounded-full justify-center items-center`}>
                    <Image
                      source={{ uri: category.strCategoryThumb }}
                      style={tw`w-24 h-24 rounded-full`}
                    />
                  </View>
                  <Text style={tw`text-center font-bold text-lg text-white`}>{category.strCategory}</Text>
  
                </TouchableOpacity>
  
                            );
            })}
        </ScrollView>
        <ScrollView style={tw`  `}>
          <View>
            {recipes.length > 0 &&
              recipes.map((recipe) => {
                return (<View
                  key={recipe.idMeal}
                    style={tw`p-4`}
                  >
                
  
                    <Image
                      source={{ uri: recipe.strMealThumb }}  
                      style={tw`w-full h-60 rounded-3xl`}
                    />
                   
                    <Link style={tw`w-full h-60 rounded-3xl`} href={`/meal/${recipe.idMeal}`}> <Text style={tw`text-xl text-center font-bold mt-2`}>
                      {recipe.strMeal}
                    </Text ></Link>
                    <Text>{recipe.idMeal}</Text>
                
                  </View>
                 
                );
              })}
          </View>
  
        </ScrollView>
      </SafeAreaView>
    );
  
  };
  
  export default Meal;
  