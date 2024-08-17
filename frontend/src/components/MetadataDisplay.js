import React from 'react';
import { Box, Heading, Text, Image, VStack } from '@chakra-ui/react';

const MetadataDisplay = ({ metadata }) => {
    return (
        <VStack spacing={5} mt={5}>
            {metadata.map((data, index) => (
                <Box
                    key={index}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="lg"
                    width="100%"
                    maxW="lg"
                    textAlign="left"
                >
                    <Heading fontSize="xl" mb={3}>{data.title || 'No title available'}</Heading>
                    <Text mb={3}>{data.description || 'No description available'}</Text>
                    {data.image && <Image src={data.image} alt={data.title} borderRadius="md" />}
                    {data.error && <Text color="red.500">Error: {data.error}</Text>}
                </Box>
            ))}
        </VStack>
    );
};

export default MetadataDisplay;
