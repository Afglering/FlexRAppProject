import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { Color, FontSize, Padding, Border } from "../GlobalStyles";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

interface ErrorState {
  email: string;
  password: string;
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ErrorState>({ email: '', password: '' });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    const newErrors: ErrorState = { email: '', password: '' };

    // Validate email field
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }

    // Validate password field
    if (!password) {
      newErrors.password = 'Password is required.';
    }

    // Set the errors and update form validity
    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every((error) => !error));
  };

  const handleLogin = async () => {
    if (isFormValid) {
      const auth = getAuth();

      try {
        // Sign in to Firebase Auth
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Get the user object from the userCredential
        const user = userCredential.user;

        // Fetch user data from Firestore
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        // Check if the userDoc exists
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Check if the user's document ID in Firestore matches the UID from Firebase Auth
          if (userDocRef.id === user.uid) {
            // Navigate to the Profile screen and pass the userData as a parameter
            navigation.navigate("Profile", { userData: userData });
          } else {
            Alert.alert(
              "Error",
              "User ID mismatch between Firestore and Firebase Auth."
            );
          }
        } else {
          Alert.alert("Error", "User data not found in Firestore.");
        }
      } catch (error: any) {
        Alert.alert("Login Failed", error.message);
      }
    }
  };

  return (
    <View style={styles.login}>
      <Image
        style={styles.image}
        source={require("../assets/promotion/luxury3.jpg")}
      />

      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Sign In</Text>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <TextInput
              placeholder="Email"
              style={styles.formInput}
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          </View>

          <View style={styles.formGroup}>
            <TextInput
              placeholder="Password"
              style={styles.formInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
          </View>

          <TouchableOpacity style={styles.formBtn} disabled={!isFormValid} onPress={handleLogin}>
            <Text style={styles.formBtnText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.formLinks}>
            <TouchableOpacity>
              <Text>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.formBtnInstagram}>
              <Text style={styles.formBtnTextAlt}>Sign in with Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    height: "60%",
    width: "100%",
    resizeMode: "cover",
  },
  contentWrapper: {
    flex: 1,
    position: "absolute",
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: Border.br_content,
    borderTopRightRadius: Border.br_content,
    backgroundColor: Color.colorWhite,
    left: 0,
    bottom: 0,
    padding: Padding.p_lg,
  },
  formGroup: {
    marginBottom: 16
  },
  error: {
    marginTop: 6,
    fontSize: FontSize.size_sm,
    color: Color.colorRed,
  },
  title: {
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 30,
  },
  form: {},
  formInput: {
    padding: Padding.p_sm,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: Border.br_inputs_lg,
  },
  formBtn: {
    borderRadius: Border.br_inputs_lg,
    padding: Padding.p_base,
    backgroundColor: Color.colorTeal,
    marginTop: 10,
    marginBottom: 14,
  },
  formBtnInstagram: {
    borderRadius: Border.br_inputs_lg,
    padding: Padding.p_base,
    backgroundColor: Color.colorWhitesmoke_100,
    marginBottom: 14,
  },
  formBtnText: {
    textAlign: "center",
    color: Color.colorWhite,
    fontWeight: "600",
    fontSize: FontSize.size_base,
  },
  formBtnTextAlt: {
    textAlign: "center",
    color: Color.colorDimgray,
    fontWeight: "400",
    fontSize: FontSize.size_base,
  },
  formLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});

export default Login;
