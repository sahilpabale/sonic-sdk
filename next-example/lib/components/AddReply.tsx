import { FormControl, FormErrorMessage, FormLabel, IconButton, HStack, Textarea, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import orbis from '../orbis.client';
import { useQuery, useQueryClient } from 'react-query';

interface AddReplyProps {
  master: string;
}
interface PostForm {
  reply: string;
}

export const AddReply: React.FC<AddReplyProps> = ({ master }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostForm>();

  const [isAddingReply, setIsAddingReply] = useState(false);

  const queryClient = useQueryClient();

  const fetchReplies = async () => {
    const posts = await orbis.getPosts({ master: master });
    return posts;
  };

  const { data: posts } = useQuery<IOrbisGetPosts>('replies', fetchReplies);

  const addComment = async (data: PostForm) => {
    setIsAddingReply(true);
    try {
      const res = await orbis.createPost({
        body: data.reply,
        master: master
      });

      if (!(res.status == 200)) {
        throw new Error('Error creating post');
      }

      await new Promise((r) => setTimeout(r, 2000));
      queryClient.refetchQueries('replies');
    } catch (e) {
      console.error('Error creating post', e);
    } finally {
      setIsAddingReply(false);
    }
  };
  return (
    <HStack>
      <FormControl isRequired isInvalid={errors.reply ? true : false}>
        <Input {...register('reply', { required: true })} placeholder="Reply to this comment" width="auto" />
        {errors.reply && <FormErrorMessage>{errors.reply?.message}</FormErrorMessage>}
      </FormControl>

      <IconButton aria-label="Reply" type="submit" onClick={handleSubmit(addComment)} isLoading={isAddingReply} icon={<IoSend />}></IconButton>
    </HStack>
  );
};
