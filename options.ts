import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { GithubProfile } from 'next-auth/providers/github'

const users = [
    { id: "42", name: "Narendra", password: "Narendra", role: "admin" },
    { id: "43", name: "vinay", password: "jerusha", role: "user" },
    { id: "44", name: "hemanth", password: "navya", role: "manager" }
];

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                return {
                    ...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                const user = users.find(user => user.name === credentials?.username && user.password === credentials?.password);
                
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session
        },
    }
}
