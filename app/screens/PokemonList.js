import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

const API = 'https://pokeapi.co/api/v2/pokemon?limit=10';
const API_IMAGES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{item}.png'

class PokemonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            pokemonInfo: null,
            sprites: null,
        }

        this.renderPokemonList = this.renderPokemonList.bind(this);
    }

    async componentDidMount() {
        const list = await fetch(API)
          .then(response => response.json())
          .catch(error => {
            console.error(error);
          });

        this.setState({ list: list.results });
    }

    renderPokemonList(item) {

        const id = item.url.split('/')[6];
        const uri = API_IMAGES.replace('{item}',id)
        
        return (
            <TouchableOpacity>
                <View style={styles.item}>
                    <Image
                        style={{width: 100, height: 100}}
                        source={{uri: uri}}
                    />
                    <Text>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
            
        );
    }

    render() {

        const { list } = this.state;

        return (
            <View>
                { list
                ? (
                    <View style={styles.flatContainer}>
                        <FlatList
                        style={styles.flatList}
                        data={list}
                        keyExtractor={ ({name}) => name }
                        renderItem={({item}) => this.renderPokemonList(item)} />
                    </View>
                    )
                : (<ActivityIndicator />)
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    flatContainer: {
        borderRadius: 5,
        borderColor: 'blue',
        width: 400,
        height: 650
    },
    flatList: {
        flex: 1,
        backgroundColor: 'gray',
        borderColor: 'white',
        borderRadius: 5,
        padding: 10,
    },
    item:{
        padding: 10,
        borderRadius: 5,
        margin: 3,
        fontSize: 16,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: 'center',
    }
  });

export default PokemonList;