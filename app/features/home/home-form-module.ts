import { z } from 'zod';

import { createFormModule } from '~/lib/form-module';

export const homeFormModule = createFormModule(
	z.object({
		name: z.coerce.string(),
		age: z.coerce.number(),
		isOld: z.coerce.boolean(),
	})
);
