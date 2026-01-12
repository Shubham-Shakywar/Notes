import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import styles from './styles';
import { supabase } from '../../config/supabase';

const AddNotes = ({ navigation, route }: any) => {
  // If editing, route.params.note will have the note data
  const editingNote = route?.params?.note;

  const [title, setTitle] = useState(editingNote?.title || '');
  const [content, setContent] = useState(editingNote?.content || '');
  const [loading, setLoading] = useState(false);

  // Save or Update Note
  const saveNote = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Please enter title and note');
      return;
    }

    setLoading(true);

    // Get logged-in user
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      setLoading(false);
      Alert.alert('Error', 'User not logged in');
      return;
    }

    const user = userData.user;

    if (editingNote) {
      // Update existing note
      const { error } = await supabase
        .from('notes')
        .update({ title, content })
        .eq('id', editingNote.id)
        .eq('user_id', user.id);

      setLoading(false);

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      Alert.alert('Success', 'Note updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      // Create new note
      const { error } = await supabase.from('notes').insert({
        title,
        content,
        user_id: user.id,
      });

      setLoading(false);

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      Alert.alert('Success', 'Note added successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.heading}>
            {editingNote ? 'Edit Note' : 'Add New Note'}
          </Text>

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Write your note..."
            value={content}
            onChangeText={setContent}
            style={styles.textArea}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={saveNote}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Saving...' : editingNote ? 'Update Note' : 'Save Note'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNotes;
