import Navbar from '@/components/layouts/Navbar';

const ErrorPage = () => {
	return (
		<>
			<Navbar />
			<div className='flex justify-center items-center h-screen w-full relative'>
				<p className='text-[20rem] text-slate-200 dark:text-slate-800'>404</p>
				<p className='absolute text-center text-6xl uppercase z-10'>
					Page Not Found!
				</p>
			</div>
		</>
	);
};

export default ErrorPage;
