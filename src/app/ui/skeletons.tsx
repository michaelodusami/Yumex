import React from "react";

export const PostSkeleton: React.FC = () => {
	return (
		<div className="rounded-lg dark:shadow-neutral-800 p-4 shadow relative w-full">
			{/* food image skeleton */}
			<div className="mb-4 h-48 w-full rounded bg-gray-200 animate-pulse md:h-[20rem] lg:h-[30rem]"></div>

			{/* title skeleton */}
			<div className="mb-2 h-6 w-3/4 rounded bg-gray-200 animate-pulse"></div>

			{/* content (description) skeleton */}
			<div className="mb-4 h-4 w-full rounded bg-gray-200 animate-pulse"></div>

			{/* user information skeleton */}
			<div className="w-full flex justify-between">
				<div className="h-4 w-20 rounded bg-gray-200 animate-pulse"></div>
				<div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
			</div>

			<div className="mt-2 h-4 w-40 rounded bg-gray-200 animate-pulse"></div>

			<div className="flex items-center space-x-2 mt-5">
				{/* user profile pic skeleton */}
				<div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>

				<div className="flex justify-between w-full items-center">
					{/* user who created it skeleton */}
					<div className="h-4 w-24 rounded bg-gray-200 animate-pulse"></div>

					{/* category tag skeleton */}
					<div className="h-6 w-16 rounded bg-gray-200 animate-pulse"></div>
				</div>
			</div>
		</div>
	);
};

export const ForumSkeleton: React.FC = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<div className="h-8 w-full rounded bg-gray-200 animate-pulse"></div>
			</div>
			<div className="grid grid-cols-1 gap-4">
				{[...Array(6)].map((_, index) => (
					<div key={index} className="rounded-lg bg-white p-4 shadow">
						<div className="mb-4 h-48 md:h-[20rem] lg:h-[30rem] rounded bg-gray-200 animate-pulse"></div>
						<div className="mb-2 h-6 w-3/4 rounded bg-gray-200 animate-pulse"></div>
						<div className="mb-4 h-4 w-1/2 rounded bg-gray-200 animate-pulse"></div>
						<div className="flex items-center space-x-2">
							<div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
							<div className="h-4 w-24 rounded bg-gray-200 animate-pulse"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export const ImageUploaderSkeleton: React.FC = () => {
	return (
		<div className="bg-white p-4 rounded-md shadow">
			<div className="mb-4 h-6 w-1/3 bg-gray-200 animate-pulse title-skeleton"></div>
			<div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-8 dropzone-skeleton">
				<div className="text-center">
					<div className="mb-2 h-4 w-2/3 mx-auto bg-gray-200 animate-pulse dropzone-text-skeleton"></div>
					<div className="h-8 w-20 mx-auto bg-gray-200 animate-pulse upload-button-skeleton"></div>
				</div>
			</div>
			<div className="mt-4 flex space-x-2 options-skeleton">
				<div className="h-8 w-12 bg-gray-200 animate-pulse option-button-skeleton"></div>
				<div className="h-8 w-20 bg-gray-200 animate-pulse option-button-skeleton"></div>
				<div className="h-8 w-16 bg-gray-200 animate-pulse option-button-skeleton"></div>
				<div className="h-8 w-16 bg-gray-200 animate-pulse option-button-skeleton"></div>
			</div>
		</div>
	);
};

export const CreatePostSkeleton: React.FC = () => {
	return (
		<div className="bg-white p-4 rounded-md shadow h-full">
			<div className="mb-4 h-6 w-1/3 bg-gray-200 animate-pulse title-skeleton"></div>
			<div className="mb-4">
				<div className="mb-2 h-4 w-1/4 bg-gray-200 animate-pulse field-label-skeleton"></div>
				<div className="h-10 w-full bg-gray-200 animate-pulse field-input-skeleton"></div>
			</div>
			<div className="mb-4">
				<div className="mb-2 h-4 w-1/4 bg-gray-200 animate-pulse field-label-skeleton"></div>
				<div className="h-20 w-full bg-gray-200 animate-pulse field-textarea-skeleton"></div>
			</div>
			<div className="mb-4">
				<div className="mb-2 h-4 w-1/4 bg-gray-200 animate-pulse field-label-skeleton"></div>
				<div className="h-10 w-full bg-gray-200 animate-pulse field-select-skeleton"></div>
			</div>
			<div className="flex justify-between">
				<div className="h-4 w-16 bg-gray-200 animate-pulse accessibility-toggle-skeleton"></div>
				<div className="flex space-x-2">
					<div className="h-10 w-20 bg-gray-200 animate-pulse button-skeleton"></div>
					<div className="h-10 w-20 bg-gray-200 animate-pulse button-skeleton"></div>
				</div>
			</div>
		</div>
	);
};
