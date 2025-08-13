import { Text, View } from "react-native";
import { Link } from 'expo-router'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Here some Link</Text>
      <Link href='../pages/Login'>Go to Login</Link>
      <Link href='../pages/Chatbot'>Go to Chatbot</Link>
    </View>
  );
}
