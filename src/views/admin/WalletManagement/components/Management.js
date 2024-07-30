import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Box, Text, VStack } from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the import path as needed

const KeyManagement = () => {
  // Chakra UI modals management
  const { isOpen: isBiometricOpen, onOpen: onBiometricOpen, onClose: onBiometricClose } = useDisclosure();
  const { isOpen: isHSMOpen, onOpen: onHSMOpen, onClose: onHSMClose } = useDisclosure();

  return (
    <Card>
      <Box p={4}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
           Management 🔐
        </Text>
        
        <VStack spacing={4} align="stretch">
          {/* Biometric Settings Button */}
          <Button colorScheme="teal" onClick={onBiometricOpen}>
            Biometric Settings
          </Button>
          
          {/* HSM Integration Settings Button */}
          <Button colorScheme="teal" onClick={onHSMOpen}>
            HSM Integration Settings
          </Button>
        </VStack>
        
        {/* Biometric Settings Modal */}
        <Modal isOpen={isBiometricOpen} onClose={onBiometricClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Biometric Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="md" mb={4}>
                <strong>Enable/Disable Biometric Authentication:</strong>
              </Text>
              <Text mb={4}>
                Instructions on how to enable or disable fingerprint or facial recognition authentication. 
                Follow these steps to set up your biometric authentication:
              </Text>
              <ol>
                <li>Open your device settings.</li>
                <li>Go to Security & Privacy.</li>
                <li>Find Biometric Authentication.</li>
                <li>Follow the on-screen instructions to set up your fingerprint or facial recognition.</li>
              </ol>
              <Text mt={4} fontSize="sm" color="red.500">
                <strong>Note:</strong> Ensure that your biometric data is kept secure and private.
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* HSM Integration Settings Modal */}
        <Modal isOpen={isHSMOpen} onClose={onHSMClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>HSM Integration Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="md" mb={4}>
                <strong>Manage Hardware Security Modules (HSMs):</strong>
              </Text>
              <Text mb={4}>
                Integration guides, security status checks, and configuration options for hardware security modules.
                Follow these steps to manage your HSM settings:
              </Text>
              <ol>
                <li>Access your HSM management console.</li>
                <li>Check the status of connected HSMs.</li>
                <li>Configure HSM settings as needed.</li>
                <li>Review integration guides for specific instructions.</li>
              </ol>
              <Text mt={4} fontSize="sm" color="red.500">
                <strong>Note:</strong> Ensure proper configuration to maintain system security.
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Card>
  );
};

export default KeyManagement;

