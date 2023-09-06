/**
 * build the interface and decide which modules to display
 * on the web page
 **/

import { movies } from "./movies.ts";
import { actors } from "./actors.ts";
import { movieForm } from "./movie-form.ts";
import { actorForm } from "./actor-form.ts";
import { stats } from "./stats.ts";

document.addEventListener("DOMContentLoaded", () => {
	const main = document.querySelector("main") as HTMLElement | null;
	const aside = document.querySelector("aside") as HTMLElement | null;

	// Ensure main and aside are not null before proceeding
	if (!main || !aside) {
		console.error("Expected main and aside elements to be present.");
		return;
	}

	//add a movies module
	movies.render(main);

	//add a form to add movies
	movieForm.render(aside);

	//add a stats module
	stats.render(aside);

	//add an actors module
	actors.render(main);

	//add a form to add actors
	actorForm.render(aside);
});
