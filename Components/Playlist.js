import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, TouchableHighlight, ScrollView, Image } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles, { background_color } from './style';

import GetAUTH from './GetAUTH';

const AUTH = GetAUTH();

const RESULUTION_MULTIPLIER = 0 // 0 IS BEST 1 MEDIUM 2 SHIT

const Playlist = ({ route, navigation }) => {

    const { CURRENT_PLAYLIST_ID } = route.params;

    const[DATA, SET_DATA] = useState()
    const[LOADING, SET_LOADING] = useState(true)
    const[PLAYLIST_TITLE, SET_PLAYLIST_TITLE] = useState("");

    const[CURRENT_SCROLL_X, SET_CURRENT_SCROLL_X] = useState(0)
    function Minutes(value) {
        const sec = parseInt(value, 10); 
        let hours = Math.floor(sec / 3600); 
        let minutes = Math.floor((sec - hours * 3600) / 60); 
        let seconds = sec - hours * 3600 - minutes * 60;
        if (hours < 10) {      hours = '0' + hours;    }
        if (minutes < 10) {      minutes = '0' + minutes;    }
        if (seconds < 10) {      seconds = '0' + seconds;    }
        if (hours == 0) {
            return +minutes + ':' + seconds; // Return in MM:SS format
        } else {
            return hours + ':' + minutes + ':' + seconds; // Return in HH:MM:SS format
        }
    }
    const fetchPlaylist = async (URL) => {
        try{
            let response = await fetch(URL, {
                headers: {
                    Authorization: AUTH,
                    'Cache-Control': 'no-cache'
                },
                method: "get",
            });

            const PLaylistJSON = await response.json();
            
            console.log(PLaylistJSON)

            SET_DATA(PLaylistJSON.tracks.items);
            SET_PLAYLIST_TITLE(PLaylistJSON.name);
            // console.log(PLaylistJSON.tracks.items)//.tracks.items[0].track.name
            SET_LOADING(false)


        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {

        fetchPlaylist("https://api.spotify.com/v1/playlists/" + CURRENT_PLAYLIST_ID).then(
            console.log("fetch succeded")
        )

    }, [])

return(
        <View style={styles.container}>

            <TouchableHighlight
                style={{
                    position: "absolute",
                    left: "10%",
                    top: "7%",
                }}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={{color: "white", fontSize: 30}}>◀︎</Text>
            </TouchableHighlight>
            {
                (LOADING) ? <Text /> :
                <Image 
                    resizeMode='cover' 
                    style={styles.ImageBackground} 
                    blurRadius={10}
                    source={{
                        uri: DATA[CURRENT_SCROLL_X].track.album.images[2].url, // DET KOMMER BARA VARA FÖRSTA BILDEN SOM BLIR BAKGRUNDEN FIXA SEN SEN SEN SEN
                        width:320,
                        height:320 
                    }}
                    resizeMethod={"scale"}
                />
            }

            <Text style={[styles.TitleText, {width: "60%"}]} numberOfLines={1} adjustsFontSizeToFit>
                {(LOADING) ? <ActivityIndicator /> : PLAYLIST_TITLE}
            </Text>


            <ScrollView 
                onScroll={(e) => {
                    SET_CURRENT_SCROLL_X(parseInt(e.nativeEvent.contentOffset.x / 400 + 0.035))
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={400} //Widthen + marginen
                snapToAlignment={"center"}
                scrollEventThrottle={256}
                style={styles.MusicContainer}
            >
                {
                    (LOADING) ? <ActivityIndicator /> : 

                    DATA.map((data, dataIndex) => 
                        <View key={dataIndex} style={styles.MusicUI}>


                            <Image resizeMode='cover' style={styles.ImageCube} source={{uri: DATA[dataIndex].track.album.images[RESULUTION_MULTIPLIER].url, width:320,height:320 }}/>


                            {/* INFO VIEW UNDER BILDEN */}
                            <View style={styles.MarginView}>
                                <Text style={styles.TitleText} numberOfLines={2} adjustsFontSizeToFit>{data.track.name} {(data.track.explicit) ? "🅴" : ""}</Text>
                                <Text style={styles.WeakText}>
                                    {
                                        DATA[dataIndex].track.album.artists.map((artist, artistIndex) => <Text key={artistIndex}>{artist.name}</Text>)
                                    }
                                </Text>

                            </View>
                        </View>
                    )
                }
            </ScrollView>

            <View style={{alignItems: "center", bottom: 120,}}>
                <MultiSlider
                    min={5}
                    max={20}
                    selectedStyle={{paddingBottom: 10}}
                    customMarker={() => {return(<View />)}}
                />
                <Text style={styles.SongCurrentLengthText}>0:00</Text>
                <Text style={styles.SongLengthText}>{
                    (LOADING) ? "--" : Minutes(parseInt(DATA[CURRENT_SCROLL_X].duration_ms/1000)) + "s"
                }</Text>
                <View style={styles.ConfigBar}>
                    <TouchableHighlight style={styles.FastForward}><Text style={{fontSize: 30, color: "white", transform: [{rotate: "180deg"}]}}>▶︎▶︎</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.PlayBtn}><Text style={{fontSize: 30, color: "black"}}>▶︎</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.FastForward}><Text style={{fontSize: 30, color: "white"}}>▶︎▶︎</Text></TouchableHighlight>
                </View>
            </View>

            <StatusBar style="light" />
        </View>
    );
}

export default Playlist;