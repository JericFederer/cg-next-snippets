'use client';

// import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import * as actions from '@/actions';

// import { db } from '@/db';

export default function SnippetCreatePage() {
	const [formState, action] = useFormState(actions.createSnippet, { message: '' });

	return (
		<form action={ action }>
			<h3 className='font-bold m-3'>Create a Snippet</h3>
			<div className='flex flex-col gap-4'>
				<div className='flex gap-4'>
					<label className='w-12' htmlFor='title'>
						Title
					</label>

					<input
						name='title'
						className='border rounded p-2 w-full'
						id='title'
					/>
				</div>

				<div className='flex gap-4'>
					<label className='w-12' htmlFor='code'>
						Code
					</label>

					<textarea
						name='code'
						className='border rounded p-2 w-full'
						id='code'
					/>
				</div>

				{
					formState.message ? <div className='my-2 p-2 bg-red-200 border rounded border-red'>{ formState.message }</div> : null
				}

				<button className='rounded p-2 bg-blue-200' type='submit'>
					Create
				</button>
			</div>
		</form>
	);
}