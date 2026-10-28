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
          <Ionicons name="search" size={16} color="#64748b" style={styles.searchIcon} />
          <TextInput
            placeholder="Search company or symbol..."
            placeholderTextColor="#64748b"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color="#64748b" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Chips Bar */}
      <View style={styles.chipsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { id: 'ALL', label: 'All Issues' },
            { id: 'ACTIVE', label: '🔴 Live Bidding' },
            { id: 'UPCOMING', label: '⏳ Upcoming' },
            { id: 'ALLOTTED', label: '🎯 Allotment Out' },
            { id: 'MAINBOARD', label: '🏢 Mainboard' },
            { id: 'SME', label: '⚡ SME Sector' },
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
            <Ionicons name="layers-outline" size={36} color="#334155" />
            <Text style={styles.emptyTitle}>No IPOs matched your filter</Text>
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
    backgroundColor: '#05070e',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c121e',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
  },
  chipsRow: {
    paddingVertical: 8,
    paddingLeft: 16,
  },
  chip: {
    backgroundColor: '#0c121e',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: '#06b6d4',
  },
  chipText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#06b6d4',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 10,
  },
  resetBtn: {
    marginTop: 12,
    backgroundColor: '#172033',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetBtnText: {
    color: '#06b6d4',
    fontSize: 12,
    fontWeight: '700',
  },
});
