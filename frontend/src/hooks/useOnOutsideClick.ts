import React, { useEffect } from "react";

export default function useOnOutsideClick({
	ref,
	handler,
	closeOnEscape = true,
}: {
	ref: React.RefObject<HTMLElement | null>;
	handler: (event?: Event) => void;
	closeOnEscape?: boolean;
}) {
	useEffect(() => {
		const onPointer = (event: Event) => {
			const el = ref?.current;
			const target = (event as any).target as Node | null;
			if (!el || el.contains(target)) return;
			handler(event);
		};
		const onKey = (e: KeyboardEvent) => {
			if (closeOnEscape && e.key === "Escape") {
				handler(e);
			}
		};

		document.addEventListener("mousedown", onPointer);
		document.addEventListener("touchstart", onPointer);
		document.addEventListener("keydown", onKey);

		return () => {
			document.removeEventListener("mousedown", onPointer);
			document.removeEventListener("touchstart", onPointer);
			document.removeEventListener("keydown", onKey);
		};
	}, [ref, handler, closeOnEscape]);
}
