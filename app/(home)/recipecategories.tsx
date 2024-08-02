// app/category/recipecategories.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { Link } from 'expo-router';

const RecipeCategories = () => {
    interface MealCategory {
        idCategory: string;
        strCategory: string;
        strCategoryThumb: string;
        strCategoryDescription: string;
      }
  const [mealCategories, setMealCategories] = useState<MealCategory[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setMealCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching meal categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <ScrollView style={tw`bg-sky-200 flex-1`}>
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text style={tw`text-xl font-bold`}>Recipe Book</Text>
        <Text style={tw`text-xl`}>💚</Text>
      </View>
      
      <Image
        style={tw`w-full h-48`}
        source={require('@/assets/images/mainpic.jpg')}
      />
      
      <Text style={tw`text-center text-2xl font-bold mt-4 mb-4`}>
        BEST HEALTHY AND GLUTEN-FREE RECIPES
      </Text>
      <View style={tw`px-4`}>
        {mealCategories.map((category) => (
          <Link
            key={category.idCategory}
            href={`/category/${category.strCategory}`}
            style={tw`flex-row items-center mb-4 bg-[#e4f1e5] rounded-xl overflow-hidden px-4 gap-7`}
          >
            <View style={tw`flex-row items-center`}>
              <Image
                style={tw`w-24 h-24 rounded-lg`}
                source={{ uri: category.strCategoryThumb }}
              />
              <Text style={tw`ml-4 text-lg font-bold`}>{category.strCategory}</Text>
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeCategories;
