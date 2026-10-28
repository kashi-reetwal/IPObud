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

interface AiInsightsScreenProps {
  ipos: IPO[];
  onSelectIpo: (ipo: IPO) => void;
}

export const AiInsightsScreen: React.FC<AiInsightsScreenProps> = ({
  ipos,
  onSelectIpo,
}) => {
  // Count verdicts
  const strongApplyCount = ipos.filter(
    (i) => i.aiAnalysis.verdict === 'STRONG_APPLY'
  ).length;
  const applyCount = ipos.filter((i) => i.aiAnalysis.verdict === 'APPLY').length;
  const listingGainsCount = ipos.filter(
    (i) => i.aiAnalysis.verdict === 'LISTING_GAINS_ONLY'
  ).length;
  const avoidCount = ipos.filter((i) => i.aiAnalysis.verdict === 'AVOID').length;

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_APPLY':
        return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: '#10b981' };
      case 'APPLY':
        return { bg: 'rgba(6, 182, 212, 0.15)', text: '#06b6d4', border: '#06b6d4' };
      case 'LISTING_GAINS_ONLY':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', border: '#f59e0b' };
      case 'AVOID':
        return { bg: 'rgba(244, 63, 94, 0.15)', text: '#f43f5e', border: '#f43f5e' };
      default:
        return { bg: '#1e293b', text: '#94a3b8', border: '#64748b' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Top AI Metrics Matrix */}
      <View style={styles.matrixBox}>
        <View style={styles.matrixTitleRow}>
          <Ionicons name="sparkles" size={15} color="#06b6d4" />
          <Text style={styles.matrixTitle}>GEMINI PROSPECTUS CALLS</Text>
        </View>

        <View style={styles.matrixGrid}>
          <View style={styles.matrixCard}>
            <Text style={styles.matrixNumGreen}>{strongApplyCount}</Text>
            <Text style={styles.matrixSub}>Strong Apply</Text>
          </View>
          <View style={styles.matrixCard}>
            <Text style={styles.matrixNumCyan}>{applyCount}</Text>
            <Text style={styles.matrixSub}>Apply</Text>
          </View>
          <View style={styles.matrixCard}>
            <Text style={styles.matrixNumAmber}>{listingGainsCount}</Text>
            <Text style={styles.matrixSub}>Listing Gains</Text>
          </View>
          <View style={styles.matrixCard}>
            <Text style={styles.matrixNumRed}>{avoidCount}</Text>
            <Text style={styles.matrixSub}>Avoid / High Risk</Text>
          </View>
        </View>
      </View>

      {/* List of Prospectus Syntheses */}
      <FlatList
        data={ipos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const vStyle = getVerdictStyle(item.aiAnalysis.verdict);
          return (
            <TouchableOpacity
              onPress={() => onSelectIpo(item)}
              activeOpacity={0.8}
              style={styles.insightCard}
            >
              {/* Header */}
              <View style={styles.cardHeader}>
                <View style={styles.titleCol}>
                  <Text style={styles.symbol}>{item.symbol}</Text>
                  <Text style={styles.company} numberOfLines={1}>
                    {item.companyName}
                  </Text>
                </View>

                {/* Verdict Pill */}
                <View
                  style={[
                    styles.verdictPill,
                    { backgroundColor: vStyle.bg, borderColor: vStyle.border },
                  ]}
                >
                  <Text style={[styles.verdictText, { color: vStyle.text }]}>
                    {item.aiAnalysis.verdict.replace(/_/g, ' ')}
                  </Text>
                </View>
              </View>

              {/* Rationale Summary */}
              <Text style={styles.summaryText} numberOfLines={2}>
                {item.aiAnalysis.summary}
              </Text>

              {/* Risk & Valuation Multiples */}
              <View style={styles.multiplesBox}>
                <View style={styles.multipleItem}>
                  <Text style={styles.multipleLabel}>RISK SCORE</Text>
                  <Text
                    style={[
                      styles.multipleVal,
                      item.aiAnalysis.riskScore > 60
                        ? styles.redText
                        : item.aiAnalysis.riskScore > 35
                        ? styles.amberText
                        : styles.greenText,
                    ]}
                  >
                    {item.aiAnalysis.riskScore}/100
                  </Text>
                </View>

                <View style={styles.dividerV} />

                <View style={styles.multipleItem}>
                  <Text style={styles.multipleLabel}>IPO P/E</Text>
                  <Text style={styles.multipleValWhite}>
                    {item.aiAnalysis.peRatio ? `${item.aiAnalysis.peRatio}x` : 'Loss-Making'}
                  </Text>
                </View>

                <View style={styles.dividerV} />

                <View style={styles.multipleItem}>
                  <Text style={styles.multipleLabel}>PEER P/E</Text>
                  <Text style={styles.multipleValWhite}>
                    {item.aiAnalysis.industryPe ? `${item.aiAnalysis.industryPe}x` : 'N/A'}
                  </Text>
                </View>
              </View>

              {/* Highlights teaser */}
              <View style={styles.teaserRow}>
                <View style={styles.teaserBadgeGreen}>
                  <Text style={styles.teaserTextGreen} numberOfLines={1}>
                    ✓ {item.aiAnalysis.strengths[0]}
                  </Text>
                </View>
              </View>
              <View style={styles.teaserRow}>
                <View style={styles.teaserBadgeRed}>
                  <Text style={styles.teaserTextRed} numberOfLines={1}>
                    ! {item.aiAnalysis.risks[0]}
                  </Text>
                </View>
              </View>

              {/* Tap prompt */}
              <View style={styles.cardFooter}>
                <Text style={styles.tapPrompt}>Tap for full DRHP financial breakdown</Text>
                <Ionicons name="chevron-forward" size={14} color="#06b6d4" />
              </View>
            </TouchableOpacity>
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
  matrixBox: {
    backgroundColor: '#0c121e',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 14,
  },
  matrixTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  matrixTitle: {
    color: '#06b6d4',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginLeft: 6,
  },
  matrixGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  matrixCard: {
    flex: 1,
    backgroundColor: '#070a12',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  matrixNumGreen: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  matrixNumCyan: {
    color: '#06b6d4',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  matrixNumAmber: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  matrixNumRed: {
    color: '#f43f5e',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  matrixSub: {
    color: '#94a3b8',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  insightCard: {
    backgroundColor: '#0c121e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 14,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleCol: {
    flex: 1,
    marginRight: 8,
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
  verdictPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  verdictText: {
    fontSize: 10,
    fontWeight: '800',
  },
  summaryText: {
    color: '#cbd5e1',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
  },
  multiplesBox: {
    flexDirection: 'row',
    backgroundColor: '#070a12',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  multipleItem: {
    alignItems: 'center',
  },
  multipleLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '700',
  },
  multipleVal: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  multipleValWhite: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  greenText: {
    color: '#10b981',
  },
  amberText: {
    color: '#f59e0b',
  },
  redText: {
    color: '#f43f5e',
  },
  dividerV: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  teaserRow: {
    marginTop: 6,
  },
  teaserBadgeGreen: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.15)',
  },
  teaserTextGreen: {
    color: '#34d399',
    fontSize: 10,
  },
  teaserBadgeRed: {
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.15)',
  },
  teaserTextRed: {
    color: '#fb7185',
    fontSize: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  tapPrompt: {
    color: '#06b6d4',
    fontSize: 10,
    fontWeight: '700',
  },
});
