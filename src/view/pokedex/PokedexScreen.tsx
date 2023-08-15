import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { usePokedexScreen } from "./usePokedexScreen";
import { PokedexListItem } from "./PokedexListItem";

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
                            <PokedexListItem
                                name={item.name}
                                onPress={() =>
                                    navigation.navigate(
                                        "PokemonDetailsScreen",
                                        {
                                            name: item.name,
                                            uri: item.url,
                                        },
                                    )
                                }
                            />
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
});
