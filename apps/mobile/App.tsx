import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { mockIpos } from './src/data/mockIpos';
import { IPO, UserBid } from './src/types';

import { HomeScreen } from './src/screens/HomeScreen';
import { GmpRadarScreen } from './src/screens/GmpRadarScreen';
import { AiInsightsScreen } from './src/screens/AiInsightsScreen';
import { AllotmentScreen } from './src/screens/AllotmentScreen';
import { MyBidsScreen } from './src/screens/MyBidsScreen';

import { AiAnalysisModal } from './src/components/AiAnalysisModal';
import { BidCalculatorModal } from './src/components/BidCalculatorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'IPOS' | 'RADAR' | 'AI' | 'ALLOTMENT' | 'BIDS'
  >('IPOS');

  // Modals
  const [selectedAiIpo, setSelectedAiIpo] = useState<IPO | null>(null);
  const [selectedCalcIpo, setSelectedCalcIpo] = useState<IPO | null>(null);

  // User Bids state with realistic starter items
  const [bids, setBids] = useState<UserBid[]>([
    {
      id: 'bid-1',
      ipoId: '2',
      companyName: 'Waaree Energies Limited',
      symbol: 'WAAREE',
      lots: 1,
      totalShares: 9,
      investmentAmount: 13527,
      bidPrice: 1503,
      gmpAtBid: 1520,
      expectedProfit: 13680,
      appliedDate: '22 Oct 2024',
      status: 'ALLOTTED',
    },
    {
      id: 'bid-2',
      ipoId: '1',
      companyName: 'Swiggy Limited',
      symbol: 'SWIGGY',
      lots: 2,
      totalShares: 76,
      investmentAmount: 29640,
      bidPrice: 390,
      gmpAtBid: 32,
      expectedProfit: 2432,
      appliedDate: '07 Nov 2024',
      status: 'PENDING',
    },
  ]);

  const handleSaveBid = (
    ipo: IPO,
    lots: number,
    amount: number,
    expectedProfit: number
  ) => {
    const newBid: UserBid = {
      id: `bid-${Date.now()}`,
      ipoId: ipo.id,
      companyName: ipo.companyName,
      symbol: ipo.symbol,
      lots,
      totalShares: lots * ipo.lotSize,
      investmentAmount: amount,
      bidPrice: ipo.priceBandHigh,
      gmpAtBid: ipo.currentGmp,
      expectedProfit,
      appliedDate: 'Today',
      status: 'PENDING',
    };
    setBids([newBid, ...bids]);
    setActiveTab('BIDS');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#090a0f" />

      {/* Institutional Mobile Header */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>IPO</Text>
          </View>
          <View>
            <View style={styles.flexRow}>
              <Text style={styles.brandTitle}>IPObud</Text>
              <View style={styles.liveTag}>
                <Text style={styles.liveTagText}>TERMINAL</Text>
              </View>
            </View>
            <Text style={styles.marketSub}>NSE • BSE Mainboard & SME</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => alert('Alert notifications active for mandate closures and allotment releases.')}
          style={styles.notifBtn}
        >
          <Ionicons name="notifications-outline" size={16} color="#d4d4d8" />
        </TouchableOpacity>
      </View>

      {/* Screen Body */}
      <View style={styles.screenContainer}>
        {activeTab === 'IPOS' && (
          <HomeScreen
            ipos={mockIpos}
            onOpenAi={(ipo) => setSelectedAiIpo(ipo)}
            onOpenCalc={(ipo) => setSelectedCalcIpo(ipo)}
            onOpenAllotment={() => setActiveTab('ALLOTMENT')}
          />
        )}

        {activeTab === 'RADAR' && (
          <GmpRadarScreen
            ipos={mockIpos}
            onOpenCalc={(ipo) => setSelectedCalcIpo(ipo)}
            onOpenAi={(ipo) => setSelectedAiIpo(ipo)}
          />
        )}

        {activeTab === 'AI' && (
          <AiInsightsScreen
            ipos={mockIpos}
            onSelectIpo={(ipo) => setSelectedAiIpo(ipo)}
          />
        )}

        {activeTab === 'ALLOTMENT' && (
          <AllotmentScreen ipos={mockIpos} />
        )}

        {activeTab === 'BIDS' && (
          <MyBidsScreen
            bids={bids}
            onAddBidPrompt={() => setActiveTab('IPOS')}
            onCheckAllotment={() => setActiveTab('ALLOTMENT')}
          />
        )}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {[
          { id: 'IPOS', label: 'Issues', icon: 'layers-outline', activeIcon: 'layers' },
          { id: 'RADAR', label: 'GMP Radar', icon: 'trending-up-outline', activeIcon: 'trending-up' },
          { id: 'AI', label: 'Verdict', icon: 'document-text-outline', activeIcon: 'document-text' },
          { id: 'ALLOTMENT', label: 'Allotment', icon: 'shield-checkmark-outline', activeIcon: 'shield-checkmark' },
          { id: 'BIDS', label: 'Portfolio', icon: 'wallet-outline', activeIcon: 'wallet' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id as any)}
              style={styles.tabBtn}
              activeOpacity={0.7}
            >
              <Ionicons
                name={(isActive ? tab.activeIcon : tab.icon) as any}
                size={18}
                color={isActive ? '#ffffff' : '#71717a'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Modals */}
      <AiAnalysisModal
        ipo={selectedAiIpo}
        onClose={() => setSelectedAiIpo(null)}
      />
      <BidCalculatorModal
        ipo={selectedCalcIpo}
        onClose={() => setSelectedCalcIpo(null)}
        onSaveBid={handleSaveBid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090a0f',
    paddingTop: Platform.OS === 'android' ? 26 : 0,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#090a0f',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1d28',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#151822',
    borderWidth: 1,
    borderColor: '#252b3d',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.5,
    fontFamily: 'monospace',
  },
  liveTag: {
    backgroundColor: '#181b26',
    borderWidth: 1,
    borderColor: '#2e3447',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 6,
  },
  liveTagText: {
    color: '#a1a1aa',
    fontSize: 8,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  marketSub: {
    color: '#71717a',
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'monospace',
    marginTop: 1,
  },
  notifBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#151822',
    borderWidth: 1,
    borderColor: '#252b3d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#0c0e14',
    borderTopWidth: 1,
    borderTopColor: '#1c202d',
    paddingVertical: 5,
    paddingHorizontal: 6,
    justifyContent: 'space-around',
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    flex: 1,
  },
  tabLabel: {
    color: '#71717a',
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#ffffff',
  },
});
