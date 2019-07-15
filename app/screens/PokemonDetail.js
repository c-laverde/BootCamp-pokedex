import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableHighlight } from 'react-native';

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
            movesToRender: 10
        }

        this.renderPokemonTypes = this.renderPokemonTypes.bind(this);
        this.renderPokemonMoves = this.renderPokemonMoves.bind(this);
    }

    async componentDidMount() {
        
        const { pokemonId } = this.props;
        console.log('id pass from homeScreen ', pokemonId);
        // const pokemonInfo = API.replace('{item}', );
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
                <View style={styles.move}>
                    <Text style={styles.typeContainer}>
                        {item.move.name}
                    </Text>
                </View>
            );   
    }

    viewTypes() {
        const { types } = this.state;

        return types.map((item) => {
            const { name } = item;
            <Text key={(item) => item.type.name}>Type: {name}</Text>
        });
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
                        <View>
                            {this.viewTypes()}
                        </View>
                        <Text>{this.props.pokemonId}</Text>
                        <Text style={styles.name}>{pokemonDetail.name}</Text>
                        <Text style={styles.detail}>Height: {pokemonDetail.height}</Text>
                        <Text style={styles.detail}>Weight: {pokemonDetail.weight}</Text>
                        {/* <FlatList 
                            data={types}
                            // horizontal={true}
                            keyExtractor={(item) => item.type.name}
                            renderItem={({item}) => this.renderPokemonTypes(item)} /> */}
                        <FlatList 
                            data={moves.slice(0,5)}
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
    containerType: {

    },
    containerMove: {

    },
    type: {

    },
    move: {

    }
  });

export default PokemonDetail;