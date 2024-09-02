import { notFound } from "next/navigation";
import Link from "next/link";

import { db } from "@/db"

interface SnippetShowPageProps {
	params: {
		id: string;
	}
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
	// * Set a 2-second delay
	await new Promise((r) => setTimeout(r, 2000));

	const snippet = await db.snippet.findFirst({
		where: {
			id: parseInt(props.params.id)
		}
	});

	if (!snippet) {
		return notFound();
	}

	return (
		<div>
			<div className="flex my-4 justify-between items-center">
				<h1 className="text-xl font-bold">
					{ snippet.title }
				</h1>
				
				<div className="flex gap-4">
					<Link
						href={ `/snippets/${ snippet.id }/edit` }
						className="p-2 border rounded"
					>
						Edit
					</Link>
					<Link
						href={ `/snippets/${ snippet.id }/edit` }
						className="p-2 border rounded"
					>
						Delete
					</Link>
				</div>
			</div>

			<pre className="p-3 border rounded bg-gray-200 border-gray-200">
				<code>
					{ snippet.code }
				</code>
			</pre>
		</div>
	)
}