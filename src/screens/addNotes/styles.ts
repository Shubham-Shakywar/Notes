import { StyleSheet, Platform } from 'react-native';

const YELLOW = '#F0B928';
const YELLOW_DARK = '#D4A017';
const YELLOW_LIGHT = '#FFF8E1';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  // ─── Header ──────────────────────────────────────────────
  header: {
    height: 64,
    backgroundColor: YELLOW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // ─── Scroll Content ───────────────────────────────────────
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },

  // ─── Meta Row ─────────────────────────────────────────────
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  metaText: {
    fontSize: 12,
    color: '#AEAEAE',
    fontWeight: '500',
  },

  // ─── Input Wrapper ────────────────────────────────────────
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  inputWrapperFocused: {
    borderColor: YELLOW,
    elevation: 4,
    shadowOpacity: 0.1,
  },
  textAreaWrapper: {
    minHeight: 200,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: YELLOW_DARK,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
    padding: 0,
  },
  textArea: {
    fontSize: 15,
    color: '#3A3A3A',
    lineHeight: 24,
    padding: 0,
    minHeight: 160,
  },

  // ─── Save Button ──────────────────────────────────────────
  button: {
    backgroundColor: YELLOW,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
    elevation: 4,
    shadowColor: YELLOW,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // ─── Cancel Button ────────────────────────────────────────
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelBtnText: {
    fontSize: 15,
    color: '#AEAEAE',
    fontWeight: '600',
  },

  // ─── Unused but kept for compatibility ───────────────────
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
  imageBtn: {
    backgroundColor: YELLOW_LIGHT,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: YELLOW,
  },
  imageBtnText: {
    color: YELLOW_DARK,
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
    backgroundColor: YELLOW,
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