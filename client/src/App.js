import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBook from './pages/SearchBook';
import SavedBook from './pages/SavedBook';
import NoMatch from './pages/NoMatch';
import Nav from './Components/Nav';

function App() {
	return (
		<Router>
			<div>
				<Nav />
				<Switch>
					<Route exact path="/">
						<SearchBook />
					</Route>
					<Route exact path="/saved">
						<SavedBook />
					</Route>
					<Route>
						<NoMatch />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
