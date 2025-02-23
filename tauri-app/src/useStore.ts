import { load } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";

export const useStore = (
	loadFile: string,
	key: string,
): [unknown, (newValue: unknown) => Promise<void>] => {
	const [data, setData] = useState<unknown | null>(null);

	useEffect(() => {
		load(`${loadFile}.json`).then(async (store) => {
			const storedValue = await store.get(key);
			setData((storedValue as { value: unknown }).value);
		});
	}, []);

	const setValue = async (newValue: unknown) => {
		setData(newValue);
		const store = await load(`${loadFile}.json`);
		store.set(key, { value: newValue });
	};

	return [data, setValue];
};
