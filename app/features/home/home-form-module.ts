import { z } from 'zod';

import { createFormModule } from '~/lib/form-module';

export const homeFormModule = createFormModule(
	z.object({
		name: z.string(),
		age: z.coerce.number(),
		isOld: z.coerce.boolean(),
		fitness: z.string(),
	})
);
