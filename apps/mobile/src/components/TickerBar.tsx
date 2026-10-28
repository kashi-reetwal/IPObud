import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IPO } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface TickerBarProps {
  ipos: IPO[];
}

export const TickerBar: React.FC<TickerBarProps> = ({ ipos }) => {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Ionicons name="flash" size={12} color="#06b6d4" />
        <Text style={styles.badgeText}>GMP</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {ipos.map((ipo) => {
          const isPositive = ipo.gainPercentage >= 0;
          return (
            <View key={ipo.id} style={styles.tickerItem}>
              <Text style={styles.symbol}>{ipo.symbol}</Text>
              <Text style={styles.price}>₹{ipo.priceBandHigh}</Text>
              <Text style={[styles.gain, isPositive ? styles.green : styles.red]}>
                {isPositive ? '+' : ''}
                {ipo.gainPercentage}%
              </Text>
              <Text style={styles.divider}>•</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#070a12',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeText: {
    color: '#06b6d4',
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 2,
  },
  scrollContent: {
    alignItems: 'center',
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  symbol: {
    color: '#e2e8f0',
    fontSize: 11,
    fontWeight: '700',
    marginRight: 4,
  },
  price: {
    color: '#94a3b8',
    fontSize: 11,
    marginRight: 4,
  },
  gain: {
    fontSize: 11,
    fontWeight: '700',
  },
  green: {
    color: '#10b981',
  },
  red: {
    color: '#f43f5e',
  },
  divider: {
    color: '#334155',
    marginLeft: 8,
  },
});
