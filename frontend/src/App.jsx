import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { useEffect } from "react";
import { me } from "./actions/auth";
import Notes from "./pages/notes/Notes";
import Home from "./pages/Home";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		const initAuth = async () => {
			await dispatch(me());
			setInitialized(true);
		};
		initAuth();
	}, [dispatch]);

	if (!initialized) {
		return (
			<div className="grid min-h-screen place-items-center bg-slate-900 text-slate-100">
				<div className="animate-pulse text-slate-400">Loading…</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-900 text-slate-100">
			<BrowserRouter>
				<header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
					<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
						<Link to="/" className="text-lg font-semibold text-slate-100">NotesApp</Link>
						<nav className="flex items-center gap-3 text-sm">
							{!user.data ? (
								<>
									<Link to="/register" className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-200 transition hover:border-slate-600">Register</Link>
									<Link to="/login" className="rounded-md bg-sky-500 px-3 py-1.5 text-white shadow-sm ring-1 ring-sky-400/30 transition hover:bg-sky-600">Login</Link>
								</>
							) : (
								<div className="flex items-center gap-3">
									<span className="hidden text-slate-300 sm:inline">{user?.data?.username}</span>
									<Link to="/" className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-200 transition hover:border-slate-600">Home</Link>
								</div>
							)}
						</nav>
					</div>
				</header>

				<main className="mx-auto max-w-7xl px-4 py-6">
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
