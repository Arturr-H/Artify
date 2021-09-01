import React, { useCallback, useEffect, useState } from "react"
import { View, Button, Image, TouchableHighlight, Touchable, Text, ScrollView, ActivityIndicator, StatusBar } from "react-native";
import styles from "./style";

import GetAUTH from "./GetAUTH";
//https://api.spotify.com/v1/browse/new-releases

const AUTH = GetAUTH();
const ALBUM_COVER_RESOLUTION = 0 //0 = best 1 medium 2 worst


const Start = ({ navigation }) => {

    const[PLAYLIST_DATA, SET_PLAYLIST_DATA] = useState({});
    const[PLAYLIST_LOADING, SET_PLAYLIST_LOADING] = useState(true)
    const[DATA, SET_DATA] = useState({});
    const[LOADING, SET_LOADING] = useState(true)
    const fetchAlbums = async (URL) => {
        try{
            let response = await fetch(URL, {
                headers: {
                    Authorization: AUTH,
                    'Cache-Control': 'no-cache'
                },
                method: "get",
            });
            const json = await response.json();

            SET_DATA(json.albums.items);
            SET_LOADING(false);
        }catch(err){
            console.log(err)
        }
    }
    const fetchPlaylists = async (URL) => {
        try{
            let response = await fetch(URL, {
                headers: {
                    Authorization: AUTH,
                    'Cache-Control': 'no-cache'
                },
                method: "get",
            });
            const json = await response.json();

            SET_PLAYLIST_DATA(json.playlists.items);
            SET_PLAYLIST_LOADING(false);
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {

        fetchAlbums("https://api.spotify.com/v1/browse/new-releases").then(
            console.log("fetch done")
        )
        fetchPlaylists("https://api.spotify.com/v1/browse/featured-playlists")

    }, [])//arrayen på slutet kallas dependency array som måste vara med annars så loopar den functionen i all evighet


    return(
        <View style={{paddingTop: "10%", backgroundColor: "rgb(25, 25, 25)", paddingBottom: "150%"}}>

            <Text style={[styles.TitleText, {marginLeft: "5%", marginTop: "7.5%"}]}>Featured albums</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    (LOADING) ? <ActivityIndicator /> :
                    DATA.map((data, dataIndex) =>
                        <TouchableHighlight 
                            key={dataIndex} 
                            onPress={() => navigation.navigate("Album", {
                                CURRENT_ALBUM_ID: /(\w+)$/.exec(data.href)[0] // länken ser ut ungefär
                                // såhär: https://api.spotify.com/v1/albums/4d4qaLHCcfXzMbGa33Kpqg, så
                                // man vill ha den sista stringen i länken (4d4qaLHCcfXzMbGa33Kpqg), 
                                // Då använder jag regex för att ta den sista...
                            })} 
                            underlayColor={"none"}
                        >
                            <View style={styles.Album}>
                                <Image
                                    style={{width: 100, height: 100, borderRadius: 2.5}}
                                    source={{uri: data.images[ALBUM_COVER_RESOLUTION].url}}
                                />
                                <Text numberOfLines={2} adjustsFontSizeToFit style={styles.AlbumNameText}>{data.name + "\n"}
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={styles.AlbumCreatorText}>{data.artists[0].name}</Text>
                                </Text>
                                {/* <Text numberOfLines={1} adjustsFontSizeToFit style={styles.AlbumCreatorText}>{data.artists[0].name}</Text> */}
                            </View>
                        </TouchableHighlight>
                    )
                }

            </ScrollView>
            
            <Text style={[styles.TitleText, {marginLeft: "5%", marginTop: "7.5%"}]}>Featured playlists</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    (PLAYLIST_LOADING) ? <ActivityIndicator /> :
                    PLAYLIST_DATA.map((data, dataIndex) =>
                        <TouchableHighlight 
                            key={dataIndex} 
                            onPress={() => navigation.navigate("Playlist", {
                                CURRENT_PLAYLIST_ID: /(\w+)$/.exec(data.href)[0] // länken ser ut ungefär
                                // såhär: https://api.spotify.com/v1/albums/4d4qaLHCcfXzMbGa33Kpqg, så
                                // man vill ha den sista stringen i länken (4d4qaLHCcfXzMbGa33Kpqg), 
                                // Då använder jag regex för att ta den sista...
                            })} 
                            underlayColor={"none"}
                        >
                            <View style={styles.Album}>
                                <Image
                                    style={{width: 100, height: 100, borderRadius: 2.5}}
                                    source={{uri: data.images[ALBUM_COVER_RESOLUTION].url}}
                                />
                                <Text numberOfLines={2} adjustsFontSizeToFit style={styles.AlbumNameText}>{data.name}</Text>{/*data.name*/}

                                {/* <Text numberOfLines={1} adjustsFontSizeToFit style={styles.AlbumCreatorText}>{data.artists[0].name}</Text> */}
                            </View>
                        </TouchableHighlight>
                    )
                }

            </ScrollView>
            <StatusBar barStyle="light-content" />

        </View>
    );
}

export default Start;