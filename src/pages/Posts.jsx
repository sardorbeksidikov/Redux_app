import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getAllPosts = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setAllPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async (page, limit = 10) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
      );
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    getPosts(page);
  }, [page]);

  let items = [];
  let numOfPages = Math.ceil(allPosts.length / limit);

  for (let i = 1; i <= numOfPages; i++) {
    items.push(
      <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="container">
      <ul className="p-5">
        {posts.map((post) => (
          <li key={post.id}>
            {post.id}. {post.title}
          </li>
        ))}
      </ul>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );
};

export default Posts;
