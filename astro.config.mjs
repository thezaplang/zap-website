// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'ZAP',
			description: 'ZAP: A modern, high-level systems programming language compiled to native code. Built for safety, performance, and developer productivity with a lightweight concurrency model and garbage collection.',
			head: [
				{
					tag: 'meta',
					attrs: {
						property: 'og:type',
						content: 'website',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:site_name',
						content: 'ZAP Programming Language',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:card',
						content: 'summary_large_image',
					},
				},
				{
					tag: 'script',
					attrs: {
						async: true,
						src: 'https://www.googletagmanager.com/gtag/js?id=G-LP0QD3PR4L',
					},
				},
				{
					tag: 'script',
					content: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LP0QD3PR4L');`,
				},
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/thezaplang/zap' }, { icon: 'discord', label: 'Discord', href: 'https://discord.gg/tfbE5Cps5j' }],
			sidebar: [
				{
					label: "Getting started",
					slug: "getting-started"
				},
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Installing from source', slug: 'guides/install_src' },
						{ label: 'Your first ZAP program', slug: 'guides/first_program' },
						{ label: 'Declaring Variables', slug: 'guides/declaring_variables' },
						{ label: 'Functions', slug: 'guides/calling_functions' },
						{ label: 'Control Flow', slug: 'guides/control_flow' },
						{ label: 'Data Structures', slug: 'guides/data_structures' },
						{ label: 'Memory Management', slug: 'guides/memory_management' },
					],
				},
				// {
				// 	label: 'Reference',
				// 	autogenerate: { directory: 'reference' },
				// },
			],
		}),
		react(),
	],
});
