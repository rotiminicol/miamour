import { useMatchStore } from "../store/useMatchStore";
import { motion, AnimatePresence } from "framer-motion";

const getFeedbackStyle = (swipeFeedback) => {
	if (swipeFeedback === "liked") return "text-green-500";
	if (swipeFeedback === "passed") return "text-red-500";
	if (swipeFeedback === "matched") return "text-pink-500";
	return "";
};

const getFeedbackText = (swipeFeedback) => {
	if (swipeFeedback === "liked") return "Liked!";
	if (swipeFeedback === "passed") return "Passed";
	if (swipeFeedback === "matched") return "It's a Match!";
	return "";
};

const SwipeFeedback = () => {
	const { swipeFeedback } = useMatchStore();

	return (
		<AnimatePresence>
			{swipeFeedback && (
				<motion.div
					className={`absolute top-10 left-0 right-0 text-center text-3xl font-bold ${getFeedbackStyle(
						swipeFeedback
					)}`}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}
				>
					{getFeedbackText(swipeFeedback)}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
export default SwipeFeedback;