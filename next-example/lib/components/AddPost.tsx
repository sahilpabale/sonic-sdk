import { FormControl, FormErrorMessage, FormLabel, IconButton, HStack, Textarea, Input, VStack, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import orbis from '../orbis.client';
import { useQueryClient } from 'react-query';

interface AddReplyProps {
  context: string;
  master?: string;
}
interface PostForm {
  content: string;
}

export const AddPost: React.FC<AddReplyProps> = ({ master, context }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostForm>();

  const [isAddingPost, setIsAddinPost] = useState(false);

  const queryClient = useQueryClient();

  const addComment = async (data: PostForm) => {
    setIsAddinPost(true);
    try {
      const res = await orbis.createPost({
        body: data.content,
        context,
        master: master ?? null
      });

      if (!(res.status == 200)) {
        throw new Error('Error creating post');
      }

      await new Promise((r) => setTimeout(r, 2000));
      queryClient.refetchQueries('posts');
      if (master) {
        queryClient.refetchQueries(`replies-${master}`);
      }
    } catch (e) {
      console.error('Error creating post', e);
    } finally {
      setIsAddinPost(false);
    }
  };
  return (
    <VStack gap={4} w="full" as="form" alignItems="end">
      <FormControl isRequired isInvalid={errors.content ? true : false}>
        <Textarea {...register('content', { required: true })} placeholder={master ? 'Your Reply' : 'Your Comment'} />
        {errors.content && <FormErrorMessage>{errors.content?.message}</FormErrorMessage>}
      </FormControl>

      <Button type="submit" onClick={handleSubmit(addComment)} isLoading={isAddingPost}>
        Add {master ? 'Reply' : 'Comment'}
      </Button>
    </VStack>
  );
};
