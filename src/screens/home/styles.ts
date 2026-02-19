import { StyleSheet } from 'react-native';

const YELLOW = '#F0B928';
const YELLOW_DARK = '#D4A017';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },

    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 14,
    },

    // ─── Stats Bar ───────────────────────────────────────────
    statsBar: {
        marginBottom: 14,
        paddingHorizontal: 4,
    },
    statsText: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1C1C1E',
        letterSpacing: -0.5,
    },
    statsSubText: {
        fontSize: 13,
        color: '#9E9E9E',
        marginTop: 2,
        fontWeight: '400',
    },

    // ─── Searchbar ───────────────────────────────────────────
    search: {
        marginBottom: 16,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    searchInput: {
        fontSize: 14,
        color: '#1C1C1E',
    },

    // ─── Card ────────────────────────────────────────────────
    card: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    dateBadge: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },

    date: {
        fontSize: 11,
        color: '#6E6E6E',
        fontWeight: '600',
        letterSpacing: 0.3,
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 6,
        letterSpacing: -0.2,
    },

    content: {
        fontSize: 13,
        color: '#6E6E6E',
        lineHeight: 19,
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.07)',
        marginVertical: 12,
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },

    editBtn: {
        backgroundColor: 'rgba(240,185,40,0.15)',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: YELLOW,
    },
    editBtnText: {
        fontSize: 13,
        color: YELLOW_DARK,
        fontWeight: '700',
    },

    deleteBtn: {
        backgroundColor: 'rgba(244,67,54,0.08)',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EF9A9A',
    },
    deleteBtnText: {
        fontSize: 13,
        color: '#E53935',
        fontWeight: '700',
    },

    // ─── Empty State ─────────────────────────────────────────
    emptyContainer: {
        marginTop: 80,
        alignItems: 'center',
    },
    emptyIcon: {
        fontSize: 52,
        marginBottom: 14,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#3A3A3A',
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#AEAEAE',
        fontWeight: '400',
    },

    // ─── FAB ─────────────────────────────────────────────────
    fab: {
        backgroundColor: YELLOW,
    },
    fabAction: {
        backgroundColor: YELLOW,
    },
});

export default styles;