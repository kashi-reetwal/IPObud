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

      {/* Search Bar (Groww style) */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#8f98a8" style={styles.searchIcon} />
          <TextInput
            placeholder="Search by company or symbol..."
            placeholderTextColor="#8f98a8"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color="#8f98a8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Chips Bar (Groww clean pills) */}
      <View style={styles.chipsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { id: 'ALL', label: 'All IPOs' },
            { id: 'ACTIVE', label: 'Open Now' },
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
            <Text style={styles.emptyTitle}>No IPOs matched your search</Text>
            <TouchableOpacity
              onPress={() => {
                setSearch('');
                setFilter('ALL');
              }}
              style={styles.resetBtn}
            >
              <Text style={styles.resetBtnText}>Reset Filters</Text>
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
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#0f172a',
    fontSize: 13,
  },
  chipsRow: {
    paddingVertical: 8,
    paddingLeft: 16,
  },
  chip: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#00d09c',
    borderColor: '#00d09c',
  },
  chipText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 24,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    color: '#64748b',
    fontSize: 13,
  },
  resetBtn: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resetBtnText: {
    color: '#008767',
    fontSize: 12,
    fontWeight: '700',
  },
});
