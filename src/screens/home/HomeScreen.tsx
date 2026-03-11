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
import Header from '../../components/header/Header';

type RootStackParamList = {
    Home: undefined;
    AddNotes: { note?: any } | undefined;
    SignUp: undefined;
};

const CARD_COLORS = ['#FFF8E1', '#E8F5E9', '#E3F2FD', '#FCE4EC', '#F3E5F5', '#E0F7FA'];

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [catagory, setCategory] = useState<string[]>([]);
    const [catagorySelected, setCategorySelected] = useState<string>(catagory[0] || '');
    const [notes, setNotes] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [state, setState] = useState({ open: false });
    const { open } = state;

    useEffect(() => {
        fetchNotes();
        const unsubscribe = navigation.addListener('focus', fetchNotes);
        return unsubscribe;
    }, [navigation]);

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
            Alert.alert('Error', 'Failed to fetch notes');
        } else {
            setNotes(data || []);
            const categories = [
                "All",
                ...new Set(
                    data
                        ?.map(note => note.category?.trim())
                        .filter(cat => cat)
                )
            ];

            // console.log("Unique Categories ---->", categories);
            setCategory(categories)
            if (categories.length > 0) {
                setCategorySelected(categories[0]);
            }
        }
    };

    const deleteNote = async (id: string) => {
        Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
            { text: 'Cancel', style: 'cancel' },
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

    const filteredNotes = notes.filter(note => {
        const matchesSearch =
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            (note.content && note.content.toLowerCase().includes(search.toLowerCase()));

        const matchesCategory =
            catagorySelected === "All" ? true : note.category === catagorySelected;

        return matchesSearch && matchesCategory;
    });

    const renderItem = ({ item, index }: any) => {
        const cardColor = CARD_COLORS[index % CARD_COLORS.length];
        return (
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate('AddNotes', { note: item })}
                style={[styles.card, { backgroundColor: cardColor }]}
            >
                <View style={styles.cardHeader}>
                    <View style={styles.dateBadge}>
                        <Text style={styles.date}>
                            {new Date(item.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </Text>
                    </View>
                    <View style={[styles.dot, { backgroundColor: '#F0B928' }]} />
                </View>

                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>

                <Text style={styles.content} numberOfLines={2}>
                    {item.content}
                </Text>

                <View style={styles.divider} />

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => navigation.navigate('AddNotes', { note: item })}
                    >
                        <Text style={styles.editBtnText}>✏️  Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => deleteNote(item.id)}
                    >
                        <Text style={styles.deleteBtnText}>🗑  Delete</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.contentContainer}>
                <View style={styles.statsBar}>
                    <Text style={styles.statsText}>
                        {filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}
                    </Text>
                    <Text style={styles.statsSubText}>Keep your thoughts organized ✨</Text>
                </View>

                <Searchbar
                    placeholder="Search notes..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.search}
                    inputStyle={styles.searchInput}
                    iconColor="#F0B928"
                    placeholderTextColor="#BDBDBD"
                />
                <View style={{ borderWidth: 0, marginVertical: 10 }}>
                    <FlatList
                        data={catagory}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ borderWidth: 1, marginHorizontal: 5, borderRadius: 10, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#e0a6121d', borderColor: catagorySelected === item ? '#F0B928' : 'white' }} onPress={() => setCategorySelected(item)}>
                                <Text style={{ fontSize: 16, color: '#F0B928' }}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        horizontal
                    />
                </View>
                <FlatList
                    data={filteredNotes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>📝</Text>
                            <Text style={styles.emptyTitle}>No notes yet</Text>
                            <Text style={styles.emptySubtitle}>Tap + to create your first note</Text>
                        </View>
                    }
                />

                <Portal>
                    <FAB.Group
                        visible
                        open={open}
                        icon={open ? 'close' : 'plus'}
                        fabStyle={styles.fab}
                        actions={[
                            {
                                icon: 'plus',
                                label: 'Add Note',
                                onPress: () => navigation.navigate('AddNotes'),
                                style: styles.fabAction,
                            },
                            {
                                icon: 'star',
                                label: 'Starred',
                                onPress: () => console.log('Star'),
                                style: styles.fabAction,
                            },
                            {
                                icon: 'bell',
                                label: 'Reminder',
                                onPress: () => console.log('Reminder'),
                                style: styles.fabAction,
                            },
                        ]}
                        onStateChange={({ open }) => setState({ open })}
                    />
                </Portal>
            </View>
        </View>
    );
};

export default HomeScreen;