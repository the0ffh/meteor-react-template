import React from 'react';
import { Route, Switch } from 'react-router-dom';

import e404 from '../_NotFound/e404';
import Main from '../Home/Home';

export default () => (

	<Switch >
		<Route
			exact
			path="/"
			component={Main}
		/>
		<Route
			path="/"
			component={e404}
		/>
	</Switch >
);

// export default () => (
//   <div >
//     {Meteor.userId() === null &&
//     <Route
//       path="/"
//       component={NotLoggedIn}
//     />
//     }
//     {Meteor.userId() !== null &&
//     <Switch >
//       <Route
//         exact
//         path="/"
//         component={Main}
//       />
//       <Route
//         path="/"
//         component={e404}
//       />
//     </Switch >
//     }
//   </div >
// )
