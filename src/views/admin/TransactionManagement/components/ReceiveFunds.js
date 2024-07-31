import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack, HStack, useToast } from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';
import Card from 'components/card/Card';

const ReceiveFunds = () => {
  const [receiveAddress, setReceiveAddress] = useState('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
  const [label, setLabel] = useState('');
  const [addressHistory, setAddressHistory] = useState([]);
  const toast = useToast();

  const generateNewAddress = () => {
    const newAddress = '1NewFakeBitcoinAddress1234567890'; // Replace with address generation logic
    setAddressHistory([...addressHistory, { address: receiveAddress, label }]);
    setReceiveAddress(newAddress);
    setLabel('');
  };

  const handleCopy = () => {
    toast({
      title: 'Address copied.',
      description: 'Receive address has been copied to your clipboard.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Card>
      <VStack spacing={4} align="start">
        <Text fontSize="lg" fontWeight="bold">
          Receive Funds 📩
        </Text>
        <HStack spacing={4} align="start">
          <QRCode value={receiveAddress} />
          <VStack align="start">
            <Text>Receive Address:</Text>
            <HStack>
              <Input value={receiveAddress} isReadOnly />
              <CopyToClipboard text={receiveAddress} onCopy={handleCopy}>
                <Button>Copy</Button>
              </CopyToClipboard>
            </HStack>
          </VStack>
        </HStack>
        <VStack align="start" spacing={2}>
          <Text>Label (optional):</Text>
          <Input
            placeholder="Enter label for this address"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <Button onClick={generateNewAddress}>Generate New Address</Button>
        </VStack>
        <VStack align="start" spacing={2}>
          <Text>Address History:</Text>
          {addressHistory.length === 0 ? (
            <Text>No previous addresses</Text>
          ) : (
            addressHistory.map((entry, index) => (
              <HStack key={index} spacing={4}>
                <Text>{entry.address}</Text>
                {entry.label && <Text>({entry.label})</Text>}
              </HStack>
            ))
          )}
        </VStack>
      </VStack>
    </Card>
  );
};

export default ReceiveFunds;
