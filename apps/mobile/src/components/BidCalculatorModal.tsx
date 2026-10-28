import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { IPO } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface BidCalculatorModalProps {
  ipo: IPO | null;
  onClose: () => void;
  onSaveBid?: (ipo: IPO, lots: number, amount: number, expectedProfit: number) => void;
}

export const BidCalculatorModal: React.FC<BidCalculatorModalProps> = ({
  ipo,
  onClose,
  onSaveBid,
}) => {
  const [lots, setLots] = useState(1);
  const [category, setCategory] = useState<'RETAIL' | 'sHNI' | 'bHNI'>('RETAIL');

  if (!ipo) return null;

  const totalShares = lots * ipo.lotSize;
  const investment = totalShares * ipo.priceBandHigh;
  const estimatedProfit = totalShares * ipo.currentGmp;
  const estTotalValue = investment + estimatedProfit;

  const handleSelectCategory = (cat: 'RETAIL' | 'sHNI' | 'bHNI') => {
    setCategory(cat);
    if (cat === 'sHNI') {
      const minHniLots = Math.ceil(200000 / (ipo.priceBandHigh * ipo.lotSize));
      setLots(minHniLots);
    } else if (cat === 'bHNI') {
      const minBHniLots = Math.ceil(1000000 / (ipo.priceBandHigh * ipo.lotSize));
      setLots(minBHniLots);
    } else {
      setLots(1);
    }
  };

  return (
    <Modal visible={!!ipo} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <Ionicons name="calculator" size={18} color="#06b6d4" />
              </View>
              <View>
                <Text style={styles.title}>Bid & P&L Calculator</Text>
                <Text style={styles.subtitle}>
                  {ipo.companyName} ({ipo.symbol})
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.body}>
            {/* Category Selector */}
            <Text style={styles.label}>INVESTOR QUOTA</Text>
            <View style={styles.catRow}>
              {[
                { id: 'RETAIL', label: 'Retail (≤₹2L)' },
                { id: 'sHNI', label: 'sHNI (₹2L-10L)' },
                { id: 'bHNI', label: 'bHNI (>₹10L)' },
              ].map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => handleSelectCategory(cat.id as any)}
                  style={[
                    styles.catBtn,
                    category === cat.id && styles.catBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.catBtnText,
                      category === cat.id && styles.catBtnTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Lots Stepper */}
            <View style={styles.lotsHeader}>
              <Text style={styles.label}>NUMBER OF LOTS</Text>
              <Text style={styles.sharesSubtext}>{totalShares} shares</Text>
            </View>
            <View style={styles.stepperRow}>
              <TouchableOpacity
                onPress={() => setLots(Math.max(1, lots - 1))}
                style={styles.stepBtn}
              >
                <Text style={styles.stepBtnText}>-</Text>
              </TouchableOpacity>
              <View style={styles.lotsInputBox}>
                <Text style={styles.lotsNum}>{lots}</Text>
                <Text style={styles.lotsUnit}>lots</Text>
              </View>
              <TouchableOpacity
                onPress={() => setLots(lots + 1)}
                style={styles.stepBtn}
              >
                <Text style={styles.stepBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Calculations Box */}
            <View style={styles.calcBox}>
              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Required Bid UPI Capital:</Text>
                <Text style={styles.calcVal}>₹{investment.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>Current GMP:</Text>
                <Text style={styles.greenText}>
                  +₹{ipo.currentGmp} / share ({ipo.gainPercentage}%)
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.calcRow}>
                <Text style={styles.profitLabel}>Est. Listing Profit (If Allotted):</Text>
                <Text style={styles.profitVal}>
                  +₹{estimatedProfit.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={styles.calcRow}>
                <Text style={styles.subtleText}>Est. Total Value:</Text>
                <Text style={styles.subtleText}>
                  ₹{estTotalValue.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>

            {/* Save to Portfolio */}
            <TouchableOpacity
              onPress={() => {
                if (onSaveBid) onSaveBid(ipo, lots, investment, estimatedProfit);
                onClose();
              }}
              style={styles.saveBtn}
            >
              <Ionicons name="checkmark-sharp" size={18} color="#05070e" />
              <Text style={styles.saveBtnText}>Save Bid to Portfolio</Text>
            </TouchableOpacity>
          </View>
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
  body: {
    marginTop: 14,
  },
  label: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  catRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  catBtn: {
    flex: 1,
    backgroundColor: '#070a12',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  catBtnActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: '#06b6d4',
  },
  catBtnText: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
  },
  catBtnTextActive: {
    color: '#06b6d4',
  },
  lotsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sharesSubtext: {
    color: '#06b6d4',
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  stepBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  lotsInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#070a12',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    height: 44,
    marginHorizontal: 12,
  },
  lotsNum: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  lotsUnit: {
    color: '#64748b',
    fontSize: 11,
    marginLeft: 6,
    fontWeight: '600',
  },
  calcBox: {
    backgroundColor: '#070a12',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    padding: 14,
    marginVertical: 12,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  calcLabel: {
    color: '#94a3b8',
    fontSize: 11,
  },
  calcVal: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  greenText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: 6,
  },
  profitLabel: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '700',
  },
  profitVal: {
    color: '#10b981',
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  subtleText: {
    color: '#64748b',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06b6d4',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 4,
  },
  saveBtnText: {
    color: '#05070e',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
  },
});
