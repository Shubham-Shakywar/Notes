import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    elevation: 3,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15,
  },
  textArea: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 140,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageBtn: {
  backgroundColor: '#EFEFEF',
  padding: 12,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#ddd',
},
imageBtnText: {
  color: '#333',
  fontSize: 15,
  fontWeight: '500',
},
preview: {
  width: '100%',
  height: 180,
  borderRadius: 12,
  marginBottom: 15,
},
imageGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 15,
},
thumb: {
  width: 70,
  height: 70,
  borderRadius: 10,
},
overlay: {
  position: 'absolute',
  width: 70,
  height: 70,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
},
overlayText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
previewContainer: {
  flex: 1,
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
},
fullImage: {
  width: '100%',
  height: '100%',
},
allImagesContainer: {
  flex: 1,
  padding: 10,
  backgroundColor: '#fff',
},
allThumb: {
  width: 110,
  height: 110,
  margin: 5,
  borderRadius: 10,
},
closeBtn: {
  backgroundColor: '#007AFF',
  padding: 14,
  borderRadius: 10,
  margin: 10,
  alignItems: 'center',
},
closeText: {
  color: '#fff',
  fontWeight: '600',
},


});

export default styles;