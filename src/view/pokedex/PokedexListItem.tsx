import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const Item = ({ title }: { title: string }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export const PokedexListItem = ({
    name,
    onPress,
}: {
    name: string;
    onPress: () => void;
}) => {
    return (
        <TouchableHighlight
            style={styles.card}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={onPress}
        >
            <Item title={name} />
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
    },
    title: {
        fontSize: 32,
        textAlign: "center",
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
