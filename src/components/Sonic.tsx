import { Button, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import orbis from '@/orbis.client';

interface SonicProps {
  context: string;
}

interface PostForm {
  content: string;
}

export const Sonic: React.FC<SonicProps> = ({ context }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostForm>();

  const addComment = (data: PostForm) => {
    console.log('add comment:', data);

    orbis.createPost({
      body: data.content,
      context: context
    });
  };

  return (
    <VStack gap={8}>
      <Text>Context: {context}</Text>
      <VStack gap={8} as="form">
        <FormControl isRequired isInvalid={errors.content ? true : false}>
          <FormLabel>Post Content</FormLabel>
          <Input {...register('content', { required: true })} />
          {errors.content && <FormErrorMessage>{errors.content?.message}</FormErrorMessage>}
        </FormControl>

        <Button type="submit" onClick={handleSubmit(addComment)}>
          Add Comment
        </Button>
      </VStack>
    </VStack>
  );
};
