import {
    Platform,
    StyleSheet,    
    Dimensions,
       
} from 'react-native';


const { width, height } = Dimensions.get("screen");
const height_logo = height * 0.12;
const width_logo = width * 0.8;

export const StyleLoginScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#0E6251'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
        
    },
    footer: {
        flex: 4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    logo: {
        width: width_logo,
        height: height_logo,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    text_header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 26
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
