import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { FAB, Portal, Searchbar } from 'react-native-paper';
import styles from './styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { supabase } from '../../config/supabase';

type RootStackParamList = {
    Home: undefined;
    AddNotes: { note?: any } | undefined;
    SignUp: undefined;
};

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [notes, setNotes] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [state, setState] = useState({ open: false });
    const { open } = state;

    useEffect(() => {
        fetchNotes();

        const unsubscribe = navigation.addListener('focus', fetchNotes);
        return unsubscribe;
    }, [navigation]);

    // Fetch notes from Supabase
    const fetchNotes = async () => {
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userData?.user) {
            Alert.alert('Error', 'User not logged in');
            return;
        }

        const userId = userData.user.id;

        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.log('Fetch Notes Error:', error.message);
            Alert.alert('Error', 'Failed to fetch notes');
        } else {
            setNotes(data || []);
        }
    };

    // Delete a note
    const deleteNote = async (id: string) => {
        Alert.alert('Delete Note', 'Are you sure?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    const { error } = await supabase.from('notes').delete().eq('id', id);
                    if (error) {
                        Alert.alert('Error', error.message);
                    } else {
                        setNotes(prev => prev.filter(note => note.id !== id));
                    }
                },
            },
        ]);
    };

    // Filter notes for search
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        (note.content && note.content.toLowerCase().includes(search.toLowerCase()))
    );

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Text style={styles.date}>
                {new Date(item.created_at).toDateString()}
            </Text>

            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.content} numberOfLines={3}>
                {item.content}
            </Text>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => navigation.navigate('AddNotes', { note: item })}>
                    <Text style={{ color: '#4CAF50', fontWeight: '600' }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                    <Text style={{ color: '#F44336', fontWeight: '600' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search notes..."
                value={search}
                onChangeText={setSearch}
                style={styles.search}
            />

            <FlatList
                data={filteredNotes}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.empty}>No notes found</Text>}
            />

            <Portal>
                <FAB.Group
                    visible
                    open={open}
                    icon={open ? 'close' : 'plus'}
                    actions={[
                        { icon: 'plus', label: 'Add Note', onPress: () => navigation.navigate('AddNotes') },
                        { icon: 'star', label: 'Starred', onPress: () => console.log('Star') },
                        { icon: 'bell', label: 'Reminder', onPress: () => console.log('Reminder') },
                    ]}
                    onStateChange={({ open }) => setState({ open })}
                />
            </Portal>
        </View>
    );
};

export default HomeScreen;
