import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Organize suas tarefas
        </Text>

        <Text style={styles.subtitle}>
          Crie, organize e acompanhe suas
          atividades de forma simples e
          moderna.
        </Text>
      </View>


      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Home')
        }
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  logoContainer: {
    width: 220,
    height: 220,
    backgroundColor: '#fff',
    borderRadius: 40,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,

    marginBottom: 50,
  },

  logo: {
    width: 140,
    height: 140,
  },

  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1565c0',
    textAlign: 'center',
    marginBottom: 14,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },

  button: {
    backgroundColor: '#1565c0',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',

    shadowColor: '#1565c0',
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18, 
    fontWeight: 'bold',
  },
});