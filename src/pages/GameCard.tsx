import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, ToastAndroid } from 'react-native';
import { GameData } from '../redux/gameslice';
interface GameCardProps {
    data: GameData,
    key: string
}
const dummyImage = 'http://englishforless.com/wp-content/uploads/2014/10/dummy-placeholder-image-400x400-300x300.jpg'

function GameCardComponent({ data }: GameCardProps) {
    const { title, steamUrl } = data
    const imageUrl = useMemo(() => {
        const arr = steamUrl.split("/")
        const appId = arr[arr.length - 1]
        return `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/library_600x900_2x.jpg`
    }, [steamUrl])

    const showToast = () => {
        ToastAndroid.show(title, ToastAndroid.SHORT);
    };


    return (
        <Pressable onPress={showToast} style={styles.container}>
            <Image source={{ uri: dummyImage }} style={styles.imageFailed} resizeMode='cover' />
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode='cover' />
            <Text style={{ paddingHorizontal: 10, paddingVertical: 6, fontSize: 12 }}>{title}</Text>
        </Pressable>
    );
};


function equal(prev: Readonly<GameCardProps>, next: Readonly<GameCardProps>) {
    return prev.data.id === next.data.id
}

export const GameCard = React.memo(GameCardComponent, equal)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 8,
        margin: 10,
    },
    imageFailed: {
        width: '100%', height: 100, position: 'absolute'
    },
    image: {
        width: '100%', height: 100
    }
});
