import {
  StyleSheet,
  Text,
  View, 
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import { color } from '../constants/color';
import InputBox from '../components/InputBox';
import { scaleSize } from '../utils/dimensions';
import FlatButton from '../components/FlatButton';

const Payment = () => {
  const [cvv, setCvv] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [amount, setAmount] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const handlePayment = () => {
     Alert.alert('Payment Successful', `Amount: $${amount}`);
  };

  return (
    <View style={styles.container}>
      <Header title="Payment" />
      <ScrollView>
        <View style={styles.formContainer}>
           <View style={styles.billingContainer}>
            <Text
              style={{
                color: color.black,
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: 12,
              }}>
              Billing Information
            </Text>
            <Text style={styles.label}>Billing Address</Text>
            <InputBox
              placeholder="Enter billing address"
              value={billingAddress}
              onChangeText={setBillingAddress}
            />

            <Text style={styles.label}>City</Text>
            <InputBox
              placeholder="Enter city"
              value={city}
              onChangeText={setCity}
            />

            <View style={styles.row}>
              <View style={styles.flex}>
                <Text style={styles.label}>State</Text>
                <InputBox
                  placeholder="Enter state"
                  value={state}
                  onChangeText={setState}
                />
              </View>

              <View style={styles.flex}>
                <Text style={styles.label}>ZIP Code</Text>
                <InputBox
                  placeholder="Enter ZIP code"
                  keyboardType="numeric"
                  value={zipCode}
                  onChangeText={setZipCode}
                />
              </View>
            </View>
          </View>
          <Text style={styles.label}>Amount</Text>
          <InputBox
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.label}>Card Number</Text>
          <InputBox
            placeholder="Enter card number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <View style={styles.row}>
            <View style={styles.flex}>
              <Text style={styles.label}>Expiry Date</Text>
              <InputBox
                placeholder="MM/YY"
                keyboardType="numeric"
                value={expiryDate}
                onChangeText={setExpiryDate}
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.label}>CVV</Text>
              <InputBox
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>
          <FlatButton
            onPress={() => {}}
            text={'Pay Now'}
            containerStyle={styles.registerButton}
          />
          {/* <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.f8f9fa,  
  },
  formContainer: {
    padding: 20,
    backgroundColor:color.white,
    borderRadius: 10,
    margin: 20,
    elevation: 5,  
    shadowColor: color.black,  
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  flex: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: color.bluePrimary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color:color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  billingContainer: {
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: color.lightRuby,
    paddingVertical: scaleSize(16),
    borderRadius: scaleSize(12),
    marginTop: scaleSize(24),
  },
});

export default Payment;
