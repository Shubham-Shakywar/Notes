import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import styles from './styles';
import { supabase } from '../../config/supabase';
import { IconButton } from 'react-native-paper';


const AddNotes = ({ navigation, route }: any) => {
  const editingNote = route?.params?.note;

  const [title, setTitle] = useState(editingNote?.title || '');
  const [content, setContent] = useState(editingNote?.content || '');
  const [loading, setLoading] = useState(false);
  const [titleFocused, setTitleFocused] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);

  const saveNote = async () => {
    if (!title || !content) {
      Alert.alert('Missing Fields', 'Please enter both title and note content');
      return;
    }

    setLoading(true);

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      setLoading(false);
      Alert.alert('Error', 'User not logged in');
      return;
    }

    const user = userData.user;

    if (editingNote) {
      const { error } = await supabase
        .from('notes')
        .update({ title, content })
        .eq('id', editingNote.id)
        .eq('user_id', user.id);

      setLoading(false);
      if (error) { Alert.alert('Error', error.message); return; }

      Alert.alert('Updated! ✅', 'Your note has been updated', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      const { error } = await supabase.from('notes').insert({
        title,
        content,
        user_id: user.id,
      });

      setLoading(false);
      if (error) { Alert.alert('Error', error.message); return; }

      Alert.alert('Saved! 🎉', 'Your note has been saved', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar backgroundColor="#F0B928" barStyle="dark-content" />

      {/* Custom Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}> */}
<IconButton
  icon="arrow-left"
  size={26}
  iconColor="white"
  style={{ marginLeft: -8 }}
  onPress={() => navigation.goBack()}
/>

        {/* </TouchableOpacity> */}
        <Text style={styles.headerTitle}>
          {editingNote ? 'Edit Note' : 'New Note'}
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Word count badge */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            {content.trim() ? `${content.trim().split(/\s+/).length} words` : 'Start writing...'}
          </Text>
          <Text style={styles.metaText}>
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Text>
        </View>

        {/* Title Input */}
        <View style={[styles.inputWrapper, titleFocused && styles.inputWrapperFocused]}>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            placeholder="Give your note a title..."
            placeholderTextColor="#BDBDBD"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
          />
        </View>

        {/* Content Input */}
        <View style={[styles.inputWrapper, styles.textAreaWrapper, contentFocused && styles.inputWrapperFocused]}>
          <Text style={styles.inputLabel}>Note</Text>
          <TextInput
            placeholder="Write your thoughts here..."
            placeholderTextColor="#BDBDBD"
            value={content}
            onChangeText={setContent}
            style={styles.textArea}
            multiline
            textAlignVertical="top"
            onFocus={() => setContentFocused(true)}
            onBlur={() => setContentFocused(false)}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={saveNote}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {loading ? '⏳ Saving...' : editingNote ? 'Update Note' : 'Save Note'}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNotes;