import { pubsub } from "./pubsub.js";

interface Stats {
	render: (container: Element) => void;
	moviesUpdated: (list: any[]) => void;
	actorsUpdated: (list: any[]) => void;
}

export const stats: Stats = {
	render: (container: Element) => {
		let d = document.createElement("div");
		d.className = "stats-container";
		container.appendChild(d);

		let pm = document.createElement("p");
		pm.className = "movie-count";
		pm.innerHTML = `0 movies in list`;
		d.appendChild(pm);

		let pa = document.createElement("p");
		pa.className = "actor-count";
		pa.innerHTML = `0 actors in list`;
		d.appendChild(pa);

		//build stats for movies
		pubsub.subscribe("moviesUpdated", stats.moviesUpdated);
		console.log("STATS: listening for moviesUpdated events");

		//build stats for actors
		pubsub.subscribe("actorsUpdated", stats.actorsUpdated);
		console.log("STATS: listening for actorsUpdated events");

		pubsub.subscribe("actorDeleted", stats.actorsUpdated);

		pubsub.subscribe("movieDeleted", stats.moviesUpdated);
	},
	moviesUpdated: (list: any[]) => {
		console.log(
			`STATS: I hear that the movie list now has ${list.length} titles.`
		);
		(
			document.querySelector(".movie-count") as HTMLElement
		).innerText = `${list.length} movies in list`;
	},
	actorsUpdated: (list: any[]) => {
		console.log(
			`STATS: I hear that the actor list now has ${list.length} names.`
		);
		(
			document.querySelector(".actor-count") as HTMLElement
		).innerText = `${list.length} actors in list`;
	},
};
