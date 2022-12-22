import { FormControl, FormErrorMessage, Text, Textarea, VStack, Button, Popover, PopoverTrigger, PopoverContent, PopoverBody, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Image } from '@davatar/react';
import { useForm } from 'react-hook-form';
import orbis from '../orbis.client';
import { useQueryClient } from 'react-query';
import { truncateDid } from '../utils/truncate';
import { userAtom } from '../state';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface AddReplyProps {
  context: string;
  master?: string;
}
interface PostForm {
  content: string;
}

export const AddPost: React.FC<AddReplyProps> = ({ master, context }) => {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
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
        reply_to: master ?? null,
        master: master ?? null
      });

      if (!(res.status == 200)) {
        throw new Error('Error creating post');
      }

      await new Promise((r) => setTimeout(r, 2000));
      await queryClient.refetchQueries('posts');
      if (master) {
        await queryClient.refetchQueries(`replies-${master}`);
      }
    } catch (e) {
      console.error('Error creating post', e);
    } finally {
      setIsAddinPost(false);
    }
  };

  const logout = async () => {
    try {
      await orbis.logout();
      setUser({});
    } catch (e) {
      console.log('logout error');
    }
  };
  return (
    <VStack gap={4} w="full" as="form" alignItems="end">
      <HStack spacing="4" w="full" alignItems="start">
        <Popover>
          <PopoverTrigger>
            <button>
              <Image uri={user.profile?.pfp as string} size={45} />
            </button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverBody as={VStack} gap={4}>
              {user?.profile?.username && (
                <Text fontSize="xl" fontWeight="bold">
                  <Text as="span" fontSize="md" fontWeight="normal">
                    Logged in as
                  </Text>{' '}
                  <br />
                  {user.profile.username} ({truncateDid(user.did as string)})
                </Text>
              )}

              <Button onClick={logout} colorScheme="red">
                Logout
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <FormControl isRequired isInvalid={errors.content ? true : false}>
          <Textarea {...register('content', { required: true })} placeholder={master ? 'Your Reply' : 'Your Comment'} />
          {errors.content && <FormErrorMessage>{errors.content?.message}</FormErrorMessage>}
        </FormControl>
      </HStack>
      <Button type="submit" onClick={handleSubmit(addComment)} isLoading={isAddingPost} colorScheme="yellow">
        Add {master ? 'Reply' : 'Comment'}
      </Button>
    </VStack>
  );
};
