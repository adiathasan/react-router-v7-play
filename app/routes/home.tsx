import type { Route } from './+types/home';
import { Form } from 'react-router';
import { homeFormModule } from '~/features/home';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export async function action({ request }: Route.ActionArgs) {
	const formData: FormData = await request.formData();
	const { error, data } = homeFormModule.safeParse(formData);

	if (!data) {
		return { error: error?.message };
	}

	const { name, age, isOld, fitness } = data;

	if (name && age) {
		const message = `Hello ${name}, you are ${age} years old. I'm ${fitness}.`;
		if (isOld) {
			return { message: `${message} You are old!` };
		}
		return { message: `${message} You are young!` };
	}

	return { error: 'Please fill in all fields.' };
}

export default function Home({ actionData }: Route.ComponentProps) {
	return (
		<div>
			<Form method='post' action=''>
				<div className='flex flex-col items-center justify-center min-h-screen'>
					<h1 className='text-4xl font-bold mb-4'>Welcome to React Router!</h1>
					<p className='text-lg mb-8'>This is a simple form submission example.</p>
					<input
						type='text'
						name={homeFormModule.keys.name}
						placeholder='Enter your name'
						className='border border-gray-300 rounded-lg p-2 mb-4'
					/>
					<input
						type='number'
						name={homeFormModule.keys.age}
						placeholder='Enter your age'
						className='border border-gray-300 rounded-lg p-2 mb-4'
					/>
					<div className='flex items-center gap-2 mb-4'>
						<input
							id={homeFormModule.keys.isOld}
							type='checkbox'
							value='true'
							defaultChecked
							name={homeFormModule.keys.isOld}
							className='border border-gray-300 rounded-lg p-2'
						/>
						<label htmlFor={homeFormModule.keys.isOld}>Are you old?</label>
					</div>
					<div className='flex items-center gap-2 mb-4'>
						<input
							defaultChecked
							id='fit'
							type='radio'
							name={homeFormModule.keys.fitness}
							value='fit'
							className='border border-gray-300 rounded-lg p-2'
						/>
						<label htmlFor='fit'>Fit</label>
						<input
							id='not-fit'
							type='radio'
							name={homeFormModule.keys.fitness}
							value='not-fit'
							className='border border-gray-300 rounded-lg p-2'
						/>
						<label htmlFor='not-fit'>Not-fit</label>
					</div>
					<button type='submit' className='bg-blue-500 text-white rounded-lg p-2 px-4 hover:bg-blue-600'>
						Submit
					</button>
					{actionData?.error && (
						<div className='mt-4 text-center'>
							<p className='text-red-500'>{actionData.error}</p>
						</div>
					)}

					{actionData?.message && (
						<div className='mt-4 text-center'>
							<p className='text-green-500'>{actionData.message}</p>
						</div>
					)}
				</div>
			</Form>
		</div>
	);
}
