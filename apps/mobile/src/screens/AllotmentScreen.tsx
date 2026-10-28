import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { IPO } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface AllotmentScreenProps {
  ipos: IPO[];
}

export const AllotmentScreen: React.FC<AllotmentScreenProps> = ({ ipos }) => {
  const [selectedIpoId, setSelectedIpoId] = useState(ipos[0]?.id || '');
  const [pan, setPan] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{
    status: 'ALLOTTED' | 'NOT_ALLOTTED' | null;
    sharesAllotted?: number;
    gainAtGmp?: number;
    refundDate?: string;
  } | null>(null);

  const currentIpo = ipos.find((i) => i.id === selectedIpoId) || ipos[0];

  const handleCheck = () => {
    if (!pan || pan.length < 5) return;
    setIsSearching(true);
    setResult(null);

    setTimeout(() => {
      setIsSearching(false);
      // Demo logic: If PAN ends in 'A' or '7' -> Confirmed Allotment!
      if (pan.toUpperCase().endsWith('A') || pan.toUpperCase().endsWith('7')) {
        const shares = currentIpo ? currentIpo.lotSize : 1;
        setResult({
          status: 'ALLOTTED',
          sharesAllotted: shares,
          gainAtGmp: (currentIpo?.currentGmp || 0) * shares,
        });
      } else {
        setResult({
          status: 'NOT_ALLOTTED',
          sharesAllotted: 0,
          refundDate: currentIpo?.allotmentDate || 'Tomorrow',
        });
      }
    }, 600);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.bannerIcon}>
          <Ionicons name="shield-checkmark" size={24} color="#10b981" />
        </View>
        <Text style={styles.bannerTitle}>Universal Allotment Checker</Text>
        <Text style={styles.bannerSubtitle}>
          Query registrar databases across Link Intime, KFintech, Bigshare, and Skyline.
        </Text>
      </View>

      {/* Select IPO Issue */}
      <View style={styles.section}>
        <Text style={styles.label}>SELECT IPO ISSUE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ipoScroll}>
          {ipos.map((ipo) => (
            <TouchableOpacity
              key={ipo.id}
              onPress={() => {
                setSelectedIpoId(ipo.id);
                setResult(null);
              }}
              style={[
                styles.ipoChip,
                selectedIpoId === ipo.id && styles.ipoChipActive,
              ]}
            >
              <Text
                style={[
                  styles.ipoChipSymbol,
                  selectedIpoId === ipo.id && styles.ipoChipSymbolActive,
                ]}
              >
                {ipo.symbol}
              </Text>
              <Text
                style={[
                  styles.ipoChipStatus,
                  ipo.status === 'ALLOTTED' ? styles.green : styles.slate,
                ]}
              >
                {ipo.status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* PAN Form */}
      <View style={styles.formCard}>
        <Text style={styles.label}>APPLICANT PAN (PERMANENT ACCOUNT NUMBER)</Text>
        <View style={styles.inputRow}>
          <Ionicons name="card-outline" size={18} color="#64748b" style={styles.inputIcon} />
          <TextInput
            placeholder="e.g. ABCDE1234F"
            placeholderTextColor="#64748b"
            value={pan}
            onChangeText={(t) => setPan(t.toUpperCase())}
            maxLength={10}
            autoCapitalize="characters"
            style={styles.panInput}
          />
        </View>
        <Text style={styles.helperTip}>
          Tip: End your PAN with &apos;A&apos; to test a guaranteed ALLOTTED simulation!
        </Text>

        {/* Registrar Deep-Link Bar */}
        {currentIpo && (
          <View style={styles.registrarRow}>
            <View>
              <Text style={styles.tinyLabel}>OFFICIAL REGISTRAR</Text>
              <Text style={styles.registrarName}>{currentIpo.registrarName}</Text>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL(currentIpo.registrarUrl)}
              style={styles.portalLink}
            >
              <Text style={styles.portalLinkText}>Direct Site</Text>
              <Ionicons name="open-outline" size={13} color="#06b6d4" />
            </TouchableOpacity>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          onPress={handleCheck}
          disabled={isSearching}
          style={[styles.checkBtn, isSearching && styles.disabledBtn]}
        >
          <Ionicons name="search" size={16} color="#05070e" />
          <Text style={styles.checkBtnText}>
            {isSearching ? 'Verifying with Registrar...' : 'Fetch Allotment Status'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Outcome Banner */}
      {result && (
        <View style={styles.outcomeContainer}>
          {result.status === 'ALLOTTED' ? (
            <View style={styles.allottedBox}>
              <View style={styles.outcomeHeader}>
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                <View style={styles.outcomeHeaderTexts}>
                  <Text style={styles.allottedTitle}>Allotment Confirmed! 🎉</Text>
                  <Text style={styles.allottedSub}>
                    {currentIpo?.companyName} ({currentIpo?.symbol})
                  </Text>
                </View>
              </View>

              <View style={styles.metricsRow}>
                <View style={styles.metricBox}>
                  <Text style={styles.tinyLabel}>SHARES ALLOTTED</Text>
                  <Text style={styles.metricValWhite}>{result.sharesAllotted} Shares</Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.tinyLabel}>EST. LISTING GAIN</Text>
                  <Text style={styles.metricValGreen}>
                    +₹{result.gainAtGmp?.toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>
              <Text style={styles.noteText}>
                Shares will be credited to your Demat account on {currentIpo?.listingDate}.
              </Text>
            </View>
          ) : (
            <View style={styles.notAllottedBox}>
              <View style={styles.outcomeHeader}>
                <Ionicons name="close-circle" size={24} color="#f43f5e" />
                <View style={styles.outcomeHeaderTexts}>
                  <Text style={styles.notAllottedTitle}>Not Allotted for this Application</Text>
                  <Text style={styles.notAllottedSub}>
                    {currentIpo?.companyName} ({currentIpo?.symbol})
                  </Text>
                </View>
              </View>
              <Text style={styles.refundText}>
                Your UPI blocking mandate will be unreserved by your bank on or before{' '}
                <Text style={styles.boldWhite}>{result.refundDate}</Text>.
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Registrar Directory info */}
      <View style={styles.dirCard}>
        <Text style={styles.dirTitle}>INDIAN IPO REGISTRARS DIRECTORY</Text>
        {[
          { name: 'Link Intime India', issues: 'Swiggy, Waaree, Tata Tech' },
          { name: 'KFin Technologies', issues: 'Hyundai, NTPC Green, Bajaj Housing' },
          { name: 'Bigshare Services', issues: 'Premier Energies, Apex Ecotech' },
        ].map((item, idx) => (
          <View key={idx} style={styles.dirRow}>
            <Ionicons name="business-outline" size={14} color="#64748b" />
            <View style={styles.dirCol}>
              <Text style={styles.dirName}>{item.name}</Text>
              <Text style={styles.dirSub}>{item.issues}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070e',
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  headerBanner: {
    alignItems: 'center',
    backgroundColor: '#0c121e',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 18,
    marginBottom: 16,
  },
  bannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  bannerSubtitle: {
    color: '#94a3b8',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  section: {
    marginBottom: 14,
  },
  label: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  ipoScroll: {
    flexDirection: 'row',
  },
  ipoChip: {
    backgroundColor: '#0c121e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  ipoChipActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: '#06b6d4',
  },
  ipoChipSymbol: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  ipoChipSymbolActive: {
    color: '#06b6d4',
  },
  ipoChipStatus: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  green: {
    color: '#10b981',
  },
  slate: {
    color: '#64748b',
  },
  formCard: {
    backgroundColor: '#0c121e',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    marginBottom: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#070a12',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    height: 46,
  },
  inputIcon: {
    marginRight: 8,
  },
  panInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'monospace',
    letterSpacing: 1.5,
  },
  helperTip: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 6,
  },
  registrarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#070a12',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  tinyLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '700',
  },
  registrarName: {
    color: '#e2e8f0',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  portalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  portalLinkText: {
    color: '#06b6d4',
    fontSize: 10,
    fontWeight: '700',
    marginRight: 4,
  },
  checkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 14,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  checkBtnText: {
    color: '#05070e',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
  },
  outcomeContainer: {
    marginBottom: 14,
  },
  allottedBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    padding: 16,
  },
  notAllottedBox: {
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    padding: 16,
  },
  outcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outcomeHeaderTexts: {
    marginLeft: 10,
    flex: 1,
  },
  allottedTitle: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '800',
  },
  allottedSub: {
    color: '#cbd5e1',
    fontSize: 11,
    marginTop: 2,
  },
  notAllottedTitle: {
    color: '#f43f5e',
    fontSize: 14,
    fontWeight: '800',
  },
  notAllottedSub: {
    color: '#cbd5e1',
    fontSize: 11,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#070a12',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  metricBox: {
    alignItems: 'center',
    flex: 1,
  },
  metricValWhite: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  metricValGreen: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  noteText: {
    color: '#94a3b8',
    fontSize: 10,
    marginTop: 10,
  },
  refundText: {
    color: '#cbd5e1',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
  },
  boldWhite: {
    color: '#ffffff',
    fontWeight: '700',
  },
  dirCard: {
    backgroundColor: '#0c121e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    padding: 14,
  },
  dirTitle: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  dirRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  dirCol: {
    marginLeft: 8,
    flex: 1,
  },
  dirName: {
    color: '#e2e8f0',
    fontSize: 11,
    fontWeight: '700',
  },
  dirSub: {
    color: '#64748b',
    fontSize: 10,
  },
});
