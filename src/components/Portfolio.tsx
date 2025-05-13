import { motion } from 'framer-motion'

type Theme = 'netflix' | 'meta' | 'discord';

interface PortfolioProps {
  theme: Theme;
}

const getCardBgClass = (theme: Theme) => {
  switch (theme) {
    case 'netflix':
      return 'bg-white/10';
    case 'meta':
      return 'bg-black/5';
    case 'discord':
      return 'bg-[#5865F2]/10';
    default:
      return 'bg-white/10';
  }
};

interface Project {
  title: string
  description: string
  technologies: string[]
}

const projects: Project[] = [
  {
    title: "Real-time Student Performance Evaluation System",
    description: "Designed and implemented RSPEF to improve graduation rates using machine learning for early identification of at-risk students. The system includes predictive analysis, emergency warning system, and interactive dashboards.",
    technologies: ["Machine Learning", "Java", "Python", "SQL", "AngularJS", "D3.js"]
  },
  {
    title: "Author Gender Prediction",
    description: "Developed a machine learning model to predict author gender from text using WEKA API. Useful for criminal forensics, plagiarism detection, and linguistic studies.",
    technologies: ["Java", "WEKA", "SQL", "NLP"]
  },
  {
    title: "Time Series Interpolation",
    description: "Implemented polynomial curve fitting for time series data interpolation using NumPy. The system learns the optimal polynomial degree for accurate predictions.",
    technologies: ["Python", "NumPy", "Data Analysis"]
  },
  {
    title: "Car Clustering Analysis",
    description: "Built custom K-Means and Fuzzy K-Means clustering algorithms to group similar cars using UCI Dataset. Implemented both hard and soft clustering approaches.",
    technologies: ["Python", "Machine Learning", "Data Analysis"]
  },
  {
    title: "Neural Network Implementation",
    description: "Created a scalable 3-layer neural network from scratch using only NumPy. The network uses backpropagation for learning and can be extended to N layers.",
    technologies: ["Python", "NumPy", "Deep Learning"]
  }
]

export default function Portfolio({ theme }: PortfolioProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${getCardBgClass(theme)} backdrop-blur-sm rounded-lg p-6 shadow-lg hover:bg-white/10 transition-all`}
          >
            <h3 className="text-xl font-semibold mb-3 text-current">
              {project.title}
            </h3>
            <p className="text-current/90 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className={`${getCardBgClass(theme)} px-3 py-1 rounded-full text-sm text-current/80`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 