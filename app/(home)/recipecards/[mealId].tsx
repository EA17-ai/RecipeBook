import axios from 'axios';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

const RecipeCard = () => {
    interface MealDataType {
        idMeal: string,
        strMealThumb: string,
        strMeal: string,
        strInstructions: string,
        strArea: string,
        strIngredient1: string,
        strIngredient2: string,
        strIngredient3: string,
        strIngredient4: string,
        strIngredient5: string,
        strIngredient6: string,
        strIngredient7: string,
        strIngredient8: string,
        strIngredient9: string,
        strIngredient10: string,
        strIngredient11: string,
        strIngredient12: string,
        strIngredient13: string,
        strIngredient14: string,
        strIngredient15: string,
        strIngredient16: string,
        strMeasure1: string,
        strMeasure2: string,
        strMeasure3: string,
        strMeasure4: string,
        strMeasure5: string,
        strMeasure6: string,
        strMeasure7: string,
        strMeasure8: string,
        strMeasure9: string,
        strMeasure10: string,
        strMeasure11: string,
        strMeasure12: string,
        strMeasure13: string,
        strMeasure14: string,
        strMeasure15: string,
        strMeasure16: string,
    }

    const { mealId } = useLocalSearchParams();
    const [MealData, setMealData] = useState<MealDataType[]>([]);
    const [quantity, setQuantity] = useState<number>(1);

    console.log("mealId", mealId);

    useEffect(() => {
        const MealDetails = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                setMealData(response.data.meals);
            } catch (error) {
                console.error('Error fetching meal details:', error);
            }
        };
        MealDetails();
    }, [mealId]);

    const adjustQuantity = (increment: boolean) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + (increment ? 1 : -1)));
    };

    return (
        <ScrollView style={tw`bg-[#F3EAE6] flex-1`}>

            {MealData.map((data) => {
                // Extract ingredients and measures
                const ingredients = [];
                for (let i = 1; i <= 16; i++) {
                    const ingredientKey = `strIngredient${i}` as keyof MealDataType;
                    const measureKey = `strMeasure${i}` as keyof MealDataType;
                    const ingredient = data[ingredientKey];
                    const measure = data[measureKey];
                    if (ingredient) {
                        ingredients.push({ ingredient, measure });
                    }
                }

                return (
                    <View key={data.idMeal} style={tw`w-full`}>
                                    <Stack.Screen  options={{headerTitle:`Recipe : ${data.strMeal} `, headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}/> 
                        <View style={tw`relative`}>
                            <Image
                                source={{ uri: data.strMealThumb }}
                                style={tw`w-full h-80 p-4 rounded-2xl items-center`}
                            />
                            <TouchableOpacity style={tw`absolute top-4 right-4 bg-white rounded-full p-5`}>
                                <Text>💚</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={tw`p-10 text-center justify-center w-full items-center gap-5`}>
                            <Text style={tw`text-3xl font-bold`}>{data.strMeal}</Text>
                            <Text style={tw`text-xl text-red-400 font-bold`}>{data.strArea}</Text>
                        </View>
                        
                        <View style={tw`flex-row items-center justify-between mt-4 bg-gray-400 p-10 text-white`}>
                            <Text style={tw`text-2xl font-semibold text-black `}>Ingredients</Text>
                            <View style={tw`flex-row items-center gap-2`}>
                                <TouchableOpacity onPress={() => adjustQuantity(false)} style={tw`bg-gray-200 rounded-full p-2`}>
                                    <Text style={tw`text-black`}>-</Text>
                                </TouchableOpacity>
                                <Text style={tw`text-gray-800 font-bold text-xl`}>{quantity}</Text>
                                <TouchableOpacity onPress={() => adjustQuantity(true)} style={tw`bg-gray-200 rounded-full p-2`}>
                                    <Text style={tw`text-black`}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={tw`w-full p-4 bg-gray-400`}>
                            {ingredients.map((item, index) => (
                                <View key={index} style={tw`flex-row justify-between mt-2 text-white font-bold`}>
                                    <Text style={tw`text-lg font-bold`}>{item.ingredient}</Text>
                                    <Text style={tw`px-2 py-1 bg-white text-black text-lg rounded-xl`}>{item.measure}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={tw`w-full bg-green-300 text-white p-6 gap-6`}>
                            <Text style={tw`text-3xl text-red-500 font-bold`}>Instructions : </Text>
                            <Text style={tw`font-bold text-lg`}>{data.strInstructions}</Text>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};

export default RecipeCard;
