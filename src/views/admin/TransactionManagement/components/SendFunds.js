import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from 'components/card/Card';

// Sample asset types
const assetTypes = ['Bitcoin', 'Ethereum', 'Tether', 'Binance Coin', 'Cardano'];

// Validation schema
const schema = yup.object().shape({
  recipientAddress: yup.string().required('Recipient address is required'),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  assetType: yup.string().required('Asset type is required'),
  transactionFee: yup.number().required('Transaction fee is required').positive('Transaction fee must be positive'),
});

const SendFunds = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [formData, setFormData] = useState({});

  const onSubmit = (data) => {
    setFormData(data);
    onOpen();
  };

  const handleConfirm = () => {
    // Simulate API call for sending funds
    toast({
      title: 'Funds Sent',
      description: `Successfully sent ${formData.amount} ${formData.assetType} to ${formData.recipientAddress}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onClose();
    reset();
  };

  return (
    <Card>
      <Box p={4}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Send Funds 💸
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.recipientAddress}>
              <FormLabel>Recipient Address</FormLabel>
              <Input {...register('recipientAddress')} />
              <Text color="red.500">{errors.recipientAddress?.message}</Text>
            </FormControl>
            <FormControl isInvalid={errors.amount}>
              <FormLabel>Amount</FormLabel>
              <Input type="number" step="0.01" {...register('amount')} />
              <Text color="red.500">{errors.amount?.message}</Text>
            </FormControl>
            <FormControl isInvalid={errors.assetType}>
              <FormLabel>Asset Type</FormLabel>
              <Select {...register('assetType')}>
                {assetTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </Select>
              <Text color="red.500">{errors.assetType?.message}</Text>
            </FormControl>
            <FormControl isInvalid={errors.transactionFee}>
              <FormLabel>Transaction Fee</FormLabel>
              <Input type="number" step="0.01" {...register('transactionFee')} />
              <Text color="red.500">{errors.transactionFee?.message}</Text>
            </FormControl>
            <Button colorScheme="blue" type="submit">Send Funds</Button>
          </VStack>
        </form>
      </Box>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Transaction</ModalHeader>
          <ModalBody>
            <Text>Recipient Address: {formData.recipientAddress}</Text>
            <Text>Amount: {formData.amount} {formData.assetType}</Text>
            <Text>Transaction Fee: {formData.transactionFee}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default SendFunds;
