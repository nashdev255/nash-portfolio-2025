// src/components/PostList.tsx (React)
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import posts from "../data/posts.json";

const categories = ["All", "Achieve", "Tweet"];

export default function PostList() {
  const [selected, setSelected] = useState("All");
  // const [items, setItems] = useState<number[]>([]);
  //   const [page, setPage] = useState(1);
  //   const loaderRef = useRef<HTMLDivElement | null>(null);
    
  //   useEffect(() => {
  //     const loadItems = async () => {
  //       const newItems = Array.from({ length: 10 }, (_, i) => (page-1) * 10 + i + 1 );
  //       setItems((prev) => [...prev, ...newItems]);
  //     };
  //     loadItems();
  //   }, [page]);
  
  //   useEffect(() => {
  //     const observer = new IntersectionObserver(([entry]) => {
  //       if ( entry.isIntersecting ) {
  //         setPage((prev) => prev + 1);
  //       }
  //     });
  
  //     if ( loaderRef.current ) {
  //       observer.observe(loaderRef.current);
  //     }
  
  //     return () => {
  //       if ( loaderRef.current ) observer.unobserve(loaderRef.current);
  //     };
  //   }, []);

  const filtered = selected === "All" ? posts : posts.filter(p => p.type === selected);

  return (
    <div className="py-6 px-8 rounded-2xl border border-gray-300/50 bg-gray-200/50 backdrop-blur-md shadow-2xl shadow-white/10 space-y-6">
      <h2 className="text-2xl font-bold">Recent Highlights✨</h2>

      <div className="flex gap-4 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-300 duration-75 ${
              selected === cat ? "text-white bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 font-bold" : "bg-white"
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
            {post.link && <a href={post.link} className="hover:underline text-sky-600">詳細を確認する</a>}
          </motion.div>
        ))}
      </div>
      {/* <div ref={loaderRef}></div> */}
    </div>
  );
}
