import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { Color, FontSize, Padding, Border } from "../GlobalStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type InfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InfoSwipe"
>;

interface InfoScreenProps {
  navigation: InfoScreenNavigationProp;
}

const InfoSwipe: React.FC<InfoScreenProps> = ({ navigation }) => {
  const swiperRef = useRef(null);

  const slidesData = [
    {
      image: require("../assets/promotion/luxury1.jpg"),
      title: "Boost Your Reputation With Amazing Cars",
      descriptor:
        "Rent amazing cars from all around, and display them on your social platforms.",
    },
    {
      image: require("../assets/promotion/luxury2.jpg"),
      title: "Be A Super Car Owner, Without Breaking The Bank",
      descriptor:
        "Owning a super car has never been easier. Give us your money and take our cars.",
    },
    {
      image: require("../assets/promotion/luxury3.jpg"),
      title: "Have A Super Car That's Not Being Used? Rent It Out!",
      descriptor:
        "Rent out your super car to others and make money while you're not using it.",
    },
  ];

  const handleSkipButtonPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        showsButtons={false}
        paginationStyle={styles.paginationStyle}
      >
        {slidesData.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.imageWrapper}>
            <Image source={slide.image} style={styles.logo} />
            </View>
            <View style={styles.loginCard}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.paragraph}>{slide.descriptor}</Text>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleSkipButtonPress}
              >
                <Text style={styles.buttonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGainsboro,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
  },
  imageWrapper: {
    height: "100%",
  },
  logo: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  loginCard: {
    borderTopLeftRadius: Border.br_content,
    borderTopRightRadius: Border.br_content,
    padding: 30,
    backgroundColor: Color.colorWhite,
    shadowRadius: 3,
    elevation: 99,
    width: "100%",
    position: "absolute",
    bottom: 0
  },
  title: {
    fontSize: FontSize.size_3xl,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: Color.colorDark,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: FontSize.size_base,
    color: Color.colorDarkgray,
    textAlign: "center",
    marginBottom: 30,
  },
  continueButton: {
    borderRadius: Border.br_inputs_lg,
    padding: Padding.p_base,
    backgroundColor: Color.colorTeal,
    marginBottom: 14,
  },
  skipButton: {
    borderRadius: Border.br_inputs_lg,
    padding: Padding.p_base,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: FontSize.size_base,
    textAlign: "center",
  },
  buttonText2: {
    textAlign: "center",
    fontWeight: "500",
    color: Color.colorDarkgray,
  },
  paginationStyle: {
    bottom: "30%",
  },
});

export default InfoSwipe;
