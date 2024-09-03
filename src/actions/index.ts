'use server';

import { redirect } from 'next/navigation';

import { db } from '@/db';

export async function createSnippet(formState: { message: string }, formData: FormData) {
	try {
		// * Server action
		// * NextJS will treat this function as though it were a server action
		// * 'use server' string must be the very first line inside the function
		// 'use server';

		const title = formData.get('title');
		const code = formData.get('code');

		// * Validate user input
		if (typeof(title) !== 'string' || title.length < 3) {
			return (
				{
					message: 'Title must be of type string and has at least 3 characters'
				}
			)
		}

		if (typeof(code) !== 'string' || code.length < 10) {
			return (
				{
					message: 'Code must have at least 10 characters'
				}
			)
		}

		// * Create new record in db
		const snippet = await db.snippet.create({
			data: {
				title,
				code
			}
		})
	} catch (error) {
		if (error instanceof Error)	{
			return (
				{
					message: error.message,
				}
			)
		} else {
			return (
				{
					message: 'Something went wrong...',
				}
			)
		}
	}
	
	// * Redirect to root route
	redirect('/');
}

export async function editSnippet(id: number, code: string) {
	await db.snippet.update({
		where: { id },
		data: { code }
	})

	redirect(`/snippets/${ id }`)
}

export async function deleteSnippet(id: number) {
	await db.snippet.delete({
		where: { id }
	});

	redirect('/');
}