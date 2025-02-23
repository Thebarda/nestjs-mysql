import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { useCookies } from "react-cookie";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");
	const [isCookieSet, setIsCookieSet] = useState(false);
	const [cookies, setCookies, removeCookie] = useCookies(["cookie"]);

	async function greet() {
		setGreetMsg(await invoke("greet", { name }));
	}
	useEffect(() => {
		setCookies("cookie", "dd");
		fetch("https://api.frankfurter.dev/v1/latest")
			.then((response) => response.json())
			.then((data) => console.log(data));
	}, []);

	useEffect(() => {
		setIsCookieSet(!!cookies.cookie);
	}, [cookies]);

	return (
		<main className="container">
			<h1>Welcome to Tauri + React</h1>

			<div className="row">
				<a href="https://vitejs.dev" target="_blank">
					<img src="/vite.svg" className="logo vite" alt="Vite logo" />
				</a>
				<a href="https://tauri.app" target="_blank">
					<img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<p>Click on the Tauri, Vite, and React logos to learn more.</p>

			<form
				className="row"
				onSubmit={(e) => {
					e.preventDefault();
					greet();
					isCookieSet ? removeCookie("cookie") : setCookies("cookie", "greet");
				}}
			>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
			</form>
			<p>{greetMsg}</p>
			<p>Is cookie set? {JSON.stringify(isCookieSet)}</p>
		</main>
	);
}

export default App;
