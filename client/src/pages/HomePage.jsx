import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { Frown } from "lucide-react";
import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
	const { isLoadingUserProfiles, getUserProfiles, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } =
		useMatchStore();

	const { authUser } = useAuthStore();

	useEffect(() => {
		getUserProfiles();
	}, [getUserProfiles]);

	useEffect(() => {
		authUser && subscribeToNewMatches();
		return () => {
			unsubscribeFromNewMatches();
		};
	}, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

	return (
		<div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
			<Sidebar />
			<div className="flex-grow flex flex-col overflow-hidden">
				<Header />
				<main className="flex-grow flex flex-col gap-10 justify-center items-center p-6 relative overflow-hidden">
					<SwipeFeedback />

					{userProfiles.length > 0 && !isLoadingUserProfiles && <SwipeArea hideBackCards cardSize="large" />} {/* Pass hideBackCards and cardSize prop */}

					{userProfiles.length === 0 && !isLoadingUserProfiles && <NoMoreProfiles />}

					{isLoadingUserProfiles && <LoadingUI />}
				</main>
			</div>
		</div>
	);
};
export default HomePage;

const NoMoreProfiles = () => (
	<div className="flex flex-col items-center justify-center h-full text-center p-8">
		<Frown className="text-pink-400 mb-6" size={80} />
		<h2 className="text-3xl font-bold text-gray-800 mb-4">No more profiles left!</h2>
		<p className="text-xl text-gray-600 mb-6">Check back later for new matches.</p>
	</div>
);

const LoadingUI = () => {
	return (
		<div className="relative w-full max-w-lg h-[40rem]"> {/* Increased card size */}
			<div className="card bg-white w-full h-[40rem] rounded-lg overflow-hidden border border-gray-200 shadow-md">
				<div className="px-4 pt-4 h-3/4">
					<div className="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
				</div>
				<div className="card-body bg-gradient-to-b from-white to-pink-50 p-6">
					<div className="space-y-2">
						<div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
						<div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
					</div>
				</div>
			</div>
		</div>
	);
};
