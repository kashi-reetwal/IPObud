import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { IPO } from '../types';

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
          <Text style={styles.summaryLabel}>AVG GMP GAIN</Text>
          <Text style={styles.avgGain}>{avgGmpGain}%</Text>
          <Text style={styles.subtext}>Market Consensus</Text>
        </View>

        <View style={styles.dividerVertical} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>TRACKED ISSUES</Text>
          <Text style={styles.whiteBold}>{sortedIpos.length}</Text>
          <Text style={styles.subtext}>NSE / BSE</Text>
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
                  <View style={styles.rankCircle}>
                    <Text style={styles.rankText}>#{index + 1}</Text>
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
                    GMP INR {item.currentGmp}
                  </Text>
                </View>
              </View>

              {/* Price Details */}
              <View style={styles.priceRow}>
                <View style={styles.priceCol}>
                  <Text style={styles.tinyLabel}>ISSUE PRICE</Text>
                  <Text style={styles.priceVal}>INR {item.priceBandHigh}</Text>
                </View>
                <View style={styles.priceCol}>
                  <Text style={styles.tinyLabel}>EST. LISTING</Text>
                  <Text style={styles.priceValGreen}>
                    INR {item.estimatedListingPrice}
                  </Text>
                </View>
                <View style={styles.priceCol}>
                  <Text style={styles.tinyLabel}>LOT GAIN</Text>
                  <Text style={styles.priceValWhite}>
                    +INR {(item.currentGmp * item.lotSize).toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>

              {/* Calendar Settlement Schedule */}
              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleText}>
                  Refunds: <Text style={styles.boldZinc}>{item.timeline.refundsInitiation}</Text>
                </Text>
                <Text style={styles.scheduleText}>
                  Listing: <Text style={styles.boldZinc}>{item.timeline.listingOnExchange}</Text>
                </Text>
              </View>

              {/* Past Performance Box (if listed) */}
              {item.pastResults && (
                <View style={styles.pastResultsBox}>
                  <Text style={styles.pastHeader}>Actual Exchange Listing Performance:</Text>
                  <View style={styles.pastGrid}>
                    <Text style={styles.pastItem}>
                      Listing Day: <Text style={styles.greenText}>INR {item.pastResults.listingPrice} ({item.pastResults.listingGainPercent >= 0 ? '+' : ''}{item.pastResults.listingGainPercent}%)</Text>
                    </Text>
                    <Text style={styles.pastSub}>
                      Day Close: INR {item.pastResults.listingDayClose}
                    </Text>
                  </View>
                </View>
              )}

              {/* Action buttons */}
              <View style={styles.cardActions}>
                <TouchableOpacity
                  onPress={() => onOpenCalc(item)}
                  style={styles.actionBtn}
                >
                  <Text style={styles.actionBtnText}>Bid Calculator</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onOpenAi(item)}
                  style={styles.actionBtnSec}
                >
                  <Text style={styles.actionBtnSecText}>Analysis</Text>
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
    backgroundColor: '#f8fafc',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 14,
    marginTop: 10,
    marginBottom: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  topSymbol: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '800',
  },
  topGain: {
    color: '#008767',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 1,
  },
  avgGain: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '800',
  },
  whiteBold: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '800',
  },
  subtext: {
    color: '#64748b',
    fontSize: 9,
    marginTop: 1,
  },
  dividerVertical: {
    width: 1,
    height: 28,
    backgroundColor: '#e2e8f0',
  },
  listContainer: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 20,
  },
  radarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  rankText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1849a9',
  },
  infoCol: {
    flex: 1,
  },
  symbol: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '800',
  },
  company: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  gmpPercent: {
    fontSize: 15,
    fontWeight: '800',
  },
  gmpRupees: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 1,
  },
  green: {
    color: '#008767',
  },
  red: {
    color: '#b91c1c',
  },
  priceRow: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  priceCol: {
    alignItems: 'center',
  },
  tinyLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '600',
  },
  priceVal: {
    color: '#0f172a',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },
  priceValGreen: {
    color: '#008767',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 1,
  },
  priceValWhite: {
    color: '#0f172a',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 1,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  scheduleText: {
    color: '#64748b',
    fontSize: 10,
  },
  boldZinc: {
    color: '#0f172a',
    fontWeight: '700',
  },
  pastResultsBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 8,
    marginTop: 8,
  },
  pastHeader: {
    color: '#0f172a',
    fontSize: 9,
    fontWeight: '700',
  },
  pastGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  pastItem: {
    color: '#334155',
    fontSize: 10,
  },
  pastSub: {
    color: '#64748b',
    fontSize: 10,
  },
  greenText: {
    color: '#008767',
    fontWeight: '800',
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 7,
    borderRadius: 10,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionBtnText: {
    color: '#0f172a',
    fontSize: 11,
    fontWeight: '700',
  },
  actionBtnSec: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00d09c',
    paddingVertical: 7,
    borderRadius: 10,
  },
  actionBtnSecText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
});
