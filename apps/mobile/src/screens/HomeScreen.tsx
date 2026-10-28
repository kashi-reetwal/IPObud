import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { IPO } from '../types';
import { IpoCard } from '../components/IpoCard';
import { TickerBar } from '../components/TickerBar';
import { Ionicons } from '@expo/vector-icons';

interface HomeScreenProps {
  ipos: IPO[];
  onOpenAi: (ipo: IPO) => void;
  onOpenCalc: (ipo: IPO) => void;
  onOpenAllotment: (ipo: IPO) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  ipos,
  onOpenAi,
  onOpenCalc,
  onOpenAllotment,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filtered = useMemo(() => {
    return ipos.filter((item) => {
      const matchSearch =
        item.companyName.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;

      if (filter === 'ALL') return true;
      if (filter === 'MAINBOARD' || filter === 'SME') return item.marketType === filter;
      return item.status === filter;
    });
  }, [ipos, search, filter]);

  return (
    <View style={styles.container}>
      {/* Ticker tape */}
      <TickerBar ipos={ipos} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={14} color="#71717a" style={styles.searchIcon} />
          <TextInput
            placeholder="Search company or ticker..."
            placeholderTextColor="#71717a"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={14} color="#71717a" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Chips Bar (Plain financial labels, no emojis) */}
      <View style={styles.chipsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { id: 'ALL', label: 'All Issues' },
            { id: 'ACTIVE', label: 'Bidding Open' },
            { id: 'UPCOMING', label: 'Upcoming' },
            { id: 'ALLOTTED', label: 'Allotment Out' },
            { id: 'LISTED', label: 'Recently Listed' },
            { id: 'MAINBOARD', label: 'Mainboard' },
            { id: 'SME', label: 'SME' },
          ].map((chip) => (
            <TouchableOpacity
              key={chip.id}
              onPress={() => setFilter(chip.id)}
              style={[
                styles.chip,
                filter === chip.id && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  filter === chip.id && styles.chipTextActive,
                ]}
              >
                {chip.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* IPO List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <IpoCard
            ipo={item}
            onOpenAi={onOpenAi}
            onOpenCalc={onOpenCalc}
            onOpenAllotment={onOpenAllotment}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No IPOs matched filter criteria</Text>
            <TouchableOpacity
              onPress={() => {
                setSearch('');
                setFilter('ALL');
              }}
              style={styles.resetBtn}
            >
              <Text style={styles.resetBtnText}>Reset Filter Parameters</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090a0f',
  },
  searchContainer: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#11131a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1f2330',
    paddingHorizontal: 10,
    height: 38,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  chipsRow: {
    paddingVertical: 6,
    paddingLeft: 14,
  },
  chip: {
    backgroundColor: '#11131a',
    borderWidth: 1,
    borderColor: '#1f2330',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
  },
  chipActive: {
    backgroundColor: '#27272a',
    borderColor: '#52525b',
  },
  chipText: {
    color: '#a1a1aa',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 20,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    color: '#71717a',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  resetBtn: {
    marginTop: 10,
    backgroundColor: '#1f2330',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  resetBtnText: {
    color: '#d4d4d8',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
});
