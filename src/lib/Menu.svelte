<script lang="ts">
	import { page } from '$app/stores';
	import { derived, writable } from 'svelte/store';

	type MenuItem = {
		name: string;
		link: string;
		class?: string;
		active?: boolean;
	};

	let items = derived(page, ($page) => [
		{
			name: 'Canban',
			link: '/',
			active: $page.url.pathname === '/'
		},
		{
			name: 'Settings',
			link: '/settings',
			active: $page.url.pathname.startsWith('/settings')
		},
		{
			name: 'Log Out',
			link: '/logout',
			active: false
		}
	]);
</script>

<nav class="the-nav">
	<ul>
		{#each $items as item}
			<li>
				<a
					class="item"
					class:active={item.active}
					class:logout={item.link === '/logout'}
					href={item.link}
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.the-nav ul {
		display: flex;
		gap: 1.3rem;
		list-style: none;
	}

	.item {
		text-decoration: none;
		color: var(--text-color);
		font-weight: 500;
		font-size: 1rem;
		border-radius: 100px;
		padding: 0.7rem 1rem;
	}

	.item.logout {
		color: var(--priority-high);
	}

	.item.active {
		background: var(--primary-color);
		color: #fff;
	}
</style>
