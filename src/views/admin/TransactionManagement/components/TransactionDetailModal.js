import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Button } from '@chakra-ui/react';

const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text><strong>Date:</strong> {transaction.date}</Text>
          <Text><strong>Sender Address:</strong> {transaction.senderAddress}</Text>
          <Text><strong>Amount:</strong> {transaction.amount}</Text>
          <Text><strong>Status:</strong> {transaction.status}</Text>
          {/* You can add more detailed information here if needed */}
        </ModalBody>
        <Button colorScheme="teal" onClick={onClose}>Close</Button>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailModal;
