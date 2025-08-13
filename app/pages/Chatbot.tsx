import { View, Image, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useState } from 'react';
import { Entypo, Feather } from '@expo/vector-icons';
import axios from "axios";

export default function Chatbot() {

    type Message = {
        id: string;
        text?: string;        // actual answer
        reasoning?: string;   // optional reasoning
        sender: string;
    }

    const [message, setMessage] = useState<Message[]>([]);
    const [text, setText] = useState('');

    const handleMessage = async () => {
        if (!text.trim()) return;

        // Add user's message immediately
        const userMsg = { id: Date.now().toString(), text: text, sender: 'me' }
        setMessage(prev => [...prev, userMsg]);

        // Add bot loading bubble
        const loadingId = Date.now().toString() + '_loading';
        setMessage(prev => [...prev, { id: loadingId, text: '...', sender: 'bot' }]);

        const currentText = text;
        setText('');

        try {
            const res = await axios.post('http://localhost:3000/chat', {
                message: currentText
            });

            const fullText = res.data?.message || 'No reply from server';
            let reasoning = '';
            let answer = fullText;

            // Split reasoning and answer if <think> tag exists
            if (fullText.includes('</think>')) {
                const parts = fullText.split('</think>');
                reasoning = parts[0].replace('<think>', '').trim();
                answer = parts[1].trim();
            }

            // Replace loading bubble with reasoning + answer
            setMessage(prev =>
                prev.flatMap(msg => {
                    if (msg.id === loadingId) {
                        const bubbles: Message[] = [];
                        if (reasoning) {
                            bubbles.push({ id: Date.now().toString() + '_r', reasoning, sender: 'bot' });
                        }
                        bubbles.push({ id: Date.now().toString() + '_a', text: answer, sender: 'bot' });
                        return bubbles;
                    }
                    return [msg];
                })
            );

        } catch (err) {
            console.error(err);
            setMessage(prev =>
                prev.map(msg =>
                    msg.id === loadingId ? { id: Date.now().toString(), text: 'Error: Could not get response', sender: 'bot' } : msg
                )
            );
        }
    };

    const handleChatHistory = () => {
        alert("Testing");
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[styles.bubble, item.sender === 'me' ? styles.myBubble : styles.otherBubble]}>
            {item.text && <Text>{item.text}</Text>}
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLogo}>
                    <Image source={require('../../assets/images/LOGO_AGRARIAN.png')} style={styles.iconLogo} />
                    <Text style={styles.textLogo}>AI</Text>
                </View>
                <TouchableOpacity style={{ marginRight: 30 }} onPress={handleChatHistory}>
                    <Entypo name="chat" size={40} color='#6AC595' />
                </TouchableOpacity>
            </View>

            {/* Messages */}
            <FlatList
                data={message}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                style={{ flex: 1 }}
            />

            {/* Input */}
            <View style={styles.inputBar}>
                <TextInput
                    placeholder="Tanya Agra AI"
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity onPress={handleMessage}>
                    <Feather name='send' size={20} color='#6AC595' />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: '#fff'
    },
    headerLogo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textLogo: {
        fontSize: 32,
        fontFamily: 'OpenSans_700Bold',
        color: '#6AC595'
    },
    iconLogo: {
        resizeMode: 'contain',
        alignSelf: 'flex-start',
        width: 152,
        marginRight: 10
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#FFFFFF'
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 8,
        paddingVertical: 10
    },
    bubble: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '70%'
    },
    myBubble: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end'
    },
    otherBubble: {
        backgroundColor: '#EAEAEA',
        alignSelf: 'flex-start'
    },
});
