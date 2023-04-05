import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { loadgames } from '../../src/redux/gameslice';
import { RootState, useAppDispatch } from '../../src/redux/store';
import { GameCard } from './GameCard';

const GameList: React.FC = () => {
    const dispatch = useAppDispatch()
    const { list, loading } = useSelector((state: RootState) => state.game)
    useEffect(() => {
        dispatch(loadgames())
    }, [])
    console.log({ list, loading })
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 10 }}
                numColumns={2}
                data={list}
                initialNumToRender={30}
                maxToRenderPerBatch={30}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => (
                    {length: 140, offset: 140 * index, index}
                  )}
                renderItem={({ item, index }) => {
                    return <GameCard key={item.id.toString()} data={item} />
                }}
            />

        </View>
    );
};
export default GameList
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:30
    },
});
