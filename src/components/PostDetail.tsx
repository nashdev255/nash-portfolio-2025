interface PostDetailProps {
  post: {
    slug: string;
    data: {
      title: string;
      pubDate: Date;
      description?: string;
      tags?: string[];
    };
  };
}

const PostDetail = ({ post }: PostDetailProps) => {
  return (
    <article>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {post.data.title}
        </h1>
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <time className="text-sm">
            {new Date(post.data.pubDate).toLocaleDateString('ja-JP')}
          </time>
          {post.data.tags && (
            <div className="flex space-x-2">
              {post.data.tags.map(tag => (
                <span key={tag} className="text-blue-700 text-sm bg-blue-200/50 px-2 py-1 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {post.data.description && (
          <p className="text-gray-700 text-lg leading-relaxed">
            {post.data.description}
          </p>
        )}
      </div>
    </article>
  );
};

export default PostDetail; 