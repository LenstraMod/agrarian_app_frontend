import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Image,  StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ImageBackground} from 'react-native';

export default function Home(){

    const [ isMission, setIsMission ] = useState(true);

    type Card = {
        id: string;
        title: string;
        desc: string;
        image: any;
        cta: string;
        href: any;
    }

    const DATA: Card[] = [
        {
            id: "rec",
            title: "Rekomendasi Tanaman",
            desc: "Lorem ipsum dolor sit amet, consectet../../assets/ng elit, sed do eiusmod tempor incididunt...",
            image: require("../../assets/images/rec_imgBG.png"),
            cta: "Periksa Sekarang",
            href: "/recommendation",
        },
        {
            id: "pred",
            title: "Prediksi Hasil Panenmu!",
            desc: "Lorem ipsum dolor sit amet, consectet../../assets/ng elit, sed do eiusmod tempor incididunt...",
            image: require("../../assets/images/pred_imgBG.png"),
            cta: "Prediksi Sekarang",
            href: "/prediction",
        },
        {
            id: "ai",
            title: "Tayakan Sama Pakarnya!",
            desc: "Lorem ipsum dolor sit amet, consectet../../assets/ng elit, sed do eiusmod tempor incididunt...",
            image: require("../../assets/images/ai_imgBG.png"),
            cta: "Chat Agra AI",
            href: "/aichat",
        },
        {
            id: "game",
            title: "Ayo simulasi bertani!",
            desc: "Lorem ipsum dolor sit amet, consectet../../assets/ng elit, sed do eiusmod tempor incididunt...",
            image: require("../../assets/images/game_imgBG.png"),
            cta: "Main Sekarang",
            href: "/game",
        },
    ];

    function MenuCard({ item } : {item: Card}) {
        const router = useRouter();

        return(
            <View style={styles.cardWrapper}>
                <ImageBackground source={item.image} style={styles.card} imageStyle={styles.cardImage}>

                <View style={styles.textArea}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc} numberOfLines={3}>{item.desc}</Text>

                    <TouchableOpacity
                        onPress={() => router.push(item.href)}
                        style={styles.ctaBtn}
                    >
                    <Text style={styles.ctaText}>{item.cta}</Text>
                    </TouchableOpacity>
            </View>
      </ImageBackground>
    </View>
        );
    }

    return(
        <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
            <View>
            <Image source={require('../../assets/images/LOGO_AGRARIAN.png')} style={styles.logo} />

            <View style={styles.mission}>
                <Text style={styles.missionTitle}>Misi hari ini</Text>
                {isMission ? (
                <View style={styles.missionCard}>
                    <Image source={require('../../assets/images/Ecclipse_Warn.png')} />
                    <Text style={styles.missionText}>Craft a special pot</Text>
                </View>
                ) : (
                <Text>No Mission Today</Text>
                )}
            </View>

            {isMission && (
                <TouchableOpacity style={styles.missionButton}>
                <Text style={styles.missionButtonText}>Lihat Semua</Text>
                </TouchableOpacity>
            )}
            </View>
        }
    />

    );
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 192,
        height: 192,
        marginTop: -20,
    },
    mission: {
        marginHorizontal: 25,
    },
    missionTitle: {
        fontFamily: 'OpenSans_700Bold',
        fontSize:  20,
        marginBottom: 23,
    },
    missionCard: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 20,
        elevation: 3,
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        borderRadius: 10,
    },
    missionText: {
        fontFamily: 'OpenSans_400Regular',
        fontWeight: 'bold'
    },
    missionButton: {
        backgroundColor: '#6AC595',
        paddingHorizontal: 30,
        paddingVertical: 15,
        maxWidth: 'auto',
        width: 'auto',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 23,
        marginBottom: 30
    },
    missionButtonText: {
        fontFamily: 'OpenSans_700Bold',
        color: '#FFFFFF',
        fontSize: 12
    },
    safe: {
        flex: 1,
        backgroundColor: "#0f172a",
        
    },
    listContent: { 
        paddingVertical: 16, 
        gap: 12
    },
    cardWrapper: {
        width: '100%',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,

  },
  card: {
    width:'100%',
    height: 180,
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: 5,
  },
  textArea: {
    paddingHorizontal: 16,

  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'OpenSans_700Bold',
    marginBottom: 10,
  },
  desc: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'OpenSans_400Regular',
    marginBottom: 50,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ctaBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#34d399',  
    borderRadius: 5,
    marginBottom: 10
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'OpenSans_700Bold',
    fontSize: 12,
  },


})