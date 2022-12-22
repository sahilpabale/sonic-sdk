const randomPfp = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `https://avatars.dicebear.com/api/initials/0x.svg?b=%23${randomColor}&r=50&scale=107&backgroundColorLevel=700&fontSize=43&bold=true`;
};

export default randomPfp;
