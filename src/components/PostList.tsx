// src/components/PostList.tsx (React)
import { useState } from "react";
import { motion } from "framer-motion";
import posts from "../data/posts.json";

const categories = ["All", "Achieve", "Tweet"];

export default function PostList() {
  const [selected, setSelected] = useState("All");

  const filtered = selected === "All" ? posts : posts.filter(p => p.type === selected);

  return (
    <div className="py-6 px-8 bg-gray-100 rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold">Recent Highlights✨</h2>

      <div className="flex gap-4 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full ${
              selected === cat ? "bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 font-bold" : "bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((post, idx) => (
          <motion.div
            key={`${selected}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ duration: 0.4 }}
            className="rounded-lg py-1"
          >
            <p className="text-sm text-gray-500">{post.date}</p>
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            {post.link && <a href={post.link}></a>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
