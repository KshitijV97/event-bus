import { pubsub } from "./pub-sub";

type Render = (container: HTMLElement) => void;
type Add = (event: Event) => void;

interface MovieForm {
	render: Render;
	add: Add;
}

export const movieForm: MovieForm = {
	render: (container: HTMLElement) => {
		let template = document.getElementById(
			"movieFormTemplate"
		) as HTMLTemplateElement;
		if (!template || !template.content) {
			throw new Error("Template not found");
		}
		let form = template.content.cloneNode(true) as DocumentFragment;
		(form.querySelector("button") as HTMLButtonElement).addEventListener(
			"click",
			movieForm.add
		);
		container.appendChild(form);
	},
	add: (event: Event) => {
		event.preventDefault();
		let input = document.querySelector(".movie-form input") as HTMLInputElement;
		let title = input.value;
		input.value = "";
		console.log(`MOVIE FORM: just movieAdded "${title}"`);
		pubsub.publish("movieAdded", title);
	},
};
