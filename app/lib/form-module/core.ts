import { z, ZodObject, type ZodRawShape } from 'zod';

export type CreateFormModuleSchema<T extends ZodRawShape> = ZodObject<T>;

export const createFormModule = <T extends ZodRawShape>(schema: CreateFormModuleSchema<T>) => {
	const keys = {} as {
		[K in keyof z.infer<typeof schema>]: string;
	};

	for (const key of [...schema.keyof().options]) {
		Object.assign(keys, {
			[`${key as string}`]: key,
		});
	}

	return {
		keys,
		safeParse: (formData: FormData) => {
			const parsedData = {} as Record<string, unknown>;
			for (const key of Object.keys(keys)) {
				const value = formData.get(key);

				if (value !== null || value !== undefined) {
					parsedData[key] = value;
				}
			}

			const { data, success, error } = schema.safeParse(parsedData) as z.infer<typeof schema>;

			return {
				data,
				success,
				error,
			} as {
				data: z.infer<typeof schema> | null;
				success: boolean;
				error: z.ZodError | null;
			};
		},
	};
};
