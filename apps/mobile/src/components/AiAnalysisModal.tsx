import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { IPO } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface AiAnalysisModalProps {
  ipo: IPO | null;
  onClose: () => void;
}

export const AiAnalysisModal: React.FC<AiAnalysisModalProps> = ({ ipo, onClose }) => {
  if (!ipo) return null;

  const { aiAnalysis } = ipo;

  return (
    <Modal visible={!!ipo} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <Ionicons name="sparkles" size={18} color="#06b6d4" />
              </View>
              <View style={styles.headerTitles}>
                <Text style={styles.title} numberOfLines={1}>
                  {ipo.companyName}
                </Text>
                <Text style={styles.subtitle}>
                  Gemini AI Prospectus Synthesizer ({ipo.symbol})
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Verdict Card */}
            <View style={styles.verdictCard}>
              <Text style={styles.verdictLabel}>1-CLICK VERDICT</Text>
              <Text style={styles.verdictMain}>
                {aiAnalysis.verdict.replace(/_/g, ' ')}
              </Text>
              <Text style={styles.verdictSummary}>{aiAnalysis.summary}</Text>
            </View>

            {/* Risk Bar */}
            <View style={styles.riskCard}>
              <View style={styles.riskHeader}>
                <Text style={styles.riskLabel}>CALCULATED RISK SCORE</Text>
                <Text style={styles.riskValue}>{aiAnalysis.riskScore}/100</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${aiAnalysis.riskScore}%`,
                      backgroundColor:
                        aiAnalysis.riskScore > 60
                          ? '#f43f5e'
                          : aiAnalysis.riskScore > 35
                          ? '#f59e0b'
                          : '#10b981',
                    },
                  ]}
                />
              </View>
              <View style={styles.peRow}>
                <Text style={styles.peText}>
                  IPO P/E: <Text style={styles.whiteBold}>{aiAnalysis.peRatio ? `${aiAnalysis.peRatio}x` : 'Loss-Making'}</Text>
                </Text>
                <Text style={styles.peText}>
                  Peer P/E: <Text style={styles.whiteBold}>{aiAnalysis.industryPe ? `${aiAnalysis.industryPe}x` : 'N/A'}</Text>
                </Text>
              </View>
            </View>

            {/* Financial Highlights */}
            <View style={styles.finCard}>
              <Text style={styles.sectionTitle}>FINANCIAL SNAPSHOT (RHP)</Text>
              <View style={styles.finGrid}>
                <View style={styles.finItem}>
                  <Text style={styles.finLabel}>Revenue</Text>
                  <Text style={styles.finVal}>{aiAnalysis.financials.revenue}</Text>
                </View>
                <View style={styles.finItem}>
                  <Text style={styles.finLabel}>Net PAT</Text>
                  <Text style={styles.finVal}>{aiAnalysis.financials.pat}</Text>
                </View>
                <View style={styles.finItem}>
                  <Text style={styles.finLabel}>Growth</Text>
                  <Text style={styles.finGreen}>{aiAnalysis.financials.growth}</Text>
                </View>
                <View style={styles.finItem}>
                  <Text style={styles.finLabel}>Debt/Equity</Text>
                  <Text style={styles.finVal}>{aiAnalysis.financials.debtToEquity}</Text>
                </View>
              </View>
            </View>

            {/* Strengths */}
            <View style={styles.strengthsCard}>
              <View style={styles.titleRow}>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <Text style={styles.strengthTitle}>KEY INVESTMENT STRENGTHS</Text>
              </View>
              {aiAnalysis.strengths.map((str, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={styles.bulletGreen}>•</Text>
                  <Text style={styles.bulletText}>{str}</Text>
                </View>
              ))}
            </View>

            {/* Red flags */}
            <View style={styles.risksCard}>
              <View style={styles.titleRow}>
                <Ionicons name="warning" size={16} color="#f43f5e" />
                <Text style={styles.riskTitle}>CRITICAL RED FLAGS</Text>
              </View>
              {aiAnalysis.risks.map((risk, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={styles.bulletRed}>•</Text>
                  <Text style={styles.bulletText}>{risk}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Close Action */}
          <TouchableOpacity onPress={onClose} style={styles.doneBtn}>
            <Text style={styles.doneBtnText}>Close Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#0c121e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    maxHeight: '88%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTitles: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    color: '#06b6d4',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  content: {
    marginTop: 14,
  },
  verdictCard: {
    backgroundColor: 'rgba(6, 182, 212, 0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    padding: 14,
    marginBottom: 12,
  },
  verdictLabel: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  verdictMain: {
    color: '#06b6d4',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 3,
  },
  verdictSummary: {
    color: '#cbd5e1',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  riskCard: {
    backgroundColor: '#070a12',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    padding: 14,
    marginBottom: 12,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riskLabel: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
  },
  riskValue: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#1e293b',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  peRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  peText: {
    color: '#64748b',
    fontSize: 11,
    fontFamily: 'monospace',
  },
  whiteBold: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  finCard: {
    backgroundColor: '#070a12',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  finGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  finItem: {
    width: '48%',
    backgroundColor: '#0c121e',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  finLabel: {
    color: '#64748b',
    fontSize: 10,
  },
  finVal: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  finGreen: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  strengthsCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    padding: 14,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  strengthTitle: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  risksCard: {
    backgroundColor: 'rgba(244, 63, 94, 0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.2)',
    padding: 14,
    marginBottom: 14,
  },
  riskTitle: {
    color: '#f43f5e',
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletGreen: {
    color: '#10b981',
    fontSize: 14,
    marginRight: 6,
  },
  bulletRed: {
    color: '#f43f5e',
    fontSize: 14,
    marginRight: 6,
  },
  bulletText: {
    color: '#cbd5e1',
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },
  doneBtn: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  doneBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
