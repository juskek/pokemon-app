import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    FlatList,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { usePokedexScreen } from "./usePokedexScreen";

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

type Props = NativeStackScreenProps<RootStackParamList, "PokedexScreen">;

export function PokedexScreen({ route, navigation }: Props) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        usePokedexScreen();

    return (
        <SafeAreaView style={styles.container}>
            {status === "loading" ? (
                <Text>Loading...</Text>
            ) : status === "error" ? (
                <Text>Error</Text>
            ) : (
                <View>
                    <FlatList
                        data={data?.pages.flatMap((page) => page.results)}
                        renderItem={({ item }) => (
                            <TouchableHighlight
                                style={styles.card}
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() =>
                                    navigation.navigate(
                                        "PokemonDetailsScreen",
                                        {
                                            name: item.name,
                                            uri: item.url,
                                        },
                                    )
                                }
                            >
                                <Item title={item.name} />
                            </TouchableHighlight>
                        )}
                        onEndReached={() => fetchNextPage()}
                        keyExtractor={(item) => item.url}
                    />
                    {hasNextPage && isFetchingNextPage ? (
                        <ActivityIndicator />
                    ) : null}
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        padding: 20,
    },
    card: {
        backgroundColor: "#f9c2ff",
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
    },
    title: {
        fontSize: 32,
        textAlign: "center",
    },
});
