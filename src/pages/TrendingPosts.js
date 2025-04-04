// pages/TrendingPosts.js
import { useState, useEffect, useMemo } from 'react';

export default function TrendingPosts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, commentsRes] = await Promise.all([
          fetch('https://test-server/api/posts'),
          fetch('https://test-server/api/comments')
        ]);
        
        setPosts(await postsRes.json());
        setComments(await commentsRes.json());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const trendingPosts = useMemo(() => {
    const commentCounts = comments.reduce((acc, comment) => {
      acc[comment.postId] = (acc[comment.postId] || 0) + 1;
      return acc;
    }, {});

    const postsWithComments = posts.map(post => ({
      ...post,
      commentCount: commentCounts[post.id] || 0
    }));

    const maxComments = Math.max(...postsWithComments.map(p => p.commentCount));
    return postsWithComments.filter(post => post.commentCount === maxComments);
  }, [posts, comments]);

  if (isLoading) return <div>Loading trending posts...</div>;

  return (
    <div className="grid gap-6">
      {trendingPosts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${post.userId}&background=random`}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">User {post.userId}</p>
            </div>
          </div>
          <img
            src={`https://picsum.photos/seed/${post.id}/600/400`}
            alt="Post"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-800 mb-4">{post.content}</p>
          <div className="flex items-center text-gray-600">
            <span className="mr-2">💬</span>
            {post.commentCount} comments
          </div>
        </div>
      ))}
    </div>
  );
}