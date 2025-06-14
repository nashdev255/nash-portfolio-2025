import { motion } from "framer-motion";
import Work from "./Work";
import worksData from "../data/works.json";

const Works = () => {
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
            Works
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A collection of my developments.
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8 lg:space-y-12">
          {worksData.works.map((work, index) => (
            work.isVisible ? (
            <Work key={work.id} work={work} index={index} />
          ) : (
            <></>
          )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
