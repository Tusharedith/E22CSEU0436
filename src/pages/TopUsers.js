// pages/TopUsers.js
import { useState, useEffect, useMemo } from 'react';

export default function TopUsers() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch('https://test-server/api/users'),
          fetch('https://test-server/api/posts')
        ]);
        
        setUsers(await usersRes.json());
        setPosts(await postsRes.json());
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

  const topUsers = useMemo(() => {
    const postCounts = posts.reduce((acc, post) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    }, {});

    return users
      .map(user => ({
        ...user,
        postCount: postCounts[user.id] || 0
      }))
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);
  }, [users, posts]);

  if (isLoading) return <div>Loading top users...</div>;

  return (
    <div className="grid gap-4">
      {topUsers.map(user => (
        <div key={user.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-gray-600">
                {user.postCount} posts
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}