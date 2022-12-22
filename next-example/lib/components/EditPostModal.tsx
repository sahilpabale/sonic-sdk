import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  IconButton,
  useDisclosure,
  VStack,
  FormControl,
  Textarea,
  FormErrorMessage
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit3 } from 'react-icons/fi';
import { useQueryClient } from 'react-query';
import orbis from '../orbis.client';

interface EditPostModalProps {
  streamId: string;
  previousContent: string;
}

interface PostForm {
  content: string;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ streamId, previousContent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostForm>({ defaultValues: { content: previousContent } });

  const [isEditingPost, setIsEditingPost] = useState(false);

  const queryClient = useQueryClient();

  const editComment = async (data: PostForm) => {
    setIsEditingPost(true);
    try {
      const res = await orbis.editPost(streamId, {
        body: data.content
      });

      if (!(res.status == 200)) {
        throw new Error('Error editing post');
      }

      await new Promise((r) => setTimeout(r, 2000));
      await queryClient.refetchQueries('posts');
    } catch (e) {
      console.error('Error editing post', e);
    } finally {
      setIsEditingPost(false);
      onClose();
    }
  };

  return (
    <Box>
      <IconButton aria-label="Edit Post" icon={<FiEdit3 />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="brand.secondary">
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={4}>
              <FormControl isRequired isInvalid={errors.content ? true : false}>
                <Textarea {...register('content', { required: true })} />
                {errors.content && <FormErrorMessage>{errors.content?.message}</FormErrorMessage>}
              </FormControl>
              <Button colorScheme="green" onClick={handleSubmit(editComment)} isLoading={isEditingPost}>
                Edit Post
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditPostModal;
