import { authConfig } from '@/configs/auth';
import NextAuth from 'next-auth';

export default NextAuth(authConfig);
