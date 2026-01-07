import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import styles from './styles';

const AddNotes = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const pickImage = () => {
    launchCamera(
      { mediaType: 'photo', quality: 0.7 },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Camera error');
          return;
        }
        if (response.assets?.length) {
          setImages(prev => [...prev, ...response.assets]);
        }
      }
    );
  };

  const saveNote = () => {
    if (!title || !content) {
      Alert.alert('Error', 'Please enter title and note');
      return;
    }

    Alert.alert('Success', 'Note added successfully', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const renderImages = () => {
    const visibleImages = images.slice(0, 4);
    const remaining = images.length - 4;

    return (
      <View style={styles.imageGrid}>
        {visibleImages.map((img, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setPreviewImage(img.uri)}
          >
            <Image source={{ uri: img.uri }} style={styles.thumb} />

            {index === 3 && remaining > 0 && (
              <TouchableOpacity
                style={styles.overlay}
                onPress={() => setShowAll(true)}
              >
                <Text style={styles.overlayText}>+{remaining}</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.heading}>Add New Note</Text>

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

          <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
            <Text style={styles.imageBtnText}>Add Image</Text>
          </TouchableOpacity>

          {images.length > 0 && renderImages()}

          <TouchableOpacity style={styles.button} onPress={saveNote}>
            <Text style={styles.buttonText}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 🔍 Full Image Preview */}
      <Modal visible={!!previewImage} transparent>
        <TouchableOpacity
          style={styles.previewContainer}
          onPress={() => setPreviewImage(null)}
        >
          <Image
            source={{ uri: previewImage || '' }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>

      {/* 📸 Show All Images */}
      <Modal visible={showAll}>
        <View style={styles.allImagesContainer}>
          <FlatList
            data={images}
            numColumns={3}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setPreviewImage(item.uri)}>
                <Image source={{ uri: item.uri }} style={styles.allThumb} />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setShowAll(false)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddNotes;
