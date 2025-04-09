import { z, ZodObject, type ZodRawShape, type ZodSchema } from 'zod';

export type CreateFormModuleSchema<T extends ZodRawShape> = ZodObject<T>;

export const createFormModule = <T extends ZodRawShape>(schema: CreateFormModuleSchema<T>) => {
	const keys = {} as {
		[K in keyof z.infer<typeof schema>]: string;
	};

	for (const item of Object.keys(schema.keyof().options)) {
		const key = item as keyof z.infer<typeof schema>;
		keys[key] = item;
	}

	return {
		keys,
		schema,
	};
};
