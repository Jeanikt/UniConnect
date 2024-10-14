"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Repeat,
  Share,
  Edit,
  Check,
  X,
} from "lucide-react";

interface Post {
  id: number;
  content: string;
  author: string;
  username: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
}

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
  posts: number;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Jean",
    username: "@jean",
    bio: "Vasco Porra",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    followers: 1000,
    following: 500,
    posts: 250,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [reposts, setReposts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  useEffect(() => {
    // Fetch user profile data
    // For now, we'll use the mock data set in the initial state

    // Fetch posts and reposts
    const mockPosts: Post[] = [
      {
        id: 1,
        content: "Just finished a great book on machine learning!",
        author: "Jean",
        username: "@jean",
        timestamp: "2h ago",
        likes: 15,
        comments: 3,
        reposts: 5,
      },
      {
        id: 2,
        content: "Excited for the upcoming tech conference!",
        author: "Jean",
        username: "@jean",
        timestamp: "1d ago",
        likes: 32,
        comments: 7,
        reposts: 12,
      },
    ];
    setPosts(mockPosts);

    const mockReposts: Post[] = [
      {
        id: 3,
        content: "New breakthrough in quantum computing!",
        author: "Tech News",
        username: "@technews",
        timestamp: "5h ago",
        likes: 45,
        comments: 8,
        reposts: 20,
      },
    ];
    setReposts(mockReposts);
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // Here you would typically send the updated profile to your backend
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={profile.avatarUrl} alt={post.author} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <span className="font-bold">{post.author}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {post.username}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                · {post.timestamp}
              </span>
            </div>
            <p className="mt-1 mb-2">{post.content}</p>
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <button
                className="flex items-center space-x-2 hover:text-blue-500"
                aria-label="Comment"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button
                className="flex items-center space-x-2 hover:text-green-500"
                aria-label="Repost"
              >
                <Repeat className="w-5 h-5" />
                <span>{post.reposts}</span>
              </button>
              <button
                className="flex items-center space-x-2 hover:text-red-500"
                aria-label="Like"
              >
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button
                className="flex items-center space-x-2 hover:text-blue-500"
                aria-label="Share"
              >
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout onPostCreated={() => {}}>
      <div className="max-w-4xl mx-auto p-4">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-grow text-center md:text-left">
                {isEditing ? (
                  <Input
                    value={editedProfile.name}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        name: e.target.value,
                      })
                    }
                    className="mb-2"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                )}
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  {profile.username}
                </p>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.bio}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        bio: e.target.value,
                      })
                    }
                    className="mb-2"
                  />
                ) : (
                  <p className="mb-4">{profile.bio}</p>
                )}
                <div className="flex justify-center md:justify-start space-x-4 mb-4">
                  <span>{profile.followers} Followers</span>
                  <span>{profile.following} Following</span>
                  <span>{profile.posts} Posts</span>
                </div>
                {isEditing ? (
                  <div className="space-x-2">
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleEditProfile}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="reposts">Reposts</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
          <TabsContent value="reposts">
            {reposts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfilePage;
