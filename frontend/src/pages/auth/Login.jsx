import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

const initialState = { username: "", password: "" };

const Login = () => {
	const user = useSelector((state) => state.auth);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (user && user?.data?.token) {
		return <Navigate to="/" replace />;
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(login(formData, navigate));
	};

	const handleChange = (event) =>
		setFormData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));

	return (
		<div className="min-h-screen bg-slate-900 px-4 py-10 text-slate-100">
			<div className="mx-auto max-w-md">
				<div className="mb-6 text-center">
					<h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
					<p className="mt-1 text-slate-400">Sign in to continue to your notes</p>
				</div>
				<div className="rounded-xl border border-slate-800 bg-slate-800/60 p-6 shadow-lg shadow-slate-950/30">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="mb-1 block text-sm text-slate-300" htmlFor="username">Username</label>
							<input
								id="username"
								type="text"
								placeholder="Enter your username"
								name="username"
								onChange={handleChange}
								className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none ring-0 transition focus:border-slate-500 focus:ring-2 focus:ring-sky-500/40"
							/>
						</div>
						<div>
							<label className="mb-1 block text-sm text-slate-300" htmlFor="password">Password</label>
							<input
								id="password"
								type="password"
								placeholder="Enter your password"
								name="password"
								onChange={handleChange}
								className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none ring-0 transition focus:border-slate-500 focus:ring-2 focus:ring-sky-500/40"
							/>
						</div>
						<button type="submit" className="w-full rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-sky-400/30 transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400/60">Sign in</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
