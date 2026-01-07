import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    padding: 16,
  },

  search: {
    marginBottom: 16,
    borderRadius: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  date: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },

  content: {
    fontSize: 14,
    color: '#4E4E4E',
    marginTop: 6,
    lineHeight: 20,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 16,
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontSize: 16,
  },
});

export default styles;
