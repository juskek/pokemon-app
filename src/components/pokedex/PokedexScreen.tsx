import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { FlatList } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query'
import queryString from 'query-string';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

type Props = NativeStackScreenProps<RootStackParamList, 'PokedexScreen'>;


export function PokedexScreen({ route, navigation }: Props) {

    const fetchProjects = async ({ pageParam = 0 }) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pageParam}&limit=20`)
        return res.json()
    }


    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery<PokemonUrlQueryData, string>({
        queryKey: ['results'],
        queryFn: fetchProjects,
        getNextPageParam: (lastPage, pages) => {
            const uri = lastPage.next;
            const parsedParams = queryString.parseUrl(uri).query;
            const offset = parsedParams.offset;
            return offset;
        },
    })

    return <SafeAreaView style={styles.container}>
        {status === 'loading' ? (
            <Text>Loading...</Text>
        ) : status === 'error' ? (
            <Text>Error</Text>
        ) : (
            <View>
                <FlatList
                    data={data.pages.flatMap(page => page.results)}
                    renderItem={({ item }) =>
                        <TouchableHighlight
                            style={styles.touchable}
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                            onPress={() => navigation.navigate('PokemonDetailsScreen',
                                {
                                    name: item.name,
                                    uri: item.url,
                                }
                            )}>
                            <Item title={item.name} />
                        </TouchableHighlight>
                    }
                    onEndReached={() => fetchNextPage()}
                    keyExtractor={item => item.url}
                />
                {hasNextPage && isFetchingNextPage ? <ActivityIndicator /> : null}
            </View>
        )}
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 20,
    },
    touchable: {
        backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

});
