import { motion } from 'framer-motion'
import { Theme } from '@/types/theme';
import { getCardBgClass } from '@/utils/theme';

interface PortfolioProps {
  theme: Theme;
}

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
    <div>
      <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
      <div className={`${getCardBgClass(theme)} backdrop-blur-sm rounded-lg p-6`}>
        <p className="text-current/80">Portfolio section coming soon...</p>
      </div>
    </div>
  );
} 