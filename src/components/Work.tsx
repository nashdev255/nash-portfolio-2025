import { motion } from "framer-motion";

interface WorkProps {
  work: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    link?: string;
  };
  index: number;
}

const Work = ({ work, index }: WorkProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/80 shadow-xl transition-all duration-500 ease-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="absolute inset-0 bg-gradient-to-b to-white/10" />
        <img
          src={`/nash-portfolio-2025/${work.imageUrl}`}
          alt={work.title}
          className="w-full h-[225px] sm:h-[275px] md:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ease-out opacity-100" />
          <div className="absolute inset-0 flex items-end p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="w-full transform translate-y-0 transition-all duration-500 ease-out sm:translate-y-4 opacity-100">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-1 sm:mb-2 tracking-tight">
                {work.title}
              </h3>
              <p className="text-white/80 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 font-light leading-relaxed">
                {work.description}
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-white/10 backdrop-blur-sm text-white/90 font-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {work.link && (
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 sm:mb-4 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-light hover:bg-white/20 transition-all duration-300"
                >
                  View Project
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default Work;
