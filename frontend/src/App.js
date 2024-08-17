import React from 'react';
import { ChakraProvider, Box, Heading, Container, Spinner, Center } from '@chakra-ui/react';
import UrlInputForm from './components/UrlInputForm';
import MetadataDisplay from './components/MetadataDisplay';
import useFetchMetadata from './hooks/useFetchMetadata';

const App = () => {
    const { metadata, error, loading, fetchMetadata } = useFetchMetadata();

    return (
        <ChakraProvider>
            <Container maxW="container.md" p={5}>
                <Heading textAlign="center" mb={6}>Metadata Fetcher</Heading>
                <Box borderWidth="1px" borderRadius="lg" p={6} shadow="md">
                    <UrlInputForm onSubmit={fetchMetadata} />
                    {loading ? (
                        <Center mt={4}>
                            <Spinner size="xl" />
                        </Center>
                    ) : (
                        <>
                            {error && <Box color="red.500" mt={4}>{error}</Box>}
                            <MetadataDisplay metadata={metadata} />
                        </>
                    )}
                </Box>
            </Container>
        </ChakraProvider>
    );
};

export default App;
