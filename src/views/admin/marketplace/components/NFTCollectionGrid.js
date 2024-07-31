import React, { useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Select,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';

// Sample NFT data
const sampleNfts = [
  { id: 1, image: Nft1, name: 'NFT #1', creator: 'Creator A', rarity: 'Rare', value: 500, details: 'This is a rare NFT created by Creator A.' },
  { id: 2, image: Nft2, name: 'NFT #2', creator: 'Creator B', rarity: 'Common', value: 150, details: 'This is a common NFT created by Creator B.' },
  { id: 3, image: Nft3, name: 'NFT #3', creator: 'Creator A', rarity: 'Epic', value: 1200, details: 'This is an epic NFT created by Creator A.' },
  { id: 4, image: Nft4, name: 'NFT #4', creator: 'Creator C', rarity: 'Legendary', value: 2500, details: 'This is a legendary NFT created by Creator C.' },
  { id: 5, image: Nft5, name: 'NFT #5', creator: 'Creator B', rarity: 'Uncommon', value: 300, details: 'This is an uncommon NFT created by Creator B.' },
  { id: 6, image: Nft6, name: 'NFT #6', creator: 'Creator D', rarity: 'Rare', value: 750, details: 'This is a rare NFT created by Creator D.' },
];

const NFTCollectionGrid = () => {
  const [nfts, setNfts] = useState(sampleNfts);
  const [sortOrder, setSortOrder] = useState('value');
  const [filterRarity, setFilterRarity] = useState('');
  const [selectedNft, setSelectedNft] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Sorting function
  const sortNfts = (order) => {
    const sortedNfts = [...nfts].sort((a, b) => (order === 'value' ? b.value - a.value : new Date(b.date) - new Date(a.date)));
    setNfts(sortedNfts);
  };

  // Filter NFTs based on rarity
  const filterNfts = (rarity) => {
    if (rarity === '') {
      setNfts(sampleNfts);
    } else {
      setNfts(sampleNfts.filter(nft => nft.rarity === rarity));
    }
  };

  // Handle changes in filters and sorting
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    sortNfts(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterRarity(value);
    filterNfts(value);
  };

  // Handle view details click
  const handleViewDetails = (nft) => {
    setSelectedNft(nft);
    onOpen();
  };

  return (
    <>
      <Card>
        <Box p={4}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
            NFT Collection Grid
          </Text>
          <Flex mb={4} flexDirection={{ base: 'column', md: 'row' }} gap={4}>
            <Select placeholder="Sort by" value={sortOrder} onChange={handleSortChange} width="200px">
              <option value="value">Value</option>
              <option value="date">Date</option>
            </Select>
            <Select placeholder="Filter by Rarity" value={filterRarity} onChange={handleFilterChange} width="200px">
              <option value="">All</option>
              <option value="Rare">Rare</option>
              <option value="Common">Common</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Epic">Epic</option>
              <option value="Legendary">Legendary</option>
            </Select>
          </Flex>
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {nfts.map(nft => (
              <Box key={nft.id} p={4} borderWidth={1} borderRadius="md" boxShadow="md" textAlign="center">
                <Image src={nft.image} alt={nft.name} borderRadius="md" mb={2} />
                <Text fontWeight="bold">{nft.name}</Text>
                <Text>Creator: {nft.creator}</Text>
                <Text>Rarity: {nft.rarity}</Text>
                <Text>Value: ${nft.value}</Text>
                <Button mt={4} colorScheme="blue" onClick={() => handleViewDetails(nft)}>View Details</Button>
              </Box>
            ))}
          </Grid>
        </Box>
      </Card>

      {/* Modal for NFT Details */}
      {selectedNft && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedNft.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={selectedNft.image} alt={selectedNft.name} borderRadius="md" mb={4} />
              <Text><strong>Creator:</strong> {selectedNft.creator}</Text>
              <Text><strong>Rarity:</strong> {selectedNft.rarity}</Text>
              <Text><strong>Value:</strong> ${selectedNft.value}</Text>
              <Text mt={4}><strong>Details:</strong> {selectedNft.details}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default NFTCollectionGrid;
