// pages/Feed.js
import { useState, useEffect, useMemo } from 'react';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://test-server/api/posts');
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [posts]);

  if (isLoading) return <div>Loading feed...</div>;

  return (
    <div className="grid gap-6">
      {sortedPosts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${post.userId}&background=random`}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">User {post.userId}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <img
            src={`https://picsum.photos/seed/${post.id}/600/400`}
            alt="Post"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-800">{post.content}</p>
        </div>
      ))}
    </div>
  );
}