import { pubsub } from "./pubsub.js";

interface Actors {
	list: string[];
	render: (container: Element) => void;
	actorAdded: (name: string) => void;
	actorDeleted: (ev: Event) => void;
}

export const actors: Actors = {
	list: [],
	render: (container: Element) => {
		const template = document.getElementById(
			"actorListTemplate"
		) as HTMLTemplateElement;
		const div = template.content.cloneNode(true);
		container.appendChild(div);
		const ul = document.querySelector(".actor-container ul") as HTMLElement;
		ul.addEventListener("click", actors.actorDeleted);

		console.log("ACTORS: want to know if an actor is added");
		pubsub.subscribe("actorAdded", actors.actorAdded);
	},
	actorAdded: (name: string) => {
		console.log(`ACTORS: I hear that ${name} was added`);
		let list = new Set(actors.list);
		list.add(name);
		actors.list = Array.from(list).sort();

		console.log("ACTORS: actorsUpdated the list");
		pubsub.publish("actorsUpdated", actors.list);

		const ul = document.querySelector(".actor-container ul") as HTMLElement;
		ul.innerHTML = "";
		let df = document.createDocumentFragment();
		actors.list.forEach((name) => {
			let li = document.createElement("li");
			li.innerText = name;
			df.appendChild(li);
		});
		ul.appendChild(df);
	},
	actorDeleted: (ev: Event) => {
		const item = (ev.target as HTMLElement).closest("li")!;
		const name = item.textContent || "";
		actors.list = actors.list.filter((nm) => nm !== name);
		item.parentElement?.removeChild(item);
		console.log(`ACTORS: actorDeleted the ${name}`);
		pubsub.publish("actorDeleted", actors.list);
	},
};
