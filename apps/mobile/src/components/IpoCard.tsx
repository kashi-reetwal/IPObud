import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IPO } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface IpoCardProps {
  ipo: IPO;
  onOpenAi: (ipo: IPO) => void;
  onOpenCalc: (ipo: IPO) => void;
  onOpenAllotment: (ipo: IPO) => void;
}

export const IpoCard: React.FC<IpoCardProps> = ({
  ipo,
  onOpenAi,
  onOpenCalc,
  onOpenAllotment,
}) => {
  const isPositive = ipo.gainPercentage >= 0;
  const isMainboard = ipo.marketType === 'MAINBOARD';
  const minInvestment = ipo.priceBandHigh * ipo.lotSize;

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_APPLY':
        return { bg: '#e6faf5', text: '#008767', border: '#b3f0df' };
      case 'APPLY':
        return { bg: '#eff6ff', text: '#1849a9', border: '#bfdbfe' };
      case 'LISTING_GAINS_ONLY':
        return { bg: '#fff4ed', text: '#c2410c', border: '#fed7aa' };
      case 'AVOID':
        return { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
    }
  };

  const vStyle = getVerdictStyle(ipo.aiAnalysis.verdict);

  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <View style={styles.badgeRow}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarText}>{ipo.symbol.slice(0, 2)}</Text>
            </View>
            <View>
              <Text style={styles.companyName} numberOfLines={1}>
                {ipo.companyName}
              </Text>
              <View style={styles.subRow}>
                <Text style={styles.symbol}>{ipo.symbol}</Text>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.typeText}>{ipo.marketType}</Text>
                <Text style={styles.bullet}>•</Text>
                <View style={styles.statusPill}>
                  <Text style={styles.statusText}>{ipo.status}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* AI Verdict Badge */}
        <TouchableOpacity
          onPress={() => onOpenAi(ipo)}
          style={[styles.verdictBadge, { backgroundColor: vStyle.bg, borderColor: vStyle.border }]}
        >
          <Text style={[styles.verdictText, { color: vStyle.text }]}>
            {ipo.aiAnalysis.verdict.replace(/_/g, ' ')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Pricing & GMP Details */}
      <View style={styles.metricsBox}>
        <View style={styles.metricColumn}>
          <Text style={styles.metricLabel}>Price Band</Text>
          <Text style={styles.metricValue}>
            ₹{ipo.priceBandLow} - ₹{ipo.priceBandHigh}
          </Text>
          <Text style={styles.subMetric}>
            Lot: {ipo.lotSize} shares (₹{minInvestment.toLocaleString('en-IN')})
          </Text>
        </View>

        <View style={[styles.metricColumn, styles.alignRight]}>
          <Text style={styles.metricLabel}>Est. Listing Gain</Text>
          <Text
            style={[
              styles.metricValue,
              isPositive ? styles.greenText : styles.redText,
            ]}
          >
            +₹{ipo.currentGmp} ({ipo.gainPercentage > 0 ? '+' : ''}
            {ipo.gainPercentage}%)
          </Text>
          <Text style={styles.subMetric}>
            Est. Price: <Text style={styles.boldWhite}>₹{ipo.estimatedListingPrice}</Text>
          </Text>
        </View>
      </View>

      {/* Key Dates Stepper / Grid */}
      <View style={styles.datesBox}>
        <Text style={styles.datesHeader}>KEY SETTLEMENT DATES</Text>
        <View style={styles.datesGrid}>
          <View style={styles.dateCol}>
            <Text style={styles.dateLabel}>Bidding Closes</Text>
            <Text style={styles.dateVal}>{ipo.timeline.biddingClose}</Text>
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.dateLabel}>Allotment</Text>
            <Text style={styles.dateVal}>{ipo.timeline.allotmentFinalization}</Text>
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.dateLabel}>Refunds</Text>
            <Text style={styles.dateVal}>{ipo.timeline.refundsInitiation}</Text>
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.dateLabel}>Listing</Text>
            <Text style={styles.dateValGreen}>{ipo.timeline.listingOnExchange}</Text>
          </View>
        </View>
      </View>

      {/* Subscription demand */}
      <View style={styles.subscriptionRow}>
        <Text style={styles.subDemandLabel}>Subscription Demand:</Text>
        <View style={styles.flexRow}>
          <Text style={styles.subQuota}>QIB <Text style={styles.boldWhite}>{ipo.subscription.qib}x</Text></Text>
          <Text style={styles.subQuota}>NII <Text style={styles.boldWhite}>{ipo.subscription.nii}x</Text></Text>
          <Text style={styles.subQuota}>Retail <Text style={styles.greenText}>{ipo.subscription.retail}x</Text></Text>
        </View>
      </View>

      {/* Action Buttons */}
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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
  },
  avatarBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#1849a9',
    fontSize: 12,
    fontWeight: '800',
  },
  companyName: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700',
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  symbol: {
    color: '#0f172a',
    fontSize: 11,
    fontWeight: '700',
  },
  bullet: {
    color: '#cbd5e1',
    marginHorizontal: 4,
    fontSize: 10,
  },
  typeText: {
    color: '#64748b',
    fontSize: 11,
  },
  statusPill: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  statusText: {
    color: '#475569',
    fontSize: 9,
    fontWeight: '700',
  },
  verdictBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  verdictText: {
    fontSize: 10,
    fontWeight: '700',
  },
  metricsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    marginTop: 12,
  },
  metricColumn: {
    flex: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  metricLabel: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '500',
  },
  metricValue: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  subMetric: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 2,
  },
  boldWhite: {
    color: '#0f172a',
    fontWeight: '700',
  },
  greenText: {
    color: '#008767',
    fontWeight: '700',
  },
  redText: {
    color: '#b91c1c',
    fontWeight: '700',
  },
  datesBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 10,
    marginTop: 10,
  },
  datesHeader: {
    color: '#008767',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
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
    color: '#64748b',
    fontSize: 9,
  },
  dateVal: {
    color: '#0f172a',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  dateValGreen: {
    color: '#008767',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 1,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subDemandLabel: {
    color: '#64748b',
    fontSize: 11,
  },
  subQuota: {
    color: '#64748b',
    fontSize: 11,
    marginLeft: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  calcBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingVertical: 9,
    marginRight: 8,
  },
  calcBtnText: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '700',
  },
  aiBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00d09c',
    borderRadius: 10,
    paddingVertical: 9,
  },
  aiBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  allotmentBtn: {
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  allotmentBtnText: {
    color: '#1849a9',
    fontSize: 12,
    fontWeight: '700',
  },
});
