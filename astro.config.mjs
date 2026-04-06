// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'ZAP',
			description: 'ZAP is an ARC-based systems programming language with classes, modules, overloads, stdlib modules, and optional unsafe blocks compiled with an LLVM backend.',
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
					label: 'Getting started',
					slug: "getting-started"
				},
				{
					label: 'Basics',
					items: [
						{ label: 'Installing from source', slug: 'guides/install_src' },
						{ label: 'Your first ZAP program', slug: 'guides/first_program' },
						{ label: 'Variables', slug: 'guides/declaring_variables' },
						{ label: 'Constants and globals', slug: 'guides/constants_and_globals' },
						{ label: 'Functions', slug: 'guides/calling_functions' },
						{ label: 'Overloads and named args', slug: 'guides/overloads_and_named_args' },
						{ label: 'References and varargs', slug: 'guides/references_and_varargs' },
						{ label: 'Control Flow', slug: 'guides/control_flow' },
					],
				},
				{
					label: 'Data model',
					items: [
						{ label: 'Arrays', slug: 'guides/arrays' },
						{ label: 'Structs and records', slug: 'guides/structs_and_records' },
						{ label: 'Enums and aliases', slug: 'guides/enums_and_aliases' },
					],
				},
				{
					label: 'Object model',
					items: [
						{ label: 'Classes', slug: 'guides/classes' },
						{ label: 'ARC and weak refs', slug: 'guides/arc_and_weak_refs' },
					],
				},
				{
					label: 'Modules',
					items: [
						{ label: 'Modules and imports', slug: 'guides/modules_and_imports' },
						{ label: 'Unsafe', slug: 'guides/unsafe' },
					],
				},
				{
					label: 'Standard library',
					items: [
						{ label: 'Overview', slug: 'std' },
						{ label: 'std/io', slug: 'std/io' },
						{ label: 'std/string', slug: 'std/string' },
						{ label: 'std/process', slug: 'std/process' },
						{ label: 'std/fs', slug: 'std/fs' },
						{ label: 'std/path', slug: 'std/path' },
						{ label: 'std/math', slug: 'std/math' },
						{ label: 'std/convert', slug: 'std/convert' },
						{ label: 'std/error', slug: 'std/error' },
						{ label: 'std/mem', slug: 'std/mem' },
						{ label: 'std/prelude', slug: 'std/prelude' },
					],
				},
			],
		}),
		react(),
	],
});
