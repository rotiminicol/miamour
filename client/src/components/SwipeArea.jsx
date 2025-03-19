import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";
import { motion } from "framer-motion";
import { MapPin, Heart, Star, MessageCircle,  } from "lucide-react";

const SwipeArea = () => {
	const { userProfiles, swipeRight, swipeLeft } = useMatchStore();

	const handleSwipe = (dir, user) => {
		if (dir === "right") swipeRight(user);
		else if (dir === "left") swipeLeft(user);
	};

	return (
		<div className="relative w-full max-w-md h-[70vh]">
			{userProfiles.map((user) => (
				<TinderCard
					className="absolute shadow-none"
					key={user._id}
					onSwipe={(dir) => handleSwipe(dir, user)}
					swipeRequirementType="position"
					swipeThreshold={100}
					preventSwipe={["up", "down"]}
				>
					<motion.div
						className="card bg-white w-full h-[70vh] select-none rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						{/* Image Section */}
						<figure className="h-3/4 relative">
							<img
								src={user.image || "/avatar.png"}
								alt={user.name}
								className="w-full h-full object-cover pointer-events-none"
							/>
							{/* Overlay for Text Readability */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
							{/* User Details */}
							<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
								<h2 className="text-3xl font-bold">
									{user.name}, {user.age}
								</h2>
								<div className="flex items-center gap-2 mt-2">
									<MapPin className="w-5 h-5" />
									<p className="text-lg">{user.location || "New York, USA"}</p>
								</div>
								<div className="flex items-center gap-2 mt-2">
									<Star className="w-5 h-5 text-yellow-400" />
									<p className="text-lg">{user.interests?.join(", ") || "Travel, Music, Food"}</p>
								</div>
							</div>
							{/* Badges */}
							<div className="absolute top-4 right-4 flex gap-2">
								<div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
									<Heart className="w-4 h-4 text-pink-500" />
									<span>5km away</span>
								</div>
								<div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
									<MessageCircle className="w-4 h-4 text-blue-500" />
									<span>Active now</span>
								</div>
							</div>
						</figure>

						{/* Bio Section */}
						<div className="card-body bg-gradient-to-b from-white to-pink-50 p-6">
							<p className="text-gray-600 mt-2">{user.bio || "No bio available."}</p>
						</div>
					</motion.div>
				</TinderCard>
			))}
		</div>
	);
};
export default SwipeArea;