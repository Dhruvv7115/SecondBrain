import React from "react";

export default function LinkedInPost() {
	return (
		<div className="flex flex-col items-center justify-center py-12 w-full h-screen bg-neutral-100">
			<p>LinkedInPost</p>
			<iframe
				src="https://www.linkedin.com/embed/feed/update/urn:li:share:7391162106802520064"
				height="551"
				width="504"
				title="Embedded post"
			></iframe>
		</div>
	);
}
