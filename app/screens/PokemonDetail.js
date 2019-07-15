import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';

const API = 'https://pokeapi.co/api/v2/pokemon/{item}/';
const API2 = 'https://pokeapi.co/api/v2/pokemon/1/';

class PokemonDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonDetail: null,
            pokemonID: null,
            sprites: null,
            types: null,
            moves: null,
        }

        this.renderPokemonTypes = this.renderPokemonTypes.bind(this);
        this.renderPokemonMoves = this.renderPokemonMoves.bind(this);
    }

    async componentDidMount() {
        
        const detail = await fetch(API2)
          .then(response => response.json())
          .catch(error => {
            console.error(error);
          });

        this.setState(
            { 
                pokemonDetail: detail, 
                sprites: detail.sprites,
                types: detail.types,
                moves: detail.moves,
            }
        );
    }

    renderPokemonTypes(item) {
        return (
            <View style={styles.typeContainer}>
                <Text style={styles.type}>
                    {item.type.name}
                </Text>
            </View>
        );
    }

    renderPokemonMoves(item) {
            return (
                <View style={styles.typeContainer}>
                    <Text style={styles.move}>
                        {item.move.name}
                    </Text>
                </View>
            );   
    }

    render() {
        const { pokemonDetail, sprites, types, moves } = this.state;

        return (
            <View>
                { pokemonDetail 
                ? (
                    <View style={styles.container}>
                        <Image
                            style={{width: 400, height: 400}}
                            source={{uri: sprites.front_default}}
                        />
                        <Text style={styles.name}>{pokemonDetail.name}</Text>
                        <Text style={styles.detail}>Height: {pokemonDetail.height}</Text>
                        <Text style={styles.detail}>Weight: {pokemonDetail.weight}</Text>
                        <Text>Type:</Text>
                        <FlatList 
                            data={types}
                            horizontal={true}
                            keyExtractor={(item) => item.type.name}
                            renderItem={({item}) => this.renderPokemonTypes(item)} />
                        <Text>Moves:</Text>
                        <FlatList 
                            data={moves.slice(0,5)}
                            horizontal={true}
                            keyExtractor={(item) => item.move.name}
                            renderItem={({item}) => this.renderPokemonMoves(item)} />
                    </View>
                    )
                : (<ActivityIndicator />)
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderColor: 'blue',
        width: 400,
        height: 700,
        backgroundColor: 'white',
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    name: {
        fontSize: 48,
        fontStyle: "italic",
        fontWeight: "bold",
    },
    detail: {
        fontSize: 32,
    },
    typeContainer: {
        marginRight: 5,
        borderColor: 'black',
        borderRadius: 3,
    },
    containerMove: {

    },
    type: {
        marginRight: 5,
    },
    move: {
        marginRight: 5,
    }
  });

export default PokemonDetail;