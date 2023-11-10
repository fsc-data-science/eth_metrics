<script>
import { Router, Route, Link } from 'svelte-routing';
import Header from './components/Header.svelte';
import Ecosystem from './routes/Ecosystem.svelte'; // Eco is default
import { routes } from './routeConfig.js'; // Importing the routes
import NotFound from './routes/NotFound.svelte';

</script>

<Header />

<Router>
    <nav>
        {#each routes as route}
            <Link to="{route.path}">{route.name}</Link> 
        {/each}
    </nav>
	<Route path="/" component={Ecosystem} /> <!-- This makes Ecosystem the default route -->

    {#each routes as route}
        <Route path="{route.path}" component="{route.component}" />
    {/each}

	<Route path="*" component={NotFound} /> <!-- This is the catch-all fallback route -->

</Router>