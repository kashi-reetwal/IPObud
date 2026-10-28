import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { IPO } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface GmpRadarScreenProps {
  ipos: IPO[];
  onOpenCalc: (ipo: IPO) => void;
  onOpenAi: (ipo: IPO) => void;
}

export const GmpRadarScreen: React.FC<GmpRadarScreenProps> = ({
  ipos,
  onOpenCalc,
  onOpenAi,
}) => {
  // Sort by highest gain percentage
  const sortedIpos = [...ipos].sort((a, b) => b.gainPercentage - a.gainPercentage);

  const topGainer = sortedIpos[0];
  const avgGmpGain = (
    sortedIpos.reduce((sum, item) => sum + item.gainPercentage, 0) / (sortedIpos.length || 1)
  ).toFixed(1);

  return (
    <View style={styles.container}>
      {/* Header Summary Banner */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>TOP GAINER</Text>
          <Text style={styles.topSymbol}>{topGainer?.symbol || 'N/A'}</Text>
          <Text style={styles.topGain}>
            +{topGainer?.gainPercentage || 0}%
          </Text>
        </View>

        <View style={styles.dividerVertical} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>AVERAGE GMP GAIN</Text>
          <Text style={styles.avgGain}>{avgGmpGain}%</Text>
          <Text style={styles.subtext}>Market Consensus</Text>
        </View>

        <View style={styles.dividerVertical} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>ACTIVE TRACKERS</Text>
          <Text style={styles.whiteBold}>{sortedIpos.length}</Text>
          <Text style={styles.subtext}>NSE/BSE Feeds</Text>
        </View>
      </View>

      {/* Ranked List */}
      <FlatList
        data={sortedIpos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isPositive = item.gainPercentage >= 0;
          return (
            <View style={styles.radarCard}>
              {/* Rank & Main Info */}
              <View style={styles.rowBetween}>
                <View style={styles.rowFlex}>
                  <View
                    style={[
                      styles.rankCircle,
                      index === 0 ? styles.rankGold : styles.rankNormal,
                    ]}
                  >
                    <Text
                      style={[
                        styles.rankText,
                        index === 0 ? styles.rankTextGold : styles.rankTextNormal,
                      ]}
                    >
                      #{index + 1}
                    </Text>
                  </View>
                  <View style={styles.infoCol}>
                    <Text style={styles.symbol}>{item.symbol}</Text>
                    <Text style={styles.company} numberOfLines={1}>
                      {item.companyName}
                    </Text>
                  </View>
                </View>

                <View style={styles.alignEnd}>
                  <Text
                    style={[
                      styles.gmpPercent,
                      isPositive ? styles.green : styles.red,
                    ]}
                  >
                    {isPositive ? '+' : ''}
                    {item.gainPercentage}%
                  </Text>
                  <Text style={styles.gmpRupees}>
                    GMP ₹{item.currentGmp} / share
                  </Text>
                </View>
              </View>

              {/* Price Details */}
              <View style={styles.priceRow}>
                <View style={styles.priceCol}>
                  <Text style={styles.tinyLabel}>ISSUE PRICE</Text>
                  <Text style={styles.priceVal}>₹{item.priceBandHigh}</Text>
                </View>
                <View style={styles.priceCol}>
                  <Text style={styles.tinyLabel}>EST. LISTING</Text>
                  <Text style={styles.priceValGreen}>
                    ₹{item.estimatedListingPrice}
                  </Text>
                </View>
                <View style={styles.priceCol}>
                  <Text style={styles.tinyLabel}>LOT GAIN</Text>
                  <Text style={styles.priceValCyan}>
                    +₹{(item.currentGmp * item.lotSize).toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>

              {/* Mini Trend Bar */}
              <View style={styles.trendContainer}>
                <Text style={styles.trendLabel}>7-DAY GMP MOMENTUM:</Text>
                <View style={styles.trendBarsRow}>
                  {item.gmpHistory.map((point, idx) => (
                    <View key={idx} style={styles.barItem}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            height: Math.max(6, Math.min(28, (point.gainPercent / (topGainer?.gainPercentage || 100)) * 28)),
                            backgroundColor: point.gainPercent >= 0 ? '#10b981' : '#f43f5e',
                          },
                        ]}
                      />
                      <Text style={styles.barDate}>{point.date.slice(0, 2)}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Action buttons */}
              <View style={styles.cardActions}>
                <TouchableOpacity
                  onPress={() => onOpenCalc(item)}
                  style={styles.actionBtn}
                >
                  <Ionicons name="calculator-outline" size={13} color="#06b6d4" />
                  <Text style={styles.actionBtnText}>Calculate Profit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onOpenAi(item)}
                  style={styles.actionBtnAi}
                >
                  <Ionicons name="sparkles" size={13} color="#a5b4fc" />
                  <Text style={styles.actionBtnAiText}>AI Verdict</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070e',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#0c121e',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 14,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  topSymbol: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  topGain: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 1,
  },
  avgGain: {
    color: '#06b6d4',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  whiteBold: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  subtext: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 1,
  },
  dividerVertical: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  radarCard: {
    backgroundColor: '#0c121e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 14,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rankGold: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  rankNormal: {
    backgroundColor: '#172033',
  },
  rankText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  rankTextGold: {
    color: '#f59e0b',
  },
  rankTextNormal: {
    color: '#94a3b8',
  },
  infoCol: {
    flex: 1,
  },
  symbol: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  company: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  gmpPercent: {
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  gmpRupees: {
    color: '#94a3b8',
    fontSize: 10,
    marginTop: 1,
  },
  green: {
    color: '#10b981',
  },
  red: {
    color: '#f43f5e',
  },
  priceRow: {
    flexDirection: 'row',
    backgroundColor: '#070a12',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  priceCol: {
    alignItems: 'center',
  },
  tinyLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '700',
  },
  priceVal: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  priceValGreen: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  priceValCyan: {
    color: '#06b6d4',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  trendContainer: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  trendLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  trendBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 34,
  },
  barItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  barFill: {
    width: 14,
    borderRadius: 3,
  },
  barDate: {
    color: '#64748b',
    fontSize: 9,
    marginTop: 3,
    fontFamily: 'monospace',
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#172033',
    paddingVertical: 7,
    borderRadius: 8,
    marginRight: 8,
  },
  actionBtnText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  actionBtnAi: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
  },
  actionBtnAiText: {
    color: '#a5b4fc',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
});
