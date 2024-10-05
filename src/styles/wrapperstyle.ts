import { Dimensions, Platform, StyleSheet } from "react-native";

export const wrapperStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS == "android" ? 20 : 50,
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Platform.OS == 'ios' ? 5 : 0,
    },
    inputStyle: {
        flex: 5,
        fontSize: 18,
        color: 'black',
        paddingHorizontal: 10
    },
    searchIcon: {
        flex: 1,
        height: 30,
        objectFit: 'contain',
    },
    flatListMainview: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    flatListWrapper: {
        borderWidth: 0.5,
        marginVertical: 10,
        borderRadius: 5,
        marginBottom: Dimensions.get('window').height / 10
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        paddingBottom: 5,
        flexWrap: 'wrap'
    },
    id: {
        color: 'grey'
    },
    status: {
        color: 'grey'
    },
    dropDown: {
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        zIndex: 10,
        width: '100%',
        borderWidth: 1,
        maxHeight: 100,
    }
})