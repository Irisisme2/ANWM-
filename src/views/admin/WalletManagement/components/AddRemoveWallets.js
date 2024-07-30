import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Alert,
  AlertIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  InputGroup,
  InputLeftElement,
  Flex,
  Tag,
  TagCloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Card from 'components/card/Card'; // Adjust the import path as needed
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete, AiOutlineExport } from 'react-icons/ai';

// Sample wallet types and initial data
const walletTypes = [
  'Hardware Wallet',
  'Software Wallet',
  'Paper Wallet',
  'Mobile Wallet',
  'Web Wallet',
];

const sampleWallets = [
  { id: '1', name: 'Ledger Nano X', type: 'Hardware Wallet', publicKey: 'abcd1234', history: ['Added', 'Updated'] },
  { id: '2', name: 'MetaMask', type: 'Software Wallet', publicKey: 'efgh5678', history: ['Added'] },
  // More sample wallets
];

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Wallet name is required'),
  type: yup.string().required('Wallet type is required'),
  publicKey: yup.string().required('Public key is required').matches(/^[A-Fa-f0-9]{64}$/, 'Invalid public key format'),
});

const AddRemoveWallets = () => {
  const [wallets, setWallets] = useState(sampleWallets);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const toast = useToast();

  const onAddSubmit = async (data) => {
    try {
      // Simulate API call to add wallet
      const response = await axios.post('/api/wallets', data);
      setWallets([...wallets, { ...data, id: response.data.id, history: ['Added'] }]);
      reset();
      onAddClose();
      toast({
        title: 'Wallet Added',
        description: `Wallet ${data.name} has been added successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error Adding Wallet',
        description: 'There was an error adding the wallet. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onEditSubmit = async (data) => {
    try {
      // Simulate API call to update wallet
      const response = await axios.put(`/api/wallets/${selectedWallet.id}`, data);
      setWallets(wallets.map(wallet =>
        wallet.id === selectedWallet.id ? { ...data, id: wallet.id, history: [...wallet.history, 'Updated'] } : wallet
      ));
      reset();
      onEditClose();
      toast({
        title: 'Wallet Updated',
        description: `Wallet ${data.name} has been updated successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error Updating Wallet',
        description: 'There was an error updating the wallet. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onRemoveSubmit = async () => {
    try {
      // Simulate API call to remove wallet
      await axios.delete(`/api/wallets/${selectedWallet}`);
      setWallets(wallets.filter(wallet => wallet.id !== selectedWallet));
      setSelectedWallet(null);
      onRemoveClose();
      toast({
        title: 'Wallet Removed',
        description: `Wallet with ID ${selectedWallet} has been removed.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error Removing Wallet',
        description: 'There was an error removing the wallet. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditOpen = (wallet) => {
    setSelectedWallet(wallet);
    reset({
      name: wallet.name,
      type: wallet.type,
      publicKey: wallet.publicKey,
    });
    setEditMode(true);
    onEditOpen();
  };

  const handleFilter = () => {
    // Apply filter to wallets
    setWallets(sampleWallets.filter(wallet => (filterType === 'All' || wallet.type === filterType) &&
      wallet.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleExport = () => {
    // Convert wallets data to CSV format and trigger download
    const csvContent = "data:text/csv;charset=utf-8," +
      "ID,Name,Type,Public Key\n" +
      wallets.map(wallet => `${wallet.id},${wallet.name},${wallet.type},${wallet.publicKey}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wallets_data.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  };

  return (
    <Card>
      <Box p={4}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Add/Remove Wallets ➕➖
        </Text>

        <Flex mb={4} alignItems="center">
          <InputGroup mr={4}>
            <InputLeftElement pointerEvents="none">
              <AiOutlineSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search by wallet name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
            />
          </InputGroup>
          <Select
            placeholder="Filter by type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            mr={4}
          >
            <option value="All">All</option>
            {walletTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </Select>
          <Button colorScheme="teal" onClick={handleFilter}>
            Apply Filter
          </Button>
          <Button colorScheme="teal" onClick={handleExport} ml={4} leftIcon={<AiOutlineExport />}>
            Export to CSV
          </Button>
        </Flex>

        <Stack spacing={4}>
          <Button colorScheme="blue" onClick={onAddOpen}>
            Add Wallet
          </Button>
          <Button colorScheme="red" onClick={onRemoveOpen}>
            Remove Wallet
          </Button>
        </Stack>

        {/* Wallet Table */}
        <Box mt={4}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Public Key</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {wallets.map(wallet => (
                <Tr key={wallet.id}>
                  <Td>{wallet.id}</Td>
                  <Td>{wallet.name}</Td>
                  <Td>{wallet.type}</Td>
                  <Td>{wallet.publicKey}</Td>
                  <Td>
                    <HStack spacing={4}>
                      <IconButton
                        aria-label="Edit"
                        icon={<AiOutlineEdit />}
                        colorScheme="yellow"
                        onClick={() => handleEditOpen(wallet)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<AiOutlineDelete />}
                        colorScheme="red"
                        onClick={() => { setSelectedWallet(wallet.id); onRemoveOpen(); }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Add Wallet Modal */}
        <Modal isOpen={isAddOpen} onClose={onAddClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Wallet</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onAddSubmit)}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Wallet Name</FormLabel>
                  <Input {...register('name')} />
                  <Text color="red.500">{errors.name?.message}</Text>
                </FormControl>
                <FormControl isInvalid={!!errors.type}>
                  <FormLabel>Wallet Type</FormLabel>
                  <Select {...register('type')}>
                    {walletTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Select>
                  <Text color="red.500">{errors.type?.message}</Text>
                </FormControl>
                <FormControl isInvalid={!!errors.publicKey}>
                  <FormLabel>Public Key</FormLabel>
                  <Input {...register('publicKey')} />
                  <Text color="red.500">{errors.publicKey?.message}</Text>
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit">Add Wallet</Button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onAddClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Edit Wallet Modal */}
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Wallet</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onEditSubmit)}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Wallet Name</FormLabel>
                  <Input {...register('name')} />
                  <Text color="red.500">{errors.name?.message}</Text>
                </FormControl>
                <FormControl isInvalid={!!errors.type}>
                  <FormLabel>Wallet Type</FormLabel>
                  <Select {...register('type')}>
                    {walletTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Select>
                  <Text color="red.500">{errors.type?.message}</Text>
                </FormControl>
                <FormControl isInvalid={!!errors.publicKey}>
                  <FormLabel>Public Key</FormLabel>
                  <Input {...register('publicKey')} />
                  <Text color="red.500">{errors.publicKey?.message}</Text>
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit">Update Wallet</Button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onEditClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Remove Wallet Modal */}
        <Modal isOpen={isRemoveOpen} onClose={onRemoveClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Remove Wallet</ModalHeader>
            <ModalBody>
              <Text>Are you sure you want to remove the selected wallet?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={onRemoveSubmit}>Remove</Button>
              <Button colorScheme="blue" onClick={onRemoveClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Card>
  );
};

export default AddRemoveWallets;
