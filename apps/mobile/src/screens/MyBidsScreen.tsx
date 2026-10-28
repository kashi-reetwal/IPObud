import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { UserBid, IPO } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface MyBidsScreenProps {
  bids: UserBid[];
  onAddBidPrompt: () => void;
  onCheckAllotment: (ipoId: string) => void;
}

export const MyBidsScreen: React.FC<MyBidsScreenProps> = ({
  bids,
  onAddBidPrompt,
  onCheckAllotment,
}) => {
  const totalBlockedCapital = bids.reduce(
    (sum, b) => sum + b.investmentAmount,
    0
  );
  const totalExpectedProfit = bids.reduce(
    (sum, b) => sum + b.expectedProfit,
    0
  );

  return (
    <View style={styles.container}>
      {/* Portfolio Performance Dashboard */}
      <View style={styles.portfolioCard}>
        <Text style={styles.cardHeaderLabel}>MY APPLIED IPO PORTFOLIO</Text>
        <View style={styles.kpiRow}>
          <View>
            <Text style={styles.kpiLabel}>Capital Blocked (UPI)</Text>
            <Text style={styles.kpiValue}>
              ₹{totalBlockedCapital.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.alignEnd}>
            <Text style={styles.kpiLabel}>Est. Listing Gains</Text>
            <Text style={styles.kpiGreen}>
              +₹{totalExpectedProfit.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        <View style={styles.pillsRow}>
          <View style={styles.pill}>
            <Ionicons name="documents-outline" size={12} color="#06b6d4" />
            <Text style={styles.pillText}>{bids.length} Active Applications</Text>
          </View>
          <View style={styles.pill}>
            <Ionicons name="time-outline" size={12} color="#10b981" />
            <Text style={styles.pillText}>Mandates Active</Text>
          </View>
        </View>
      </View>

      {/* List of Applications */}
      <FlatList
        data={bids}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.bidCard}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.bidSymbol}>{item.symbol}</Text>
                <Text style={styles.bidCompany}>{item.companyName}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  item.status === 'ALLOTTED'
                    ? styles.statusAllotted
                    : styles.statusPending,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    item.status === 'ALLOTTED'
                      ? styles.textAllotted
                      : styles.textPending,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.bidDetailsRow}>
              <View style={styles.detailCol}>
                <Text style={styles.detailLabel}>APPLIED</Text>
                <Text style={styles.detailVal}>
                  {item.lots} Lot ({item.totalShares} sh)
                </Text>
              </View>
              <View style={styles.detailCol}>
                <Text style={styles.detailLabel}>INVESTED</Text>
                <Text style={styles.detailVal}>
                  ₹{item.investmentAmount.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={styles.detailCol}>
                <Text style={styles.detailLabel}>EST. PROFIT</Text>
                <Text style={styles.detailGreen}>
                  +₹{item.expectedProfit.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.appliedDate}>Applied on {item.appliedDate}</Text>
              <TouchableOpacity
                onPress={() => onCheckAllotment(item.ipoId)}
                style={styles.checkBtn}
              >
                <Ionicons name="shield-checkmark" size={13} color="#06b6d4" />
                <Text style={styles.checkBtnText}>Check Allotment</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="wallet-outline" size={40} color="#334155" />
            <Text style={styles.emptyTitle}>No Applied Bids Recorded</Text>
            <Text style={styles.emptySub}>
              Use the Bid Calculator on any live IPO card to calculate your lots and save bids to your portfolio.
            </Text>
            <TouchableOpacity onPress={onAddBidPrompt} style={styles.addBtn}>
              <Text style={styles.addBtnText}>Explore Live IPOs</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070e',
  },
  portfolioCard: {
    backgroundColor: '#0c121e',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
  },
  cardHeaderLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  kpiLabel: {
    color: '#94a3b8',
    fontSize: 11,
  },
  kpiValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  kpiGreen: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  pillsRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#070a12',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  pillText: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  bidCard: {
    backgroundColor: '#0c121e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 14,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bidSymbol: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  bidCompany: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusPending: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  statusAllotted: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  textPending: {
    color: '#f59e0b',
  },
  textAllotted: {
    color: '#10b981',
  },
  bidDetailsRow: {
    flexDirection: 'row',
    backgroundColor: '#070a12',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  detailCol: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '700',
  },
  detailVal: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  detailGreen: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
    fontFamily: 'monospace',
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
  appliedDate: {
    color: '#64748b',
    fontSize: 10,
  },
  checkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  checkBtnText: {
    color: '#06b6d4',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  emptyCard: {
    alignItems: 'center',
    backgroundColor: '#0c121e',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    padding: 28,
    marginTop: 20,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 12,
  },
  emptySub: {
    color: '#64748b',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 16,
  },
  addBtn: {
    backgroundColor: '#06b6d4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
  },
  addBtnText: {
    color: '#05070e',
    fontSize: 12,
    fontWeight: '800',
  },
});
