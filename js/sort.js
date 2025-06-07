import { places } from '../date/marker.js';

export function getSortedPlacesWithId() {
	const sorted = [...places].sort((a, b) =>
		a.title.localeCompare(b.title, 'pl', { sensitivity: 'base' })
	);
	sorted.forEach((place, index) => {
		place.id = index + 1;
	});
	return sorted;
}