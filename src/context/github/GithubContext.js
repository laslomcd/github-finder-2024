import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		isLoading: false,
	};
	// const [users, setUsers] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);

	const [state, dispatch] = useReducer(githubReducer, initialState);

	// Get search results
	const searchUsers = async (text) => {
		setLoading();
		const params = new URLSearchParams({
			q: text,
		});
		const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		});

		const { items } = await response.json();

		dispatch({
			type: "GET_USERS",
			payload: items,
		});
		// setUsers(data);
		// setIsLoading(false);
	};

	const clearUsers = () => {
		dispatch({
			type: "CLEAR_USERS",
		});
	};

	const setLoading = () => dispatch({ type: setLoading });

	return (
		<GithubContext.Provider value={{ users: state.users, isLoading: state.isLoading, searchUsers, clearUsers }}>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
