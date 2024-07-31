import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Textarea,
  Image,
  FormControl,
  FormLabel,
  Flex,
  VStack,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Heading,
} from '@chakra-ui/react';
import Card from 'components/card/Card';

const MintNFT = ({ onMint }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState('');
  const [price, setPrice] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!name || !description || !image || !metadata || !price) {
      toast({
        title: 'Form Incomplete',
        description: 'Please fill out all fields and upload an image.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      toast({
        title: 'NFT Minted',
        description: 'Your NFT has been successfully minted!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onMint({ name, description, image: previewImage, metadata, price }); // Notify parent component
      // Reset form
      setName('');
      setDescription('');
      setImage(null);
      setMetadata('');
      setPrice('');
      setPreviewImage(null);
    }, 3000); // Simulate minting process
  };

  return (
    <>
      <Card>
        <Box p={4}>
          <Heading as="h3" size="lg" mb={4} textAlign="center">
            Mint Your NFT
          </Heading>
          <FormControl mb={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter NFT name"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter NFT description"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="image">Image Upload</FormLabel>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewImage && (
              <Image src={previewImage} alt="NFT Preview" mt={4} borderRadius="md" boxShadow="md" />
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="metadata">Metadata</FormLabel>
            <Input
              id="metadata"
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              placeholder="Enter metadata (e.g., traits)"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter NFT price"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={onOpen} isDisabled={isMinting}>
            Mint NFT
          </Button>
          {isMinting && (
            <Flex mt={4} justifyContent="center">
              <Spinner size="lg" />
            </Flex>
          )}
        </Box>
      </Card>

      {/* Modal for Minting Confirmation */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Minting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text fontSize="lg">Name: {name}</Text>
              <Text fontSize="lg">Description: {description}</Text>
              <Text fontSize="lg">Metadata: {metadata}</Text>
              <Text fontSize="lg">Price: ${price}</Text>
              {previewImage && (
                <Image src={previewImage} alt="NFT Preview" borderRadius="md" boxShadow="md" />
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit} isLoading={isMinting}>
              Confirm Mint
            </Button>
            <Button ml={3} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MintNFT;
