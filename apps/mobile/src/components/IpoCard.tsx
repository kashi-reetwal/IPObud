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

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_APPLY':
        return '#10b981';
      case 'APPLY':
        return '#06b6d4';
      case 'LISTING_GAINS_ONLY':
        return '#f59e0b';
      case 'AVOID':
        return '#f43f5e';
      default:
        return '#94a3b8';
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
            <View
              style={[
                styles.typePill,
                isMainboard ? styles.mainboardPill : styles.smePill,
              ]}
            >
              <Text
                style={[
                  styles.typeText,
                  isMainboard ? styles.mainboardText : styles.smeText,
                ]}
              >
                {ipo.marketType}
              </Text>
            </View>
            <View
              style={[
                styles.statusPill,
                ipo.status === 'ACTIVE'
                  ? styles.activePill
                  : ipo.status === 'ALLOTTED'
                  ? styles.allottedPill
                  : styles.upcomingPill,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  ipo.status === 'ACTIVE'
                    ? styles.activeText
                    : ipo.status === 'ALLOTTED'
                    ? styles.allottedText
                    : styles.upcomingText,
                ]}
              >
                {ipo.status}
              </Text>
            </View>
          </View>
          <Text style={styles.companyName} numberOfLines={1}>
            {ipo.companyName}
          </Text>
        </View>

        {/* AI Verdict Badge */}
        <TouchableOpacity
          onPress={() => onOpenAi(ipo)}
          style={[styles.verdictBadge, { borderColor: verdictColor + '40' }]}
        >
          <Ionicons name="sparkles" size={11} color={verdictColor} />
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
            ₹{ipo.priceBandLow} - ₹{ipo.priceBandHigh}
          </Text>
          <Text style={styles.subMetric}>
            Lot: {ipo.lotSize} shares (₹{minInvestment.toLocaleString('en-IN')})
          </Text>
        </View>

        <View style={[styles.metricColumn, styles.alignRight]}>
          <Text style={styles.metricLabel}>EST. LISTING GAIN (GMP)</Text>
          <Text
            style={[
              styles.metricValue,
              isPositive ? styles.greenText : styles.redText,
            ]}
          >
            ₹{ipo.currentGmp} ({ipo.gainPercentage > 0 ? '+' : ''}
            {ipo.gainPercentage}%)
          </Text>
          <Text style={styles.subMetric}>
            Est. Price: <Text style={styles.boldWhite}>₹{ipo.estimatedListingPrice}</Text>
          </Text>
        </View>
      </View>

      {/* Subscription demand teaser */}
      <View style={styles.subscriptionRow}>
        <View style={styles.flexRow}>
          <Ionicons name="time-outline" size={13} color="#06b6d4" />
          <Text style={styles.subDemandLabel}>Subscription Multiples:</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.subQuota}>QIB <Text style={styles.boldWhite}>{ipo.subscription.qib}x</Text></Text>
          <Text style={styles.subQuota}>NII <Text style={styles.boldWhite}>{ipo.subscription.nii}x</Text></Text>
          <Text style={styles.subQuota}>Ret <Text style={styles.greenText}>{ipo.subscription.retail}x</Text></Text>
        </View>
      </View>

      {/* Date timeline */}
      <View style={styles.timelineRow}>
        <Text style={styles.timelineText}>
          Close: <Text style={styles.boldWhite}>{ipo.closeDate}</Text>
        </Text>
        <Text style={styles.timelineText}>
          Listing: <Text style={styles.boldWhite}>{ipo.listingDate}</Text>
        </Text>
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          onPress={() => onOpenCalc(ipo)}
          style={styles.calcBtn}
        >
          <Ionicons name="calculator-outline" size={14} color="#06b6d4" />
          <Text style={styles.calcBtnText}>Bid Calc</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onOpenAi(ipo)}
          style={styles.aiBtn}
        >
          <Ionicons name="sparkles-outline" size={14} color="#06b6d4" />
          <Text style={styles.aiBtnText}>AI Analysis</Text>
        </TouchableOpacity>

        {ipo.status === 'ALLOTTED' && (
          <TouchableOpacity
            onPress={() => onOpenAllotment(ipo)}
            style={styles.allotmentBtn}
          >
            <Ionicons name="shield-checkmark" size={15} color="#10b981" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0c121e',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    marginBottom: 14,
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
    color: '#06b6d4',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'monospace',
    marginRight: 6,
  },
  typePill: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginRight: 6,
  },
  mainboardPill: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  smePill: {
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
  },
  typeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  mainboardText: {
    color: '#a5b4fc',
  },
  smeText: {
    color: '#d8b4fe',
  },
  statusPill: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  activePill: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
  },
  allottedPill: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
  },
  upcomingPill: {
    backgroundColor: 'rgba(148, 163, 184, 0.15)',
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
  },
  activeText: {
    color: '#fb7185',
  },
  allottedText: {
    color: '#38bdf8',
  },
  upcomingText: {
    color: '#cbd5e1',
  },
  companyName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verdictText: {
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
  },
  metricsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#070a12',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
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
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  metricValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  subMetric: {
    color: '#94a3b8',
    fontSize: 10,
    marginTop: 3,
  },
  boldWhite: {
    color: '#f1f5f9',
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
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subDemandLabel: {
    color: '#94a3b8',
    fontSize: 10,
    marginLeft: 5,
  },
  subQuota: {
    color: '#64748b',
    fontSize: 10,
    marginLeft: 8,
    fontFamily: 'monospace',
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  timelineText: {
    color: '#64748b',
    fontSize: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  calcBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#172033',
    borderRadius: 10,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  calcBtnText: {
    color: '#e2e8f0',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 5,
  },
  aiBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    borderRadius: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
  },
  aiBtnText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 5,
  },
  allotmentBtn: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
});
