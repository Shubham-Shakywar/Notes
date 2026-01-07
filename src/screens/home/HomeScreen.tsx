import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { FAB, Portal, Searchbar } from 'react-native-paper';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [state, setState] = useState({ open: false });

    const { open } = state;

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        const staticNotes = [
            { id: '1', title: 'Meeting Notes', content: 'Discuss project timeline and milestones.', created_at: '2025-01-05T10:30:00' },
            { id: '2', title: 'Shopping List', content: 'Milk, Bread, Eggs, Fruits, Vegetables', created_at: '2025-01-04T08:15:00' },
            { id: '3', title: 'React Native Tips', content: 'FlatList optimization and memo usage.', created_at: '2025-01-03T14:45:00' },
            { id: '4', title: 'Workout Plan', content: 'Chest, Back, Legs, Cardio schedule.', created_at: '2025-01-02T07:20:00' },
            { id: '5', title: 'Interview Prep', content: 'Hooks, Redux, Navigation, APIs.', created_at: '2025-01-01T18:10:00' },
            { id: '6', title: 'Travel Checklist', content: 'Tickets, Charger, ID, Clothes.', created_at: '2024-12-31T11:00:00' },
            { id: '7', title: 'Daily Goals', content: 'Code 2 hours and revise concepts.', created_at: '2024-12-30T09:30:00' },
            { id: '8', title: 'App Ideas', content: 'Notes app, Expense tracker.', created_at: '2024-12-29T16:00:00' },
            { id: '9', title: 'Learning Plan', content: 'React Native + Supabase.', created_at: '2024-12-28T12:45:00' },
            { id: '10', title: 'Important Numbers', content: 'Doctor, Bank, Emergency.', created_at: '2024-12-27T10:10:00' },
        ];

        setNotes(staticNotes);
    };

    const deleteNote = (id) => {
        Alert.alert('Delete Note', 'Are you sure?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    setNotes(prev => prev.filter(note => note.id !== id));
                },
            },
        ]);
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.date}>
                {new Date(item.created_at).toDateString()}
            </Text>

            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.content} numberOfLines={3}>
                {item.content}
            </Text>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => Alert.alert('Edit', 'Edit coming soon')}>
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
