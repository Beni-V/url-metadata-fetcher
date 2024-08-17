import React, { useState } from 'react';
import { Box, Button, Input, VStack, HStack, IconButton, FormControl, FormLabel } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const UrlInputForm = ({ onSubmit }) => {
    const [urls, setUrls] = useState(['']);
    const [error, setError] = useState('');

    const handleChange = (index, value) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
    };

    const addUrlField = () => {
        setUrls([...urls, '']);
    };

    const removeUrlField = (index) => {
        const newUrls = urls.filter((_, idx) => idx !== index);
        setUrls(newUrls);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validUrls = urls.filter(url => url.trim() !== '');
        if (validUrls.length < 3) {
            setError('Please provide at least 3 valid URLs.');
        } else {
            setError('');
            onSubmit(validUrls);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={5} borderWidth="1px" borderRadius="lg">
            <FormControl isInvalid={!!error}>
                <FormLabel>Enter URLs</FormLabel>
                <VStack spacing={3} align="stretch">
                    {urls.map((url, index) => (
                        <HStack key={index}>
                            <Input
                                placeholder={`URL ${index + 1}`}
                                value={url}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                            <IconButton
                                icon={<MinusIcon />}
                                onClick={() => removeUrlField(index)}
                                aria-label="Remove URL"
                                colorScheme="red"
                                isDisabled={urls.length <= 1}
                            />
                        </HStack>
                    ))}
                    <Button onClick={addUrlField} leftIcon={<AddIcon />} colorScheme="teal">
                        Add URL
                    </Button>
                </VStack>
                {error && <Box color="red.500" mt={3}>{error}</Box>}
                <Button type="submit" colorScheme="blue" mt={4}>
                    Submit
                </Button>
            </FormControl>
        </Box>
    );
};

export default UrlInputForm;
