import { StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const background_color = "rgb(20, 20, 20)"

const styles = StyleSheet.create({
    PlayBtn: {
        width: 70,
        height: 70,
        backgroundColor: "lime",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 200,
    },
    SongLengthText: {
        color: "white",
        left: "40%",
        bottom: "35%",
    },
    SongCurrentLengthText:{
        color: "white",
        right: "40%",
        bottom: "24%",
    },
    ImageBackground: {
        position: "absolute",
        zIndex: -1,
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        resizeMode: 'stretch',
        opacity: 0.75,

    },
    Album: {
        marginHorizontal: 5,
        backgroundColor: background_color,
        width: 240,
        height: 120,

        paddingBottom: 5,
        paddingLeft: 10,
        paddingTop: 10,

        borderRadius: 10,

        alignItems: "flex-start",
        flexDirection: "row",

    },
    AlbumCreatorText: {
        color: "rgb(200, 200, 200)",
        fontWeight: "200",
        fontSize: 20,
    },
    AlbumNameText: {
        color: "white",
        width: "50%",
        textAlign: "left",
        marginLeft: "5%",
        fontWeight: "600",
    },

    FastForward: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    ConfigBar: {
        flexDirection: "row",
    },
    MusicUI: {
        width: 400,
        height: 800,
    },
    MarginView: {
        marginLeft: 30,
    },
    container: {
        paddingTop: "10%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    MusicContainer: {
        flex: 1,
        flexDirection: "row",
    },
    TitleText: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 35,
        fontWeight: "700",
        color: "white",
        width: "90%",

    },AlbumTitleText: {
        marginTop: 20,

        fontSize: 35,
        fontWeight: "700",
        color: "white",
        width: "60%",
        textAlign: "center",
    },

    WeakText: {
        fontSize: 20,
        fontWeight: "300",
        color: "white",
        zIndex: 2,
        width: "80%",
        marginLeft: "5%"
    },
    ImageCube: {
        alignSelf: "center",
        marginTop: "10%",
    },

});
export default styles;
export {
    background_color
};