export function getSortedPlacesWithId(places) {
    return [...places].sort((a, b) =>
        a.title.localeCompare(b.title, 'pl', { sensitivity: 'base' })
    );
}


// export function getSortedPlacesWithId(places) {
// 	const sorted = [...places].sort((a, b) =>
// 		a.title.localeCompare(b.title, 'pl', { sensitivity: 'base' })
// 	);
// 	sorted.forEach((place, index) => {
// 		place.id = index + 1;
// 	});
// 	return sorted;
// }