import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Text,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineSend, AiOutlineTransaction, AiOutlineSetting } from 'react-icons/ai';
import Card from 'components/card/Card'; // Adjust the import path as needed

const QuickActions = () => {
  // States to control modals
  const { isOpen: isSendOpen, onOpen: onSendOpen, onClose: onSendClose } = useDisclosure();
  const { isOpen: isTransactionOpen, onOpen: onTransactionOpen, onClose: onTransactionClose } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  
  // Adjust button sizes based on screen size
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Box>
      <Card>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Quick Actions 🚀
          </Text>
          <Stack spacing={4} direction={{ base: 'column', md: 'row' }} align="center">
            <Button
              leftIcon={<AiOutlineSend />}
              colorScheme="teal"
              size={buttonSize}
              variant="solid"
              width={{ base: '100%', md: 'auto' }}
              onClick={onSendOpen}
            >
              Send/Receive Funds 💸
            </Button>
            <Button
              leftIcon={<AiOutlineTransaction />}
              colorScheme="teal"
              size={buttonSize}
              variant="solid"
              width={{ base: '100%', md: 'auto' }}
              onClick={onTransactionOpen}
            >
              Create Transaction ✍️
            </Button>
            <Button
              leftIcon={<AiOutlineSetting />}
              colorScheme="teal"
              size={buttonSize}
              variant="solid"
              width={{ base: '100%', md: 'auto' }}
              onClick={onSettingsOpen}
            >
              Access Wallet Settings ⚙️
            </Button>
          </Stack>
        </Box>
      </Card>

      {/* Send/Receive Funds Modal */}
      <Modal isOpen={isSendOpen} onClose={onSendClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send/Receive Funds</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Recipient Address</FormLabel>
              <Input placeholder="Enter recipient address" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Amount</FormLabel>
              <Input type="number" placeholder="Enter amount" />
            </FormControl>
            <Button colorScheme="teal" width="full">Submit</Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Create Transaction Modal */}
      <Modal isOpen={isTransactionOpen} onClose={onTransactionClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Transaction Type</FormLabel>
              <Select placeholder="Select transaction type">
                <option value="send">Send</option>
                <option value="receive">Receive</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Enter transaction description" />
            </FormControl>
            <Button colorScheme="teal" width="full">Submit</Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Access Wallet Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wallet Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Current Password</FormLabel>
              <Input type="password" placeholder="Enter current password" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input type="password" placeholder="Enter new password" />
            </FormControl>
            <Button colorScheme="teal" width="full">Update Settings</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default QuickActions;
