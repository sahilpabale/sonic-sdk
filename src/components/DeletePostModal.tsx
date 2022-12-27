import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useQueryClient } from 'react-query';
import orbis from '../orbis.client';

interface DeletePostModalProps {
  streamId: string;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({ streamId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  const queryClient = useQueryClient();

  const deletePost = async () => {
    setIsDeletingPost(true);
    try {
      const res = await orbis.deletePost(streamId);

      if (!(res.status == 200)) {
        throw new Error('Error deleting post');
      }

      await new Promise((r) => setTimeout(r, 2000));
      await queryClient.refetchQueries('posts');
    } catch (e) {
      console.error('Error deleting post', e);
    } finally {
      setIsDeletingPost(false);
      onClose();
    }
  };

  return (
    <Box>
      <IconButton aria-label="Delete Post" icon={<FiTrash />} colorScheme="red" onClick={onOpen} />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent backgroundColor="brand.secondary">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deletePost} ml={3} isLoading={isDeletingPost}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default DeletePostModal;
