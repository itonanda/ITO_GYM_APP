import { View, Text , Image, ImageBackground, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';


export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.background} />
      <ImageBackground
        source={require('../assets/images/bg_login.png')}
        style={styles.noise}
      />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/bg_logo.png')}
            style={styles.logo}
          />
        </View>
      </View>

      <View style={styles.contenttext}>
        <View style={styles.subtitle}>
          <Link href={"/(auth)/signin"}>
            <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>Login</Text>
          </Link>
          
          <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>   /   </Text>
        
          <Link href={"/(auth)/signup"}>
            <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>Register</Text>
          </Link>
        </View>

        <View style={styles.subtitle}>
          <Link href={"/(tabs)/(guest)/dashboard"}>
            <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>As Guest</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  noise: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    backgroundColor: '#ff0000',
    resizeMode: 'repeat',
  },

  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  logo: {
    width: 300,
    height: 100,
  },

  contenttext: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  subtitle: {
    marginBottom: 10,
    flexDirection: 'row',      //Untuk Memanjang
    alignItems: 'center',      
    justifyContent: 'center',  
  },
  socialButton: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    gap: 10,
  },
  icon: {
    width: 22,
    height: 22,
  },
  socialText: {
    fontSize: 20,
    fontWeight: "500",
    color:'#fff',
  },
});