import React, { useEffect } from "react";

export default function Protected({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/signin";
		}
	}, []);
	return <div>{children}</div>;
}
