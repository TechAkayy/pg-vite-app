import { promises as fs } from 'fs'
// loader helpers
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

import { defineConfig, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

import { compareColors, stringToColor } from '@iconify/utils/lib/colors'
import {
	importDirectory,
	parseColors,
	runSVGO,
	deOptimisePaths
} from '@iconify/tools'

// For more details check out:
// https://github.com/unocss/unocss/tree/main/packages/preset-icons
// https://github.com/iconify/tools/blob/main/%40iconify-demo/unocss/unocss.config.ts
export function createConfig({ strict = true, dev = true } = {}) {
	return defineConfig({
		cli: {
			entry: {
				outFile: 'dist/assets/css/uno.css',
				patterns: ['src/**/*.html', 'index.html']
			}
		},
		envMode: dev ? 'dev' : 'build',
		// theme: {
		// 	fontFamily: {
		// 		sans: "'Inter', sans-serif",
		// 		mono: "'Fira Code', monospace"
		// 	}
		// },

		presets: [
			presetIcons({
				prefix: '',
				autoInstall: true,
				collections: {
					// Loading IconifyJSON data from test.json
					test: async () => {
						const content = await fs.readFile(
							'src/assets/svg/test.json',
							'utf8'
						)
						return JSON.parse(content)
					},
					// key as the collection name
					// 'my-icons': {
					// 	account: '<svg><!-- ... --></svg>',
					// 	// load your custom icon lazily
					// 	settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8')
					// 	/* ... */
					// },

					// 'my-other-icons': async (iconName) => {
					// 	// your custom loader here. Do whatever you want.
					// 	// for example, fetch from a remote server:
					// 	return await fetch(
					// 		`https://example.com/icons/${iconName}.svg`
					// 	).then((res) => res.text())
					// },

					// // a helper to load icons from the file system
					// // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
					// // you can also provide a transform callback to change each icon (optional)
					// 'my-yet-other-icons': FileSystemIconLoader('./assets/icons', (svg) =>
					// 	svg.replace(/#fff/, 'currentColor')
					// ),

					// Loading icon set
					'my-icons': async () => {
						// Load icons
						const iconSet = await importDirectory('src/assets/svg', {
							prefix: 'svg'
						})
						// // Clean up each icon
						// await iconSet.forEach(async (name) => {
						// 	const svg = iconSet.toSVG(name)!
						// 	// Change color to `currentColor`
						// 	const blackColor = stringToColor('black')!
						// 	await parseColors(svg, {
						// 		defaultColor: 'currentColor',
						// 		callback: (attr, colorStr, color) => {
						// 			// console.log('Color:', colorStr, color);
						// 			// Change black to 'currentColor'
						// 			if (color && compareColors(color, blackColor)) {
						// 				return 'currentColor'
						// 			}
						// 			switch (color?.type) {
						// 				case 'none':
						// 				case 'rgb':
						// 				case 'current':
						// 					return color
						// 			}
						// 			throw new Error(
						// 				`Unexpected color "${colorStr}" in attribute ${attr}`
						// 			)
						// 		}
						// 	})
						// 	// Optimise
						// 	runSVGO(svg)
						// 	// Update paths for compatibility with old software
						// 	await deOptimisePaths(svg)
						// 	// Update icon in icon set
						// 	iconSet.fromSVG(name, svg)
						// })
						// Export as IconifyJSON
						return iconSet.export()
					}
				}
			})
			// presetUno()
		],
		rules: [
			[
				'inline-icon',
				{
					'vertical-align': '-0.125em'
				}
			],
			[
				'icon16',
				{
					'font-size': '16px',
					'line-height': '1em'
				}
			],
			[
				'icon24',
				{
					'font-size': '24px',
					'line-height': '1em'
				}
			],
			[
				'icon48',
				{
					'font-size': '48px',
					'line-height': '5em',
					width: '3em'
				}
			],
			[
				'icon96',
				{
					'font-size': '96px',
					'line-height': '10em'
				}
			]
		]
	})
}

export default createConfig()
