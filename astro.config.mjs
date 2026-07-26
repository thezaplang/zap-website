// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Zap',
			favicon: '/zap-favicon.svg',
			customCss: ['./src/styles/docs.css'],
			components: {
				Header: './src/components/DocsHeader.astro',
			},
			logo: {
				src: './src/assets/Logo.svg',
				replacesTitle: true,
			},
			description: 'Zap is an ARC-based systems programming language with classes, modules, overloads, stdlib modules, and optional unsafe blocks compiled with an LLVM backend.',
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
						content: 'Zap Programming Language',
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
					label: 'Start here',
					items: [
						{ label: 'Introduction', slug: 'getting-started' },
						{ label: 'Install Zap', slug: 'guides/installation' },
						{ label: 'Your first program', slug: 'guides/first_program' },
					],
				},
				{
					label: 'Build with Zap',
					items: [
						{ label: 'Command-line tools', slug: 'guides/command_line' },
						{ label: 'Native software', slug: 'guides/native_software' },
						{ label: 'Systems programming', slug: 'guides/systems_programming' },
					],
				},
				{
					label: '1. Language basics',
					items: [
						{ label: 'Variables', slug: 'guides/variables' },
						{ label: 'Primitive types', slug: 'guides/primitive_types' },
						{ label: 'Strings', slug: 'guides/strings' },
						{ label: 'Functions', slug: 'guides/functions' },
						{ label: 'Control flow overview', slug: 'guides/control_flow' },
						{ label: 'If expressions and statements', slug: 'guides/if' },
						{ label: 'While loops', slug: 'guides/while' },
						{ label: 'For loops', slug: 'guides/for' },
					],
				},
				{
					label: '2. Value types',
					items: [
						{ label: 'Records', slug: 'guides/records' },
						{ label: 'Structs', slug: 'guides/structs' },
						{ label: 'Enums', slug: 'guides/enums' },
						{ label: 'Tagged unions', slug: 'guides/tagged_unions' },
						{ label: 'Type aliases', slug: 'guides/type_aliases' },
						{ label: 'Arrays', slug: 'guides/arrays' },
					],
				},
				{
					label: '3. Ownership and memory',
					items: [
						{ label: 'Ownership and ARC', slug: 'guides/ownership' },
						{ label: 'Sink parameters', slug: 'guides/sink_parameters' },
						{ label: 'Borrowed string views', slug: 'guides/string_views' },
						{ label: 'Weak references', slug: 'guides/weak_references' },
					],
				},
				{
					label: '4. Classes and generics',
					items: [
						{ label: 'Classes', slug: 'guides/classes' },
						{ label: 'Inheritance', slug: 'guides/inheritance' },
						{ label: 'Generics', slug: 'guides/generics' },
					],
				},
				{
					label: '5. Building programs',
					items: [
						{ label: 'Error handling', slug: 'guides/error_handling' },
						{ label: 'Modules', slug: 'guides/modules' },
						{ label: 'Imports', slug: 'guides/imports' },
						{ label: 'Thor build tool', slug: 'guides/thor' },
					],
				},
				{
					label: '6. Systems programming',
					items: [
						{ label: 'Unsafe code', slug: 'guides/unsafe' },
						{ label: 'C interop', slug: 'guides/c_interop' },
						{ label: 'Compiler reference', slug: 'guides/compiler' },
					],
				},
				{
					label: 'Language reference',
					collapsed: true,
					items: [
						{ label: 'Constants', slug: 'guides/constants' },
						{ label: 'Global variables', slug: 'guides/global_variables' },
						{ label: 'Function overloads', slug: 'guides/overloads' },
						{ label: 'Named arguments', slug: 'guides/named_arguments' },
						{ label: 'Ref parameters', slug: 'guides/ref_parameters' },
						{ label: 'Variadic parameters', slug: 'guides/varargs' },
					],
				},
				{
					label: 'Standard library reference',
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'std' },
						{ label: 'std/io', slug: 'std/io' },
						{ label: 'std/string', slug: 'std/string' },
						{ label: 'std/strings', slug: 'std/strings' },
						{ label: 'std/collection', slug: 'std/collection' },
						{ label: 'std/slice', slug: 'std/slice' },
						{ label: 'std/process', slug: 'std/process' },
						{ label: 'std/fs', slug: 'std/fs' },
						{ label: 'std/path', slug: 'std/path' },
						{ label: 'std/math', slug: 'std/math' },
						{ label: 'std/random', slug: 'std/random' },
						{ label: 'std/json', slug: 'std/json' },
						{ label: 'std/network', slug: 'std/network' },
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
