import React, { Suspense, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import tw from 'twrnc';
import { Link } from 'expo-router';

// Define the interface outside of the component for clarity and reusability
interface CategoryType {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
}

const CategoryDetail = () => {
  // Get the category parameter from the URL using useLocalSearchParams
  const { strCategory } = useLocalSearchParams<{ strCategory: string }>();

  // Define the state for storing the category details
  const [categoryDetails, setCategoryDetails] = useState<CategoryType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the category details when strCategory changes
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        // Check if strCategory is valid
        if (strCategory) {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`);
          setCategoryDetails(response.data.meals);
        } else {
          setError('Invalid category');
        }
      } catch (error) {
        setError('Error fetching category details');
        console.error('Error fetching category details:', error);
      }
    };

    fetchCategoryDetails();
  }, [strCategory]);

  return (
    <ScrollView style={tw`bg-white p-4`}>
      
      <Stack.Screen  options={{headerTitle:`Recipes for ${strCategory} `, headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}/> 
      <Text style={tw`text-2xl font-bold mb-4`}>Category: {strCategory}</Text>
      {error ? (
        <Text style={tw`text-red-500`}>{error}</Text>
      ) : categoryDetails ? (
        categoryDetails.map((meal) => (
          
<View key={meal.idMeal} style={tw`mb-4`}>
            <Image
              style={tw`w-full h-48 rounded-lg`}
              source={{ uri: meal.strMealThumb }}
            />
            <Link href={`/recipecards/${meal.idMeal}`}>
              <Text style={tw`text-xl font-semibold mt-2`}>{meal.strMeal}</Text>
            </Link>
          </View>

                  ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

export default CategoryDetail;
