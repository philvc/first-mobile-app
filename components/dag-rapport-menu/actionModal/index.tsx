// modules
import * as React from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ActionModal({ closeModal }: any) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Download in Pdf</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Submit for review</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => closeModal()}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    height: '80%',
    borderRadius: 8,
  },
  modalContent: {
    borderWidth: 0,
    height: '100%',
    justifyContent: 'space-between',
  },
  actionContainer: {
    borderWidth: 0,
    height: '80%',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    backgroundColor: 'rgba(0, 122, 255, 0.12)',
    color: 'rgb(0, 122, 255)',
    padding: 15,
    borderRadius: 8,
  },
})