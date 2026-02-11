import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const colorTypes = {
   grass:"green",
   fire:"orange",
   water:"blue",
   bug:"greeen"
}
export default function App() {
  const[pokemons,setPokemon] = useState([]);
  console.log(JSON.stringify(pokemons[0],null,2))


  useEffect(()=>{
     //fetch pokemon
     fetchPokemons() 
  },[]);

  async function fetchPokemons(){
    try{
        console.log("Hii hows")
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=5"
        );
        const data = await response.json();

        const detailPokemons = await Promise.all(
          data.results.map(async(pokemon)=>{
            const res = await fetch(pokemon.url);
            const details = await res.json();

            return{
              name : pokemon.name,
              image:details.sprites.front_default,
              imageBack : details.sprites.back_default,
              types:details.types
            }
          })
        )
        console.log(detailPokemons)
        setPokemon(detailPokemons)
    }catch(e){

    }
  }
  return (
    <ScrollView 
      contentContainerStyle = {{
        gap:16,
        padding:16
      }}
    >
      {pokemons.map((pokemon)=>(
        <View key={pokemon.name} style={{
          backgroundColor : colorTypes[pokemon.types[0].type.name],
          padding : 20
        }}>
          <Text style={style.name}>{pokemon.name}</Text>
          <Text style={style.type}>{pokemon.types[0].type.name}</Text>

          <View
            style = {{
              flexDirection:"row"
            }} 
          >
            <Image
              source={{uri:pokemon.image}}
              style = {{width:100,height:100}}
            >
            </Image>
            <Image
              source={{uri:pokemon.imageBack}}
              style = {{width:150,height:150}}
            >
          </Image>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}




const style = StyleSheet.create({
  name:{
    fontSize : 28,
    fontWeight:"bold"
  },
  type:{
    fontSize:20,
    fontWeight:"bold",
    color:"gray"

  }
})