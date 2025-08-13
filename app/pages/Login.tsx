import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'; 
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if(!email || !password){
            alert("Email dan password tidak boleh kosong!")
            return;
        };

        alert("Email : " + email);
}

    return(
        <View style={styles.container}>
            <Image source={require('../../assets/images/LOGO_AGRARIAN.png')} style={styles.logo} />
            <Text style={styles.title}>Selamat Datang!</Text>
            <Text style={styles.subtitle}>Belum punya akun ya? <Link style={{color: '#6AC595'}} href="./Register">Daftar Sini</Link></Text>
            
            <View style={styles.inputWrapper}>
                <Feather name='mail' size={20} color='#999999' style={{marginRight: 8}} />
                <TextInput 
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
             <View style={styles.inputWrapper}>
                <Feather name='lock' size={20} color='#999999' style={{marginRight: 8}} />
                <TextInput 
                    style={styles.input}
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    
                />
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Masuk</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.line}/>
                <Text style={styles.textDivider}>Atau masuk dengan</Text>
                <View style={styles.line}/>
            </View>

            <View style={styles.socialWrapper}>
                <TouchableOpacity style={styles.socialIcon}>
                    <Image source={require('../../assets/images/apple-logo.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                    <Image source={require('../../assets/images/google-logo.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                    <Image source={require('../../assets/images/facebook-logo.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    logo: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 192,
        height: 192,
        marginTop: -60,
    },
   title: {
        alignSelf: 'flex-start',
        color: '#6AC595',
        fontFamily: 'OpenSans_700Bold',
        fontSize: 24,
        marginTop: -30
    },
    subtitle: {
        alignSelf: 'flex-start',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
        fontWeight: 'regular',
        marginBottom: 30
    },
    input: {
        flex: 1,
        fontSize: 16
    },
    btn: {
        marginTop: 55,
        width: '100%',
        backgroundColor: '#6AC595',
        paddingHorizontal: 34,
        paddingVertical: 17,
        borderRadius: 10

    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'OpenSans_700Bold',
        color: '#ffffff',
        fontSize: 20,
    },
    inputWrapper: {
        alignSelf: 'flex-start',
        width: '100%',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 3, 
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 30
    },
    dividerContainer: {
        marginTop: 29,
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        flex: 1,
        height: 1,
        width: 80,
        backgroundColor: '#cccccc',
    },
    textDivider: {
        marginHorizontal: 6,
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
        color: '#777777'
    },
    socialIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        padding: 8,
        marginRight: 19,
    },
    socialWrapper: {
        marginTop: 29,
        flexDirection: 'row',
        alignItems: 'center',
    }
});