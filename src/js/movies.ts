import { pubsub } from "./pubsub.js";

interface Movies {
	list: string[];
	render: (container: Element) => void;
	deleted: (ev: Event) => void;
	movieAdded: (title: string) => void;
}

export const movies: Movies = {
	list: [],
	render: (container: Element) => {
		const template = document.getElementById(
			"movieListTemplate"
		) as HTMLTemplateElement;
		const div = template.content.cloneNode(true);
		container.appendChild(div);
		const ul = document.querySelector(".movie-container ul") as HTMLElement;
		ul.addEventListener("click", movies.deleted);

		console.log("MOVIES: want to know if a movie is added");
		pubsub.subscribe("movieAdded", movies.movieAdded);
	},
	deleted: (ev: Event) => {
		const item = (ev.target as HTMLElement).closest("li")!;
		const name = item.textContent || "";
		movies.list = movies.list.filter((nm) => nm !== name);
		pubsub.publish("movieDeleted", movies.list);
		item.parentElement?.removeChild(item);
	},
	movieAdded: (title: string) => {
		console.log(`MOVIES: I hear that ${title} was added`);
		const list = new Set(movies.list);
		list.add(title);
		movies.list = Array.from(list).sort();

		console.log(`MOVIES: just moviesUpdated the list`);
		pubsub.publish("moviesUpdated", movies.list);

		const ul = document.querySelector(".movie-container ul") as HTMLElement;
		ul.innerHTML = "";
		const df = document.createDocumentFragment();
		movies.list.forEach((title) => {
			const li = document.createElement("li");
			li.innerText = title;
			df.appendChild(li);
		});
		ul.appendChild(df);
	},
};
