import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IPO } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface IpoCardProps {
  ipo: IPO;
  onOpenAi: (ipo: IPO) => void;
  onOpenCalc: (ipo: IPO) => void;
  onOpenAllotment: (ipo: IPO) => void;
  onOpenTimeline?: (ipo: IPO) => void;
}

export const IpoCard: React.FC<IpoCardProps> = ({
  ipo,
  onOpenAi,
  onOpenCalc,
  onOpenAllotment,
  onOpenTimeline,
}) => {
  const isPositive = ipo.gainPercentage >= 0;
  const isMainboard = ipo.marketType === 'MAINBOARD';
  const minInvestment = ipo.priceBandHigh * ipo.lotSize;

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_APPLY':
        return '#10b981';
      case 'APPLY':
        return '#d4d4d8';
      case 'LISTING_GAINS_ONLY':
        return '#f59e0b';
      case 'AVOID':
        return '#f43f5e';
      default:
        return '#71717a';
    }
  };

  const verdictColor = getVerdictColor(ipo.aiAnalysis.verdict);

  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <View style={styles.badgeRow}>
            <Text style={styles.symbol}>{ipo.symbol}</Text>
            <View style={styles.typePill}>
              <Text style={styles.typeText}>{ipo.marketType}</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{ipo.status}</Text>
            </View>
          </View>
          <Text style={styles.companyName} numberOfLines={1}>
            {ipo.companyName}
          </Text>
        </View>

        {/* AI Verdict Badge */}
        <TouchableOpacity
          onPress={() => onOpenAi(ipo)}
          style={[styles.verdictBadge, { borderColor: verdictColor + '60' }]}
        >
          <Text style={[styles.verdictText, { color: verdictColor }]}>
            {ipo.aiAnalysis.verdict.replace(/_/g, ' ')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Price & GMP Metrics Row */}
      <View style={styles.metricsBox}>
        <View style={styles.metricColumn}>
          <Text style={styles.metricLabel}>PRICE BAND</Text>
          <Text style={styles.metricValue}>
            INR {ipo.priceBandLow} - {ipo.priceBandHigh}
          </Text>
          <Text style={styles.subMetric}>
            Lot: {ipo.lotSize} sh (INR {minInvestment.toLocaleString('en-IN')})
          </Text>
        </View>

        <View style={[styles.metricColumn, styles.alignRight]}>
          <Text style={styles.metricLabel}>CURRENT GMP</Text>
          <Text
            style={[
              styles.metricValue,
              isPositive ? styles.greenText : styles.redText,
            ]}
          >
            INR {ipo.currentGmp} ({ipo.gainPercentage > 0 ? '+' : ''}
            {ipo.gainPercentage}%)
          </Text>
          <Text style={styles.subMetric}>
            Est: <Text style={styles.boldWhite}>INR {ipo.estimatedListingPrice}</Text>
          </Text>
        </View>
      </View>

      {/* Calendar Dates Timeline Box */}
      <View style={styles.datesBox}>
        <Text style={styles.datesHeader}>KEY SETTLEMENT DATES</Text>
        <View style={styles.datesGrid}>
          <View style={styles.dateCol}>
            <Text style={styles.dateLabel}>Bidding Closes</Text>
            <Text style={styles.dateVal}>{ipo.timeline.biddingClose}</Text>
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.dateLabel}>Allotment Final</Text>
            <Text style={styles.dateVal}>{ipo.timeline.allotmentFinalization}</Text>
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.dateLabel}>Refunds Initiate</Text>
            <Text style={styles.dateVal}>{ipo.timeline.refundsInitiation}</Text>
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.dateLabel}>Listing Day</Text>
            <Text style={styles.dateValGreen}>{ipo.timeline.listingOnExchange}</Text>
          </View>
        </View>
      </View>

      {/* Subscription Multiples */}
      <View style={styles.subscriptionRow}>
        <Text style={styles.subDemandLabel}>Subscription Multiples:</Text>
        <View style={styles.flexRow}>
          <Text style={styles.subQuota}>QIB <Text style={styles.boldWhite}>{ipo.subscription.qib}x</Text></Text>
          <Text style={styles.subQuota}>NII <Text style={styles.boldWhite}>{ipo.subscription.nii}x</Text></Text>
          <Text style={styles.subQuota}>Retail <Text style={styles.greenText}>{ipo.subscription.retail}x</Text></Text>
        </View>
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          onPress={() => onOpenCalc(ipo)}
          style={styles.calcBtn}
        >
          <Text style={styles.calcBtnText}>Bid Calculator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onOpenAi(ipo)}
          style={styles.aiBtn}
        >
          <Text style={styles.aiBtnText}>Analysis</Text>
        </TouchableOpacity>

        {ipo.status === 'ALLOTTED' && (
          <TouchableOpacity
            onPress={() => onOpenAllotment(ipo)}
            style={styles.allotmentBtn}
          >
            <Text style={styles.allotmentBtnText}>Allotment</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f1118',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f2433',
    padding: 14,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleArea: {
    flex: 1,
    marginRight: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  symbol: {
    color: '#f4f4f5',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'monospace',
    marginRight: 6,
  },
  typePill: {
    backgroundColor: '#181b26',
    borderWidth: 1,
    borderColor: '#272c3d',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginRight: 6,
  },
  typeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#a1a1aa',
    fontFamily: 'monospace',
  },
  statusPill: {
    backgroundColor: '#181b26',
    borderWidth: 1,
    borderColor: '#272c3d',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#a1a1aa',
    fontFamily: 'monospace',
  },
  companyName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  verdictBadge: {
    borderWidth: 1,
    backgroundColor: '#181b26',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verdictText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  metricsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#08090d',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1c202d',
    padding: 10,
    marginTop: 10,
  },
  metricColumn: {
    flex: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  metricLabel: {
    color: '#71717a',
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  metricValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  subMetric: {
    color: '#71717a',
    fontSize: 10,
    marginTop: 2,
    fontFamily: 'monospace',
  },
  boldWhite: {
    color: '#f4f4f5',
    fontWeight: '700',
  },
  greenText: {
    color: '#10b981',
    fontWeight: '800',
  },
  redText: {
    color: '#f43f5e',
    fontWeight: '800',
  },
  datesBox: {
    backgroundColor: '#08090d',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1c202d',
    padding: 9,
    marginTop: 8,
  },
  datesHeader: {
    color: '#71717a',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  datesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateCol: {
    alignItems: 'flex-start',
  },
  dateLabel: {
    color: '#52525b',
    fontSize: 8,
    fontFamily: 'monospace',
  },
  dateVal: {
    color: '#d4d4d8',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'monospace',
    marginTop: 1,
  },
  dateValGreen: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'monospace',
    marginTop: 1,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#12151e',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginTop: 8,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subDemandLabel: {
    color: '#71717a',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  subQuota: {
    color: '#71717a',
    fontSize: 10,
    marginLeft: 6,
    fontFamily: 'monospace',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1a1f2c',
  },
  calcBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c202e',
    borderRadius: 6,
    paddingVertical: 7,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#293044',
  },
  calcBtnText: {
    color: '#e4e4e7',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  aiBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181b26',
    borderRadius: 6,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#272c3d',
  },
  aiBtnText: {
    color: '#d4d4d8',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  allotmentBtn: {
    backgroundColor: '#06261c',
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#0d543e',
  },
  allotmentBtnText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
});
