import { SetMetadata } from '@nestjs/common';
/**
 * Marks a route handler or controller method as public.
 * Public routes do not require authentication.
 */
export const Public = () => SetMetadata('isPublic', true);
