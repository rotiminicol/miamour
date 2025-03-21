import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
		<div
			className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100
		 overflow-hidden
		'
		>
			<Sidebar />
			<div className='flex-grow flex flex-col overflow-hidden'>
				<Header />
				<main className='flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden'>
					{userProfiles.length > 0 && !isLoadingUserProfiles && (
						<>
							<SwipeArea />
							<SwipeFeedback />
						</>
					)}

					{userProfiles.length === 0 && !isLoadingUserProfiles && <NoMoreProfiles />}

					{isLoadingUserProfiles && <LoadingUI />}
				</main>
			</div>
		</div>
	);
};
export default HomePage;


const NoMoreProfiles = () => {
	const navigate = useNavigate(); // Initialize the navigate function

	return (
		<div className='flex flex-col items-center justify-center h-full text-center p-8'>
			<div className='bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full transform transition-all hover:scale-105 hover:shadow-2xl'>
				<div className='flex justify-center mb-6'>
					<Frown className='text-pink-500' size={64} />
				</div>
				<h2 className='text-3xl font-bold text-gray-800 mb-4'>No More Profiles</h2>
				<p className='text-gray-600 mb-6 text-lg'>
					It looks like youve reached the end. Let us help you take the next step toward meaningful connections.
				</p>
				<button
					className='bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
					onClick={() => navigate("/marriage-counseling")} // Redirect to the marriage counseling page
				>
					Explore Marriage Counseling
				</button>
			</div>
		</div>
	);
};

const LoadingUI = () => {
	return (
		<div className='relative w-full max-w-sm h-[28rem]'>
			<div className='card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
				<div className='px-4 pt-4 h-3/4'>
					<div className='w-full h-full bg-gray-200 rounded-lg' />
				</div>
				<div className='card-body bg-gradient-to-b from-white to-pink-50 p-4'>
					<div className='space-y-2'>
						<div className='h-6 bg-gray-200 rounded w-3/4' />
						<div className='h-4 bg-gray-200 rounded w-1/2' />
					</div>
				</div>
			</div>
		</div>
	);
};
