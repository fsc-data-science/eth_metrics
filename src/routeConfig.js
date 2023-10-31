import Ecosystem from './routes/Ecosystem.svelte';
import Transactions from './routes/Transactions.svelte';
import Eth from './routes/Eth.svelte';
import Accounts from './routes/Accounts.svelte';
import Price from './routes/Price.svelte';
import Dex from './routes/Dex.svelte';
import Nft from './routes/Nft.svelte';

export const routes = [
    { path: '/ecosystem', name: 'Ecosystem', component: Ecosystem },
    { path: '/transactions', name: 'Transactions', component: Transactions },
    { path: '/eth', name: 'ETH', component: Eth },
    { path: '/accounts', name: 'Accounts', component: Accounts },
    { path: '/price', name: 'ETH Price', component: Price },
    { path: '/dex', name: 'DEX', component: Dex },
    { path: '/nft', name: 'NFT', component: Nft }
];
