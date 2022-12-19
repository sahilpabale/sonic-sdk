import orbis from '../orbis.client';

/*
 * Fetches posts from the Orbis API
 * @param {string} context - The context to fetch posts from
 * @param {string} master - The master to fetch comments from
 * @returns {Promise} - A promise that resolves to an array of posts
 */

export const fetchPosts = async (context: string) => {
  const posts = await orbis.getPosts({ context });
  console.log('posts', posts.data);
  return posts.data;
};

const fetchPost = async (master: string) => {
  const { data } = await orbis.getPost(master);
  return data;
};

export const fetchReplies = async (master: string) => {
  const { data } = await orbis.getPosts({ master });
  const masterPost = await fetchPost(master);
  return { replies: data, masterPost };
};
