import { pubsub } from "./pubsub.js";

interface ActorForm {
	render: (container: Element) => void;
	add: (ev: Event) => void;
}

export const actorForm: ActorForm = {
	render: (container: Element) => {
		//build form to add actor
		const template = document.getElementById(
			"actorFormTemplate"
		) as HTMLTemplateElement;

		if (!template) {
			throw new Error("Template not found.");
		}

		const form = template.content.cloneNode(true) as DocumentFragment;
		form.querySelector("button")?.addEventListener("click", actorForm.add);
		container.appendChild(form);
	},
	add: (ev: Event) => {
		ev.preventDefault();
		const input = document.querySelector(
			".actor-form input"
		) as HTMLInputElement;
		const name = input.value;
		input.value = ""; //clear the form

		//tell people an actor was added
		console.log(`ACTOR FORM: just actorAdded ${name}`);
		pubsub.publish("actorAdded", name);
	},
};
