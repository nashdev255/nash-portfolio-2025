import { useState } from 'react';
import { motion } from "framer-motion";
import Post from './Post';

interface PostData {
  slug: string;
  data: {
    title: string;
    pubDate: Date;
    description?: string;
    tags?: string[];
  };
}

interface PostsListProps {
  posts: PostData[];
}

const PostsList = ({ posts }: PostsListProps) => {
  return (
    <section className="py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 tracking-tight">
            Posts
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Here is a list of my articles.
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {posts.map((post, index) => (
            <Post post={post} index={index}></Post>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostsList;
