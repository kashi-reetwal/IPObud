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
    backgroundColor: '#090a0f',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#11131a',
    marginHorizontal: 14,
    marginTop: 10,
    marginBottom: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2330',
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#71717a',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  topSymbol: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  topGain: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'monospace',
    marginTop: 1,
  },
  avgGain: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  whiteBold: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  subtext: {
    color: '#71717a',
    fontSize: 9,
    fontFamily: 'monospace',
    marginTop: 1,
  },
  dividerVertical: {
    width: 1,
    height: 28,
    backgroundColor: '#1f2330',
  },
  listContainer: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 20,
  },
  radarCard: {
    backgroundColor: '#11131a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2330',
    padding: 12,
    marginBottom: 10,
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
    borderRadius: 6,
    backgroundColor: '#1a1d28',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#282d3e',
  },
  rankText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'monospace',
    color: '#d4d4d8',
  },
  infoCol: {
    flex: 1,
  },
  symbol: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  company: {
    color: '#71717a',
    fontSize: 10,
    marginTop: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  gmpPercent: {
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  gmpRupees: {
    color: '#71717a',
    fontSize: 10,
    fontFamily: 'monospace',
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
    backgroundColor: '#090a0f',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#191c26',
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  priceCol: {
    alignItems: 'center',
  },
  tinyLabel: {
    color: '#52525b',
    fontSize: 8,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  priceVal: {
    color: '#e4e4e7',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
    fontFamily: 'monospace',
  },
  priceValGreen: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 1,
    fontFamily: 'monospace',
  },
  priceValWhite: {
    color: '#f4f4f5',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 1,
    fontFamily: 'monospace',
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  scheduleText: {
    color: '#71717a',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  boldZinc: {
    color: '#d4d4d8',
    fontWeight: '700',
  },
  pastResultsBox: {
    backgroundColor: '#090a0f',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#191c26',
    padding: 8,
    marginTop: 8,
  },
  pastHeader: {
    color: '#71717a',
    fontSize: 9,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  pastGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  pastItem: {
    color: '#a1a1aa',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  pastSub: {
    color: '#71717a',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  greenText: {
    color: '#10b981',
    fontWeight: '800',
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1a1d28',
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c202e',
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#293044',
  },
  actionBtnText: {
    color: '#e4e4e7',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  actionBtnSec: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181b26',
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#272c3d',
  },
  actionBtnSecText: {
    color: '#d4d4d8',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
});
