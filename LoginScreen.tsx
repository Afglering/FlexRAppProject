import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/luxury.jpg")} style={styles.logo} />

      <View style={styles.loginCard}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput placeholder="Username" style={styles.input} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* Button action here */
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.bottomTextContainer}>
          <TouchableOpacity
            onPress={() => {
              /* Button action here */
            }}
          >
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* Button action here */
            }}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bottomText}>OR</Text>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            /* Button action here */
          }}
        >
          <Text style={styles.buttonText2}>Sign in with instagram</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    height: "50%",
    width: "100%",
    resizeMode: "cover",
  },
  loginCard: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
    marginTop: -30,
  },
  button: {
    backgroundColor: "#0E5E28",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginVertical: 5,
  },
  button2: {
    backgroundColor: "#DBDBDB",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginVertical: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  buttonText2: {
    color: "#000",
    textAlign: "center",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomText: {
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
  },
});
