import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'

import api from '../service/api';

function Main({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [games, setGames] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      };
    };

    loadInitialPosition();
  }, []);

  async function loadPlayers() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        games
      }
    });

    setPlayers(response.data.players);
  };

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if(!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
        {players.map(player => (
          <Marker key={player._id} coordinate={{ latitude:player.location.coordinates[1], longitude: player.location.coordinates[0] }}>
            <Image style={styles.avatar} source={{ uri: "https://avatars1.githubusercontent.com/u/48763640?s=460&v=4" }} />
            <Callout onPress={() => {
              navigation.navigate('Profile', { github_username: player.github_username })
            }}>
              <View style={styles.callout}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerBio}>{player.bio}</Text>
                <Text style={styles.games}>{player.games.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
          <TextInput 
          style={styles.searchInput}
          placeholder= "Search for devPlayers"
          placeholderTextColor= "#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={games}
          onChangeText={setGames}
          />

          <TouchableOpacity onPress={loadPlayers} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#FFF"/>
          </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#FFF"
  },

  callout: {
    width: 260,
  },

  playerName: {
    fontWeight: 'bold',
    fontSize: 16
  },

  playerBio: {
    color: "#666",
    marginTop: 5
  },

  games: {
    marginTop: 5
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#13d4c4',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
})

export default Main;