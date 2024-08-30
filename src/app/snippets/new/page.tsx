import { redirect } from "next/navigation";

import { db } from "@/db";

export default function SnippetCreatePage() {
	async function createSnippet(formData: FormData) {
		// * Server action
		// * NextJS will treat this function as though it were a server action
		// * "use server" string must be the very first line inside the function
		"use server";

		// * Validate user input
		const title = formData.get("title") as string;
		const code = formData.get("code") as string;

		// * Create new record in db
		const snippet = await db.snippet.create({
			data: {
				title,
				code
			}
		})
		console.log(snippet);

		// * Redirect to root route
		redirect("/");
	}

	return (
		<form action={ createSnippet }>
			<h3 className="font-bold m-3">Create a Snippet</h3>
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<label className="w-12" htmlFor="title">
						Title
					</label>

					<input
						name="title"
						className="border rounded p-2 w-full"
						id="title"
					/>
				</div>

				<div className="flex gap-4">
					<label className="w-12" htmlFor="code">
						Code
					</label>

					<textarea
						name="code"
						className="border rounded p-2 w-full"
						id="code"
					/>
				</div>

				<button className="rounded p-2 bg-blue-200" type="submit">
					Create
				</button>
			</div>
		</form>
	);
}