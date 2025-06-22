import { motion } from "framer-motion";

interface PostProps {
  post: {
    slug: string;
    data: {
      title: string;
      pubDate: Date;
      description?: string;
      tags?: string[];
    };
  };
  index: number;
}

const Post = ({ post, index }: PostProps) => {
  return (
    <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="group relative"
    >
      <a href={`/nash-portfolio-2025/posts/${post.slug}`}>
        <div className="rounded-xl bg-gradient-to-r from-green-400 via-green-300 to-blue-300 p-2">
          <div className="flex flex-col justify-between h-50 md:h-70 relative overflow-hidden rounded-xl shadow bg-white border-gray-400/80 px-6 py-4">
            <div className="flex flex-col items-start space-y-1 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 transition-colors">
                {post.data.title}
              </h3>
              <time className="text-sm text-gray-500 whitespace-nowrap">
                {new Date(post.data.pubDate).toLocaleDateString('ja-JP')}
              </time>
            </div>
            <div className="flex space-x-2">
              {post.data.tags?.map(tag => (
                <p className="text-blue-700 text-sm bg-blue-200/50 px-2 py-0.5 rounded-sm">{tag}</p>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  )
}

export default Post;
