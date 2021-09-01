import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { 
    ActivityIndicator, 
    Button, ScrollView, 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableHighlight,
    Dimensions,
    Animated,
} from 'react-native';

import MultiSlider from "@ptomasroos/react-native-multi-slider"
import styles from './style';

import GetAUTH from './GetAUTH';

const AUTH = GetAUTH();

const RESULUTION_MULTIPLIER = 0 // 0 IS BEST 1 MEDIUM 2 SHIT

const Album = ({ route, navigation }) => {

    const { CURRENT_ALBUM_ID } = route.params;

    const[BG_COLOR, SET_BG_COLOR] = useState("rgb(25, 25, 35)")

    const[CURRENT_TRACK, SET_CURRENT_TRACK] = useState(0);

    const[DATA, SET_DATA] = useState()
    const[LOADING, SET_LOADING] = useState(true)

    const[ALBUM_COVER_IMAGE, SET_ALBUM_COVER_IMAGE] = useState("");
    const[ALBUM_NAME, SET_ALBUM_NAME] = useState("");

    const[SONGS_DATA, SET_SONGS_DATA] = useState({});
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
    const fetchAlbum = async (URL) => {
        try{

            let response = await fetch(URL, {
                headers: {
                    Authorization: AUTH,
                    'Cache-Control': 'no-cache'
                },
                method: "get",
            });
            let responseAlbum = await fetch("https://api.spotify.com/v1/albums/" + CURRENT_ALBUM_ID, {
                headers: {
                    Authorization: AUTH,
                    'Cache-Control': 'no-cache'
                },
                method: "get",
            });
            const Album = await responseAlbum.json();
            const json = await response.json();
            
            SET_ALBUM_COVER_IMAGE(Album.images[RESULUTION_MULTIPLIER].url)
            SET_ALBUM_NAME(Album.name)
            SET_DATA(json.items)
            SET_LOADING(false)


        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {

        fetchAlbum("https://api.spotify.com/v1/albums/" + CURRENT_ALBUM_ID + "/tracks?offset=0&market=SE").then(
            console.log("fetch succeded")
        )

    }, [SET_LOADING, SET_DATA])

    return(
        <View style={[styles.container, {backgroundColor: "rgb(0, 0, 0)"}]}>

            <TouchableHighlight
                style={{
                    position: "absolute",
                    left: "10%",
                    top: "7%",
                }}

                onPress={() => navigation.navigate("Home")}
            ><Text style={{color: "white", fontSize: 30}}>◀︎</Text></TouchableHighlight>
            {
            (LOADING) ? <Text /> :

                <Image 
                    resizeMode='cover' 
                    style={styles.ImageBackground} 
                    blurRadius={40}
                    source={{
                        uri: ALBUM_COVER_IMAGE,
                        width:320,
                        height:320 
                    }}
                    resizeMethod={"scale"}
                />
            }

            {/* <StatusBar hidden /> */}
            <Text style={styles.AlbumTitleText} numberOfLines={1} adjustsFontSizeToFit>{(LOADING) ? <ActivityIndicator /> : ALBUM_NAME}</Text>


            <ScrollView 
                onScroll={(e) => {
                    SET_CURRENT_TRACK(parseInt(e.nativeEvent.contentOffset.x / 400 + 0.035))
                    console.log(parseInt(e.nativeEvent.contentOffset.x / 400 + 0.035))
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
                        <View 
                            key={dataIndex} 
                            style={styles.MusicUI}

                            /* Lägg till elementets x position i SONGS_DATA variabeln */
                            onLayout={(event) => {
                                SET_SONGS_DATA({...SONGS_DATA,
                                    [dataIndex]: {
                                        xp:  event.nativeEvent.layout.x
                                    }
                                })
                            }}
                        >


                            <Image resizeMode='cover' style={styles.ImageCube} source={{uri: ALBUM_COVER_IMAGE, width:320,height:320 }}/>


                            {/* INFO VIEW UNDER BILDEN */}
                            <View style={styles.MarginView}>
                                <Text style={styles.TitleText} numberOfLines={2} adjustsFontSizeToFit>{data.name} {(data.explicit) ? "🅴" : ""}</Text>
                                <Text style={styles.WeakText}>{
                                    data.artists.map((artist, artistIndex) => <Text key={artistIndex}>{artist.name} , </Text>)
                                }</Text>
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
                    (LOADING) ? "--" : Minutes(parseInt(DATA[CURRENT_TRACK].duration_ms/1000)) + "s"
                }</Text>


                <View style={styles.ConfigBar}>
                    <TouchableHighlight style={styles.FastForward}><Text style={{fontSize: 30, color: "white", transform: [{rotate: "180deg"}]}}>▶︎▶︎</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.PlayBtn}><Text style={{fontSize: 30, color: BG_COLOR}}>▶︎</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.FastForward}><Text style={{fontSize: 30, color: "white"}}>▶︎▶︎</Text></TouchableHighlight>
                </View>
            </View>

            <StatusBar style="light" />
        </View>
    );
}

export default Album;
