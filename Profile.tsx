import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

export function Profile() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.profileImage} source={require('./assets/profile.jpg')} />
                <Text style={styles.name}>John Doge</Text>
                <Text style={styles.username}>@johndoge</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.number}>3 Cars</Text>
                    <Text style = {styles.infoText}>Rented</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.number}>5 Cars</Text>
                    <Text style = {styles.infoText}>Favoured</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.number}>2 Cars</Text>
                    <Text style = {styles.infoText}>Reviewed</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>My Bookings</Text>
                <TouchableOpacity><Text>View all</Text></TouchableOpacity>
            </View>
            <View style={styles.cards}>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>Favoured Cars</Text>
                <TouchableOpacity><Text>View all</Text></TouchableOpacity>
            </View>
            <View style={styles.card}></View>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
    },
    username: {
        color: 'gray',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#2f2f2f',
        borderRadius: 20,
        padding: 20,
    },
    info: {
        alignItems: 'center',
    },
    number: {
        color: '#fff',
    },
    infoText: {
        color: 'gray',
    },
    heading: {
        fontWeight: 'bold',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '48%',
        height: 150,
        backgroundColor: 'lightgray',
        borderRadius: 10,
    },
    editButton: {
        backgroundColor: '#0E5E28',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 40,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

