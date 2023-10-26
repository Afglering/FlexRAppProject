import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

export function InfoSwipe() {
  const slidesData = [
    {
      image: require("./assets/promotion/luxury1.jpg"),
      title: "Boost Your Reputation With Amazing Cars",
      descriptor:
        "Rent amazing cars from all around, and display them on your social platforms.",
    },
    {
      image: require("./assets/promotion/luxury2.jpg"),
      title: "Be A Super Car Owner, Without Breaking The Bank",
      descriptor:
        "Owning a super car has never been easier. Give us your money and take our cars.",
    },
    {
      image: require("./assets/promotion/luxury3.jpg"),
      title: "Have A Super Car That's Not Being Used? Rent It Out!",
      descriptor:
        "Rent out your super car to others and make money while you're not using it.",
    },
  ];

  return (
    <View style={styles.container}>
      <Swiper showsButtons={false} paginationStyle={styles.paginationStyle}>
        {slidesData.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={styles.logo} />
            <View style={styles.loginCard}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.paragraph}>{slide.descriptor}</Text>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                  /* Continue button action here */
                }}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => {
                  /* Skip button action here */
                }}
              >
                <Text style={styles.buttonText2}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    height: "60%",
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
    maxHeight: "60%",
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  paragraph: {
    marginVertical: 10,
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    opacity: 0.5,
  },
  continueButton: {
    backgroundColor: "#0E5E28",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginVertical: 5,
  },
  skipButton: {
    backgroundColor: "#DBDBDB",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  buttonText2: {
    color: "#000",
    textAlign: "center",
  },
  paginationStyle: {
    bottom: "40%",
  },
});
