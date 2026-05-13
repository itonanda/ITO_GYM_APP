// import { Link, Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';


export default function DashboardScreen() {
  const router = useRouter();
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  
  // Accesses both route params
  const { accessToken, email } = useLocalSearchParams();

    const handleSignOut = () => {
        fetch(`${apiURL}/auth/signout`, {
            method: 'POST',
            headers: {
            authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(response => {
            if(!response.error){
                router.navigate('../') // Use router.navigate for general navigation
            }
            })
            .catch(error => {
            console.error('Error:', error);
            });
    };

  return (
    <>
      {/* <Stack.Screen options={{ title: 'Oops!' }} /> */}
      <View style={styles.container}>
        <Text>This screen success login.</Text>
        <Text>access_token : {accessToken}</Text>
        <Text>email : {email}</Text>
        {/* <Link href="/" style={styles.link}>
          <Text style={styles.link}>Go to home screen!</Text>
        </Link> */}
        {/* <View style={[styles.verticallySpaced, styles.mt5]}> */}
          <Button title="Sign Out" onPress={handleSignOut} />
        {/* </View> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});